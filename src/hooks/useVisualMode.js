import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newmode, replace = false) {
    if (replace) {
      setMode(newmode);
      const newHistory = [...history];
      newHistory.pop();
      setHistory([...newHistory, newmode]);
    } else {
      setMode(newmode);

      setHistory([...history, newmode]);
    }
  }

  function back() {
    setHistory((prev) => {
      if (prev.length === 1) {
        return [...prev];
      }

      const lastMode = [...prev.slice(0, -1)];
      setMode(lastMode[lastMode.length - 1]);

      return lastMode;
    });
  }

  return { mode, transition, back };
}
