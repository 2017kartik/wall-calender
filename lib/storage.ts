import { DateRange } from "@/types";

const NOTES_KEY = "wall-calendar-notes";
const THEME_KEY = "wall-calendar-dark-mode";
const RANGES_KEY = "wall-calendar-ranges";

export function loadNotes(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveNotes(notes: Record<string, string>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function loadDarkMode(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(THEME_KEY) === "true";
}

export function saveDarkMode(value: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, String(value));
}

export function loadRanges(): Record<string, DateRange> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(RANGES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveRanges(ranges: Record<string, DateRange>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(RANGES_KEY, JSON.stringify(ranges));
}