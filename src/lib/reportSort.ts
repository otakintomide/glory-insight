import type { Report } from './supabase';

/**
 * Stable, machine-sortable time from `YYYY-MM-DD` (UTC) or other ISO-ish strings.
 * Invalid / missing: falls back to Jan 1 UTC of `yearFallback`, then 0.
 */
export function normalizePublishTimeMs(
  publishDate: string | undefined | null,
  yearFallback?: number
): number {
  const trimmed = (publishDate ?? '').trim();
  if (!trimmed) {
    if (yearFallback != null && Number.isFinite(yearFallback)) {
      return Date.UTC(yearFallback, 0, 1, 12, 0, 0);
    }
    return 0;
  }
  const ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (ymd) {
    const y = Number(ymd[1]);
    const mo = Number(ymd[2]) - 1;
    const d = Number(ymd[3]);
    return Date.UTC(y, mo, d, 12, 0, 0);
  }
  const t = Date.parse(trimmed);
  if (Number.isFinite(t)) return t;
  if (yearFallback != null && Number.isFinite(yearFallback)) {
    return Date.UTC(yearFallback, 0, 1, 12, 0, 0);
  }
  return 0;
}

export function isReportComingSoon(status: Report['status'] | undefined): boolean {
  return status === 'coming_soon';
}

type SortableReportSlice = {
  publish_date: string;
  status?: Report['status'];
  year?: number;
  id?: string;
};

/**
 * Hub / archive order:
 * - Published (and non–coming-soon) first, by publish date descending (newest first).
 * - Coming soon after, by publish date ascending (next upcoming first).
 * Not sorted by title or period label.
 */
export function compareReportsDisplayOrder(a: SortableReportSlice, b: SortableReportSlice): number {
  const aSoon = isReportComingSoon(a.status);
  const bSoon = isReportComingSoon(b.status);
  if (aSoon !== bSoon) return aSoon ? 1 : -1;

  const ta = normalizePublishTimeMs(a.publish_date, a.year);
  const tb = normalizePublishTimeMs(b.publish_date, b.year);
  if (ta !== tb) {
    if (aSoon) return ta - tb;
    return tb - ta;
  }

  return (a.id ?? '').localeCompare(b.id ?? '');
}

export function sortUiReportsForDisplay<T extends SortableReportSlice>(reports: readonly T[]): T[] {
  return [...reports].sort(compareReportsDisplayOrder);
}

export interface GloryReportSortable {
  id: string;
  publishDate: string;
  status: 'published' | 'coming_soon';
  year: number;
}

export function compareGloryReportsDisplayOrder(a: GloryReportSortable, b: GloryReportSortable): number {
  return compareReportsDisplayOrder({
    publish_date: a.publishDate,
    status: a.status,
    year: a.year,
    id: a.id,
  }, {
    publish_date: b.publishDate,
    status: b.status,
    year: b.year,
    id: b.id,
  });
}

export function sortGloryReportsForDisplay<T extends GloryReportSortable>(entries: readonly T[]): T[] {
  return [...entries].sort(compareGloryReportsDisplayOrder);
}
