import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function useChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "channels"),
      (snap) => {
        setChannels(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load channels:", err);
        setError(err.message || "Unknown error");
        setLoading(false);
      }
    );

    return unsub;
  }, []);

  return { channels, loading, error };
}
