import { useState, useEffect } from "react";

const STORAGE_KEY = "commitforge-history";
const MAX_HISTORY = 10;

export default function useHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load history:", err);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const saveHistory = (result) => {
    if (!result.commit) return;

    const newItem = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      ...result,
    };

    const updated = [newItem, ...history].slice(0, MAX_HISTORY);

    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    saveHistory,
    clearHistory,
  };
}