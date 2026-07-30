import { useEffect, useState } from "react";

const PIN_KEY = "dashboard-pinned-links";
const RECENT_KEY = "dashboard-recent-links";
const USAGE_KEY = "dashboard-usage";

export function useQuickLinks() {
  const [pinned, setPinned] = useState<number[]>([]);
  const [recent, setRecent] = useState<number[]>([]);
  const [usage, setUsage] = useState<Record<number, number>>({});

  useEffect(() => {
    const savedPins = localStorage.getItem(PIN_KEY);
    const savedRecent = localStorage.getItem(RECENT_KEY);
    const savedUsage = localStorage.getItem(USAGE_KEY);

    if (savedPins) setPinned(JSON.parse(savedPins));
    if (savedRecent) setRecent(JSON.parse(savedRecent));
    if (savedUsage) setUsage(JSON.parse(savedUsage));
  }, []);

  useEffect(() => {
    localStorage.setItem(PIN_KEY, JSON.stringify(pinned));
  }, [pinned]);

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  }, [recent]);

  useEffect(() => {
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
  }, [usage]);

  const togglePin = (id: number) => {
    setPinned((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const openLink = (id: number) => {
    setRecent((prev) => {
      const list = [id, ...prev.filter((x) => x !== id)];
      return list.slice(0, 6);
    });

    setUsage((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return {
    pinned,
    recent,
    usage,
    togglePin,
    openLink,
    setPinned,
  };
}