"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { loadNotes, saveNotes } from "@/lib/storage";

export function useNotes() {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const updateNotes = useCallback((monthKey: string, value: string) => {
    setNotes((prev) => {
      const next = { ...prev, [monthKey]: value };
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => saveNotes(next), 500);
      return next;
    });
  }, []);

  return { notes, updateNotes };
}
