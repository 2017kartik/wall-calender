export type DateString = string;

export type RangeState = "none" | "start" | "end" | "between" | "start-end";

export type SelectionPhase = "idle" | "selecting" | "complete";

export interface DayCell {
  date: DateString;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  holiday: string | null;
  rangeState: RangeState;
}

export interface DateRange {
  start: DateString | null;
  end: DateString | null;
}

export interface MonthNotes {
  [monthKey: string]: string;
}

export interface MonthTheme {
  heroImage: string;
  accentColor: string;
  accentMuted: string;
  label: string;
}
