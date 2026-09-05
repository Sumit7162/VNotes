/**
 * Timestamp formatting shared by every view.
 *
 * The API returns timezone-aware ISO strings, so `new Date(...)` renders them
 * in the reader's own timezone - which is what "the correct time" means here.
 */

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
};

function toDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "Sep 5, 2026" */
export function formatDate(value: string | Date | null | undefined): string {
  const date = toDate(value);
  return date ? date.toLocaleDateString(undefined, DATE_OPTIONS) : "--";
}

/** "10:00 AM" */
export function formatTime(value: string | Date | null | undefined): string {
  const date = toDate(value);
  return date ? date.toLocaleTimeString(undefined, TIME_OPTIONS) : "--";
}

/** "10:00 AM · Sep 5, 2026" */
export function formatDateTime(value: string | Date | null | undefined): string {
  const date = toDate(value);
  if (!date) return "--";
  return `${formatTime(date)} · ${formatDate(date)}`;
}
