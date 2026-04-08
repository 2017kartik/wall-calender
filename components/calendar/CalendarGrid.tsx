"use client";

import { DayCell, DateString } from "@/types";
import { DAY_HEADERS } from "@/lib/calendar";
import { CalendarDay } from "./CalendarDay";

interface CalendarGridProps {
  days: DayCell[];
  accentColor: string;
  accentMuted: string;
  animClass: string;
  dark: boolean;
  onDayClick: (date: DateString) => void;
  onDayHover: (date: DateString | null) => void;
}

export function CalendarGrid({
  days,
  accentColor,
  accentMuted,
  animClass,
  onDayClick,
  onDayHover,
  dark,
}: CalendarGridProps) {
  return (
    <div className={`flex-1 px-4 sm:px-5 pt-3 pb-4 ${animClass}`} role="grid" aria-label="Calendar grid">
      <div className="grid grid-cols-7 mb-2">
        {DAY_HEADERS.map((h) => {
          const isWeekend = h === "Sat" || h === "Sun";
          return (
            <div
              key={h}
              className="text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-widest py-1"
            >
              <span style={isWeekend ? { color: accentColor } : { color: dark ? "#9ca3af" : "#6b7280" }}>
                {h}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {days.map((cell) => (
          <CalendarDay
            key={cell.date}
            cell={cell}
            accentColor={accentColor}
            accentMuted={accentMuted}
            onClick={onDayClick}
            onHover={onDayHover}
            dark={dark}
          />
        ))}
      </div>
    </div>
  );
}
