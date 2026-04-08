// components/CalendarNotes.tsx
"use client";

import { useState } from "react";

interface CalendarNotesProps {
  monthKey: string;
  value: string;
  accentColor: string;
  onChange: (monthKey: string, value: string) => void;
}

export function CalendarNotes({ monthKey, value, accentColor, onChange }: CalendarNotesProps) {
  const [open, setOpen] = useState(false);

  // CSS trick to create physical notebook lines
  const linedBackground = {
    backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)",
    lineHeight: "32px",
    backgroundAttachment: "local" as const,
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:flex flex-col w-[40%] border-r border-gray-200 dark:border-zinc-800 py-6 px-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-800 dark:text-zinc-200">
            Notes
          </span>
        </div>
        <div className="flex-1">
          <textarea
            value={value}
            onChange={(e) => onChange(monthKey, e.target.value)}
            style={linedBackground}
            className="w-full h-full min-h-[220px] bg-transparent resize-none outline-none text-sm text-gray-600 dark:text-zinc-300 placeholder:text-gray-400"
            placeholder="Write your memos here..."
          />
        </div>
      </div>

      {/* Mobile Accordion View */}
      <div className="lg:hidden border-t border-gray-100 dark:border-zinc-800">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-4"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-800 dark:text-zinc-200">
            Notes
          </span>
          <span className="text-xl leading-none font-light text-gray-400">
            {open ? "−" : "+"}
          </span>
        </button>

        {open && (
          <div className="px-5 pb-6">
            {/* Inside CalendarNotes.tsx Desktop View */}
            <textarea
              value={value}
              onChange={(e) => onChange(monthKey, e.target.value)}
              style={linedBackground}
              className="w-full h-full min-h-[220px] bg-transparent resize-none outline-none text-sm text-gray-700 dark:text-zinc-200 placeholder:text-gray-400 dark:placeholder:text-zinc-600"
              placeholder="Write your memos here..."
            />
          </div>
        )}
      </div>
    </>
  );
}