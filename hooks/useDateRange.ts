"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { DateRange, DateString, SelectionPhase } from "@/types";
import { loadRanges, saveRanges } from "@/lib/storage";

interface UseDateRangeReturn {
  dateRange: DateRange;
  hoverDate: DateString | null;
  phase: SelectionPhase;
  handleDayClick: (date: DateString) => void;
  handleDayHover: (date: DateString | null) => void;
  clearRange: () => void;
}

export function useDateRange(monthKey: string): UseDateRangeReturn {
  const [ranges, setRanges] = useState<Record<string, DateRange>>({});
  const [phase, setPhase] = useState<SelectionPhase>("idle");
  const [hoverDate, setHoverDate] = useState<DateString | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const prevMonthKey = useRef(monthKey);

  useEffect(() => {
    if (prevMonthKey.current !== monthKey) {
      prevMonthKey.current = monthKey;
      setPhase("idle");
      setHoverDate(null);
    }
  }, [monthKey]);

  useEffect(() => {
    const storedRanges = loadRanges();
    if (Object.keys(storedRanges).length > 0) {
      setRanges(storedRanges);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveRanges(ranges);
    }
  }, [ranges, isLoaded]);

  const dateRange = ranges[monthKey] ?? { start: null, end: null };

  const handleDayClick = useCallback(
    (date: DateString) => {
      if (phase === "idle" || phase === "complete") {
        setRanges((prev) => ({ ...prev, [monthKey]: { start: date, end: null } }));
        setPhase("selecting");
        setHoverDate(null);
        return;
      }

      if (phase === "selecting") {
        const start = (ranges[monthKey] ?? { start: null }).start!;

        if (date === start) {
          setRanges((prev) => ({ ...prev, [monthKey]: { start: null, end: null } }));
          setPhase("idle");
          setHoverDate(null);
          return;
        }

        if (date < start) {
          setRanges((prev) => ({ ...prev, [monthKey]: { start: date, end: start } }));
        } else {
          setRanges((prev) => ({ ...prev, [monthKey]: { start, end: date } }));
        }

        setPhase("complete");
        setHoverDate(null);
      }
    },
    [phase, ranges, monthKey]
  );

  const handleDayHover = useCallback(
    (date: DateString | null) => {
      if (phase === "selecting") {
        setHoverDate(date);
      }
    },
    [phase]
  );

  const clearRange = useCallback(() => {
    setRanges((prev) => ({ ...prev, [monthKey]: { start: null, end: null } }));
    setPhase("idle");
    setHoverDate(null);
  }, [monthKey]);

  return { dateRange, hoverDate, phase, handleDayClick, handleDayHover, clearRange };
}
