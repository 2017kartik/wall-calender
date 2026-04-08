import { DateString, DateRange, DayCell, RangeState } from "@/types";

export function toDateString(date: Date): DateString {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromDateString(ds: DateString): Date {
  const [y, m, d] = ds.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function monthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export function isSameDay(a: DateString, b: DateString): boolean {
  return a === b;
}

function getRangeState(
  date: DateString,
  range: DateRange,
  effectiveEnd: DateString | null
): RangeState {
  const { start } = range;
  if (!start) return "none";

  const end = effectiveEnd;

  if (!end) {
    return isSameDay(date, start) ? "start" : "none";
  }

  const [s, e] =
    start <= end ? [start, end] : [end, start];

  if (isSameDay(date, s) && isSameDay(date, e)) return "start-end";
  if (isSameDay(date, s)) return "start";
  if (isSameDay(date, e)) return "end";
  if (date > s && date < e) return "between";
  return "none";
}

export function buildDayGrid(
  year: number,
  month: number,
  range: DateRange,
  hoverDate: DateString | null,
  holidays: Record<DateString, string>
): DayCell[] {
  const today = toDateString(new Date());
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let startDow = firstDay.getDay();
  startDow = startDow === 0 ? 6 : startDow - 1;

  const cells: DayCell[] = [];

  for (let i = startDow - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    const ds = toDateString(d);
    const effectiveEnd = range.end ?? hoverDate;
    cells.push({
      date: ds,
      dayOfMonth: d.getDate(),
      isCurrentMonth: false,
      isToday: ds === today,
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
      holiday: holidays[ds] ?? null,
      rangeState: getRangeState(ds, range, effectiveEnd),
    });
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const d = new Date(year, month, day);
    const ds = toDateString(d);
    const effectiveEnd = range.end ?? hoverDate;
    cells.push({
      date: ds,
      dayOfMonth: day,
      isCurrentMonth: true,
      isToday: ds === today,
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
      holiday: holidays[ds] ?? null,
      rangeState: getRangeState(ds, range, effectiveEnd),
    });
  }

  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    const ds = toDateString(d);
    const effectiveEnd = range.end ?? hoverDate;
    cells.push({
      date: ds,
      dayOfMonth: i,
      isCurrentMonth: false,
      isToday: ds === today,
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
      holiday: holidays[ds] ?? null,
      rangeState: getRangeState(ds, range, effectiveEnd),
    });
  }

  return cells;
}

export const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export const DAY_HEADERS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
