const ISO_DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Interprets a report `YYYY-MM-DD` as a **calendar date in the user's local timezone**
 * (midnight local), so it never shifts to the previous day when formatted.
 *
 * Plain `new Date("2026-03-31")` is UTC midnight and can show as March 30 in some zones.
 */
export function parsePublishDateLocal(publishDate: string): Date | null {
  const trimmed = publishDate.trim();
  const m = ISO_DATE_ONLY.exec(trimmed);
  if (m) {
    const y = Number(m[1]);
    const monthIndex = Number(m[2]) - 1;
    const day = Number(m[3]);
    const d = new Date(y, monthIndex, day);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  }
  const d = new Date(`${trimmed}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

const defaultDisplayOptions: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
};

/**
 * Formats a publish date for display (e.g. March 31, 2026) without off-by-one-day TZ issues.
 */
export function formatPublishDateDisplay(
  publishDate: string,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = defaultDisplayOptions
): string {
  const d = parsePublishDateLocal(publishDate);
  if (d) return d.toLocaleDateString(locale, options);
  const trimmed = publishDate.trim();
  if (!trimmed) return '—';
  return trimmed;
}

/** Calendar year from `YYYY-MM-DD` (first four digits); avoids `getFullYear()` TZ edge cases. */
export function getPublishCalendarYear(publishDate: string, yearFallback?: number): number {
  const m = ISO_DATE_ONLY.exec(publishDate.trim());
  if (m) return Number(m[1]);
  if (yearFallback != null) return yearFallback;
  const d = parsePublishDateLocal(publishDate);
  if (d) return d.getFullYear();
  return new Date().getFullYear();
}
