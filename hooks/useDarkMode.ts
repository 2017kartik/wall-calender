"use client";

import { useState, useEffect } from "react";
import { loadDarkMode, saveDarkMode } from "@/lib/storage";

export function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = loadDarkMode();
    setDark(stored);
    if (stored) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark"); 
    }
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      saveDarkMode(next);
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return { dark, toggle };
}
