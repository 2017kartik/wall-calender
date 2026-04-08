"use client";

import { useState } from "react";

interface CalendarNotesProps {
  monthKey: string;
  value: string;
  accentColor: string;
  dark?: boolean;
  onChange: (monthKey: string, value: string) => void;
}

export function CalendarNotes({ monthKey, value, accentColor, dark, onChange }: CalendarNotesProps) {
  const [open, setOpen] = useState(false);

  const lineColor = dark ? "rgba(63, 63, 70, 0.5)" : "#e4e7eb";
  const textColor = dark ? "text-zinc-100" : "text-slate-800";
  const placeholderColor = dark ? "placeholder:text-zinc-600" : "placeholder:text-zinc-400";

  const linedBackground = {
    backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, ${lineColor} 31px, ${lineColor} 32px)`,
    backgroundSize: "100% 32px",
    lineHeight: "32px",
    backgroundAttachment: "local" as const,
    backgroundPosition: "0 31px",
  };

  const textarea = (minH: string) => (
    <textarea
      value={value}
      onChange={(e) => onChange(monthKey, e.target.value)}
      style={linedBackground}
      className={`w-full bg-transparent resize-none outline-none text-sm leading-8 py-0
        ${textColor} ${placeholderColor} ${minH}`}
      placeholder="Write your notes here..."
    />
  );

  return (
    <>
      <div className="hidden lg:flex flex-row w-[38%] border-r border-gray-200 dark:border-zinc-800">
        <div className="flex flex-col flex-1 py-5 px-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
            style={{ color: accentColor }}>
            Notes
          </span>
          {textarea("min-h-48")}
        </div>
      </div>

      <div className="lg:hidden border-t border-gray-100 dark:border-zinc-800">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-3.5 transition-colors active:bg-gray-50 dark:active:bg-zinc-800/60"
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accentColor }}
          >
            Notes
          </span>
          <span
            className={`text-base font-light transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
            style={{ color: accentColor }}
          >
            +
          </span>
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-5">
              {textarea("min-h-36")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
