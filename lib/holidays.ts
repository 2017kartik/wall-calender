import { DateString } from "@/types";

const HOLIDAYS: Record<DateString, string> = {
  "2026-01-01": "New Year's Day",
  "2026-01-19": "MLK Day",
  "2026-02-14": "Valentine's Day",
  "2026-02-16": "Presidents' Day",
  "2026-03-17": "St. Patrick's Day",
  "2026-04-05": "Easter",
  "2026-05-25": "Memorial Day",
  "2026-06-19": "Juneteenth",
  "2026-07-04": "Independence Day",
  "2026-09-07": "Labor Day",
  "2026-10-12": "Columbus Day",
  "2026-10-31": "Halloween",
  "2026-11-11": "Veterans Day",
  "2026-11-26": "Thanksgiving",
  "2026-12-25": "Christmas Day",
  "2026-12-31": "New Year's Eve",
};

export function getHolidaysForMonth(
  year: number,
  month: number
): Record<DateString, string> {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  return Object.fromEntries(
    Object.entries(HOLIDAYS).filter(([k]) => k.startsWith(prefix))
  );
}
