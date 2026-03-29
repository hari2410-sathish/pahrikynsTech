import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useSocket } from "../../../contexts/SocketContext";
import { useAuth } from "../../../contexts/AuthContext";
import { getAiResponse } from "../utils/aiAutomation"; // 🤖 AI Utility
import { sendMessage as apiSendMessage } from "../api/messageApi"; // 📦 Firestore API

import { db } from "../../../firebase";
import { collection, query, where, orderBy, onSnapshot as onFirestoreSnapshot } from "firebase/firestore";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const socket = useSocket();
  const { user } = useAuth();

  const [activeChat, setActiveChat] = useState(null);
  // activeChat = { type: "channel" | "dm", id: "general" }

  const [activeThread, setActiveThread] = useState(null); // { id: "msgId", ...msgData }

  const [messages, setMessages] = useState([]);
  const [isAiTyping, setIsAiTyping] = useState(false); // 🤖 Typing state for AI
  const [aiStatus, setAiStatus] = useState("Pahrikyns AI is thinking..."); // 🤖 Dynamic AI Status

  // Presence State
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  // Helper: Generate consistent DM room ID
  const getDmRoomId = useCallback((otherUserId) => {
    if (!user) return null;
    const uid1 = user.uid;
    const uid2 = otherUserId;
    // Sort to ensure same room ID regardless of who starts chat
    return [uid1, uid2].sort().join("_");
  }, [user]);

  // 1. Load Persistence (Firestore) + Join Room (Socket)
  useEffect(() => {
    if (!socket || !activeChat) return;
    setActiveThread(null);

    let roomId;
    if (activeChat.type === 'channel') {
      roomId = activeChat.id;
    } else {
      roomId = `dm:${getDmRoomId(activeChat.id)}`;
    }

    socket.emit("join_room", roomId);

    // 🔴 FIRESTORE LIVE HISTORY (Persistence Fix)
    const q = query(
      collection(db, "messages"),
      where("chatId", "==", activeChat.id),
      where("type", "==", activeChat.type),
      orderBy("createdAt")
    );

    const unsubFirestore = onFirestoreSnapshot(q, (snap) => {
      const dbMessages = snap.docs.map((d) => {
        const data = d.data();
        return { 
          id: d.id, 
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString())
        };
      });

      setMessages(prev => {
        // Merge DB messages with any existing AI/Optimistic messages that aren't in DB yet
        // We deduplicate by content and sender if the ID is different
        const combined = [...dbMessages];
        prev.forEach(p => {
            const isLocalOnly = p.id.startsWith('temp_') || p.id.startsWith('ai_');
            const existsInDb = combined.some(c => c.text === p.text && c.senderId === p.senderId);
            if (isLocalOnly && !existsInDb) {
                combined.push(p);
            }
        });
        return combined.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
      });
    });

    return () => {
      socket.emit("leave_room", roomId);
      unsubFirestore();
    };
  }, [socket, activeChat, getDmRoomId]);

  // 2. Presence
  useEffect(() => {
    if (!socket || !user) return;

    // Register Presence
    socket.emit("register_presence", user.uid);

    // Presence Handlers
    const handleOnlineList = (list) => {
      setOnlineUsers(new Set(list));
    };
    const handleUserOnline = ({ userId }) => {
      setOnlineUsers((prev) => new Set(prev).add(userId));
    };
    const handleUserOffline = ({ userId }) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    };

    socket.on("online_users", handleOnlineList);
    socket.on("user_online", handleUserOnline);
    socket.on("user_offline", handleUserOffline);

    return () => {
      socket.off("online_users", handleOnlineList);
      socket.off("user_online", handleUserOnline);
      socket.off("user_offline", handleUserOffline);
    };
  }, [socket, user]);

  // 3. Send Message Action
  const sendMessage = useCallback(async (content, type = "text", fileUrl = null, threadId = null) => {
    if (!socket || !activeChat || !content) return;

    let roomId;
    if (activeChat.type === 'channel') {
      roomId = activeChat.id;
    } else {
      roomId = `dm:${getDmRoomId(activeChat.id)}`;
    }

    const messageData = {
      id: `temp_${Date.now()}`, // Temporary ID for optimistic update
      room: roomId,
      content,
      type,
      fileUrl,
      threadId, // Thread support
      senderId: user?.uid,
      senderName: user?.displayName || "User",
      createdAt: new Date().toISOString(),
      timestamp: new Date().toISOString()
    };

    // 🟢 Optimistic Update: Add message to list immediately
    setMessages(prev => [...prev.filter(m => m.id !== messageData.id), messageData]);

    socket.emit("chat_message", messageData);

    // 💾 Save User Message to Firestore (Persistence Upgrade)
    apiSendMessage({
      chatId: activeChat.id,
      type: activeChat.type,
      senderId: user?.uid,
      senderName: user?.displayName || "User",
      text: content,
      fileUrl: fileUrl,
    });

    // 🤖 Automated AI Response Check
    const lowerContent = content.toLowerCase();
    const shouldReply = lowerContent.includes("@ai") || activeChat.name?.includes("AI") || activeChat.id === "ai_assistant";

    if (shouldReply) {
      setTimeout(async () => {
        setIsAiTyping(true);
        setAiStatus("Pahrikyns AI is searching for solutions...");
        
        setTimeout(() => setAiStatus("Analyzing your request..."), 1000);
        setTimeout(() => setAiStatus("Generating documentation roadmap..."), 2000);

        const aiResponse = await getAiResponse(content);
        
        const aiMessageData = {
            id: `ai_${Date.now()}`,
            chatId: activeChat.id,
            room: roomId,
            content: aiResponse,
            text: aiResponse, // Double check field name
            type: "ai_text", 
            senderId: "ai_bot",
            senderName: "Pahrikyns AI Assistant",
            createdAt: new Date().toISOString(),
            timestamp: new Date().toISOString()
        };

        // 🟢 ADD TO LOCAL STATE IMMEDIATELY (VITAL FOR FEEDBACK)
        setMessages(prev => [...prev.filter(m => m.id !== aiMessageData.id), aiMessageData]);
        setIsAiTyping(false);
        setAiStatus("Pahrikyns AI is thinking..."); 

        // 💾 SAVE TO FIRESTORE (REAL PERSISTENCE)
        await apiSendMessage({
          chatId: activeChat.id,
          type: activeChat.type,
          senderId: "ai_bot",
          senderName: "Pahrikyns AI Assistant",
          text: aiResponse,
        });
      }, 500); 
    }

  }, [socket, activeChat, user, getDmRoomId]);

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat, activeThread, setActiveThread, messages, sendMessage, user, getDmRoomId, onlineUsers, isAiTyping, aiStatus }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
