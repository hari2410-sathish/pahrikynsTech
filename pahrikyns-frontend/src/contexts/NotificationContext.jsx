import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSocket } from "./SocketContext";
import { fetchNotifications, markNotificationReadAPI, deleteNotificationAPI } from "../api/notifications";
import { useSnackbar } from "notistack";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();
  const { enqueueSnackbar } = useSnackbar();

  // Load notifications from API
  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchNotifications(1, 50); // Fetch last 50
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.unread || 0);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark absolute single as read
  const markAsRead = async (id) => {
    try {
      const res = await markNotificationReadAPI(id);
      if (res.success) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    try {
      const res = await deleteNotificationAPI(id);
      if (res.success) {
        const wasUnread = notifications.find((n) => n.id === id && !n.isRead);
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        if (wasUnread) setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  // Listen for socket events
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (note) => {
      setNotifications((prev) => [note, ...prev]);
      setUnreadCount((prev) => prev + 1);
      
      // Global toast
      enqueueSnackbar(`${note.title}: ${note.message}`, {
        variant: note.type || "info",
        autoHideDuration: 5000,
      });

      // Optional: Play sound
      try { new Audio("/notification.mp3").play(); } catch (e) {}
    };

    const handleReadNotification = ({ id }) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    };

    socket.on("notification", handleNewNotification);
    socket.on("notification_read", handleReadNotification);

    return () => {
      socket.off("notification", handleNewNotification);
      socket.off("notification_read", handleReadNotification);
    };
  }, [socket, enqueueSnackbar]);

  // Initial load
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        markAsRead,
        deleteNotification,
        refresh: loadNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
