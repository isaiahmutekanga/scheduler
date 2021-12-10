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
    const historyObject = [...history];
    if (history.length > 1) {
      historyObject.pop();
      setHistory(historyObject);
      setMode(historyObject[historyObject.length - 1]);
    }
  }

  return { mode, transition, back };
}
