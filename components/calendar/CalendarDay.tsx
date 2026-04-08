"use client";

import { DayCell, DateString } from "@/types";

interface CalendarDayProps {
  cell: DayCell;
  accentColor: string;
  accentMuted: string;
  dark: boolean;
  onClick: (date: DateString) => void;
  onHover: (date: DateString | null) => void;
}

export function CalendarDay({
  cell,
  accentColor,
  accentMuted,
  onClick,
  onHover,
  dark,
}: CalendarDayProps) {
  const { date, dayOfMonth, isCurrentMonth, isToday, rangeState, holiday } = cell;

  // Handle the background shapes for the range connections
  let bgClass = "";
  let bgColor = "transparent";

  if (rangeState === "start") {
    bgClass = "rounded-l-full";
    bgColor = accentMuted;
  } else if (rangeState === "end") {
    bgClass = "rounded-r-full";
    bgColor = accentMuted;
  } else if (rangeState === "between") {
    bgClass = ""; 
    bgColor = accentMuted;
  } else if (rangeState === "start-end") {
    bgClass = "rounded-full"; 
    bgColor = "transparent"; 
  }

  const isSelected = rangeState === "start" || rangeState === "end" || rangeState === "start-end";

  // Seamlessly handle dark mode text contrast using Tailwind
  let textClass = "";
  if (isSelected) {
    textClass = "text-white";
  } else if (isCurrentMonth) {
    textClass = dark ? "text-zinc-100" : "text-zinc-800"; 
  } else {
    textClass = dark ? "text-zinc-600" : "text-zinc-400"; 
  }

  return (
    <div
      className="relative flex items-center justify-center h-10 w-full"
      onMouseEnter={() => onHover(date)}
      onMouseLeave={() => onHover(null)}
      title={holiday || undefined}
    >
      {/* Range Connector Background */}
      {rangeState !== "none" && (
        <div
          className={`absolute inset-y-0 w-full ${bgClass}`}
          style={{ backgroundColor: rangeState === "start-end" ? "transparent" : bgColor }}
        />
      )}

      {/* Interactive Day Button */}
      <button
        onClick={() => onClick(date)}
        className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm transition-transform duration-200
          ${textClass}
          ${isToday && !isSelected ? `border font-bold ${dark ? "border-zinc-500" : "border-gray-300"}` : ""}
          ${!isCurrentMonth ? "opacity-80" : "hover:scale-110"}
        `}
        style={{
          backgroundColor: isSelected ? accentColor : "transparent",
          fontWeight: isSelected ? "bold" : "normal",
        }}
        aria-label={`Select ${date}`}
      >
        {dayOfMonth}
        
        {holiday && !isSelected && (
          <span 
            className="absolute bottom-0.5 w-1 h-1 rounded-full" 
            style={{ backgroundColor: accentColor }}
          />
        )}
      </button>
    </div>
  );
}