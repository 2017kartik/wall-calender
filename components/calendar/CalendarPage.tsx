"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { buildDayGrid, monthKey, MONTH_NAMES } from "@/lib/calendar";
import { MONTH_THEMES } from "@/lib/monthThemes";
import { getHolidaysForMonth } from "@/lib/holidays";
import { useDateRange } from "@/hooks/useDateRange";
import { useNotes } from "@/hooks/useNotes";
import { useDarkMode } from "@/hooks/useDarkMode";
import { CalendarBinding } from "./CalendarBinding";
import { CalendarHero } from "./CalendarHero";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarNotes } from "./CalendarNotes";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type AnimState = "idle" | "out" | "in";

export function CalendarPage() {
  const now = new Date();
  const [currentDate, setCurrentDate] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });
  const { year, month } = currentDate;
  const [anim, setAnim] = useState<AnimState>("idle");
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const mk = monthKey(year, month);
  const { dateRange, hoverDate, handleDayClick, handleDayHover, clearRange } = useDateRange(mk);
  const { notes, updateNotes } = useNotes();
  const { dark, toggle } = useDarkMode();

  const theme = MONTH_THEMES[month];
  const holidays = useMemo(() => getHolidaysForMonth(year, month), [year, month]);
  const days = useMemo(
    () => buildDayGrid(year, month, dateRange, hoverDate, holidays),
    [year, month, dateRange, hoverDate, holidays]
  );

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (anim !== "idle") return;
      setDirection(dir);
      setAnim("out");
    },
    [anim]
  );

  useEffect(() => {
    if (anim === "out") {
      const t = setTimeout(() => {
        setCurrentDate(({ year, month }) => {
          if (direction === "next") {
            if (month === 11) return { year: year + 1, month: 0 };
            return { year, month: month + 1 };
          } else {
            if (month === 0) return { year: year - 1, month: 11 };
            return { year, month: month - 1 };
          }
        });
        setAnim("in");
      }, 280);
      return () => clearTimeout(t);
    }
    if (anim === "in") {
      const t = setTimeout(() => setAnim("idle"), 330);
      return () => clearTimeout(t);
    }
  }, [anim, direction]);

  const heroAnimClass =
    anim === "out"
      ? "animate-flip-out"
      : anim === "in"
        ? "animate-flip-in"
        : "";

  const gridAnimClass =
    anim === "out"
      ? direction === "next"
        ? "animate-slide-out-left"
        : "animate-slide-out-right"
      : anim === "in"
        ? direction === "next"
          ? "animate-slide-in-right"
          : "animate-slide-in-left"
        : "";

  const monthNote = notes[mk] ?? "";
  const hasRange = dateRange.start && dateRange.end;

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 transition-colors duration-500 ease-in-out ${dark ? "dark" : ""}`}
      style={{
        background: dark
          ? "linear-gradient(160deg, #242426 0%, #121212 100%)"
          : "linear-gradient(160deg, #d4d1ce 0%, #c4c1be 50%, #b8b5b2 100%)",
      }}
    >
      <div className="w-full max-w-110 flex flex-col relative perspective-1000">

        {/* Top bar controls */}
        <div className="flex justify-end mb-4 px-2 z-20">
          <ThemeToggle dark={dark} onToggle={toggle} />
        </div>

        {/* 3D Wall Nail */}
        <div className="flex justify-center relative z-20" style={{ marginBottom: -8 }}>
          <div
            className="w-4 h-4 rounded-full transition-colors duration-500"
            style={{
              background: dark
                ? "radial-gradient(circle at 35% 35%, #71717a 0%, #27272a 50%, #09090b 100%)"
                : "radial-gradient(circle at 35% 35%, #f4f4f5 0%, #a1a1aa 50%, #52525b 100%)",
              boxShadow: dark
                ? "0 4px 6px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.15)"
                : "0 3px 6px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4)",
            }}
          />
        </div>

        {/* Calendar Body */}
        <div
          className="rounded-2xl overflow-hidden transition-all duration-500 ease-in-out relative z-10 ring-1 ring-black/5 dark:ring-white/5"
          style={{
            backgroundColor: dark ? "#18181b" : "#ffffff", 
            color: dark ? "#f4f4f5" : "#18181b", 
            boxShadow: dark
              ? "0 10px 40px -10px rgba(0,0,0,0.8), 0 20px 60px -15px rgba(0,0,0,0.6)"
              : "0 4px 12px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.14), 0 40px 80px rgba(0,0,0,0.12)",
          }}
        >
          <CalendarBinding />

          <CalendarHero
            heroImage={theme.heroImage}
            month={MONTH_NAMES[month]}
            year={year}
            accentColor={theme.accentColor}
            animClass={heroAnimClass}
            onPrev={() => navigate("prev")}
            onNext={() => navigate("next")}
            disabled={anim !== "idle"}
          />

          <div className="flex flex-col lg:flex-row">
            <CalendarNotes
              monthKey={mk}
              value={monthNote}
              accentColor={theme.accentColor}
              onChange={updateNotes}
              dark={dark}
            />
            <CalendarGrid
              days={days}
              accentColor={theme.accentColor}
              accentMuted={theme.accentMuted}
              animClass={gridAnimClass}
              onDayClick={handleDayClick}
              onDayHover={handleDayHover}
              dark={dark}
            />
          </div>

          {/* Date Range Banner */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${hasRange ? "max-h-16 opacity-100 mb-4" : "max-h-0 opacity-0 mb-0"
              }`}
          >
            <div
              className="mx-4 mt-1 flex items-center justify-between rounded-xl px-4 py-3 text-xs border border-transparent dark:border-white/5"
              style={{ backgroundColor: theme.accentMuted }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                  style={{ backgroundColor: theme.accentColor }}
                />
                <span className="font-semibold tracking-wide" style={{ color: theme.accentColor }}>
                  {dateRange.start} <span className="opacity-60 font-normal mx-1">to</span> {dateRange.end}
                </span>
              </div>
              <button
                onClick={clearRange}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-[10px] font-bold"
                style={{ color: theme.accentColor }}
                aria-label="Clear date range"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}