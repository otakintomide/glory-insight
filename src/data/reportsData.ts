/**
 * =============================================================================
 * GLORY INSIGHT — SINGLE SOURCE OF TRUTH FOR REPORTS
 * =============================================================================
 *
 * Add or update reports by editing the `REPORTS` array only.
 *
 * Published report checklist:
 * - Set `status: 'published'`
 * - Set `url` to the real public permalink (e.g. Notion) when `status: 'published'`
 * - Add cover `image` path under /public/…
 * - Optionally set `pdfUrl` (full URL or site path, e.g. `/reports/issue.pdf`) for download
 * - Legacy: `pdf` as filename only — served from `/public/reports/`
 *
 * The Featured section picks the newest `published` report among those with
 * `featured: true`. If none are flagged featured, it falls back to the single
 * published report (clean UX) or the newest published report.
 *
 * =============================================================================
 */

import { normalizePublishTimeMs, sortGloryReportsForDisplay } from '../lib/reportSort';

export type ReportStatus = 'published' | 'coming_soon';

export type ReportCadence = 'monthly' | 'quarterly';

/**
 * One row per report. All hub UI (featured, archive, filters, search) derives from this list.
 */
export interface GloryReport {
  id: string;
  /** URL segment for in-app routes: /report/:slug (defaults to `id`) */
  slug?: string;
  title: string;
  type: ReportCadence;
  /** Display label, e.g. "Q1 2026", "April 2026" */
  period: string;
  /**
   * ISO date YYYY-MM-DD — single source for archive sort and display.
   * Order is derived from this field only (not array or title order).
   */
  publishDate: string;
  /** Filter chip / archive year (should align with publishDate) */
  year: number;
  summary: string;
  /** Path under `public/` (e.g. `/images/q1-report-banner.jpg`); omit or null for placeholder */
  image?: string | null;
  status: ReportStatus;
  /** Canonical public URL (e.g. Notion); `null` for coming-soon rows. */
  url: string | null;
  /** Prefer this report in the Featured block when published (ties broken by publishDate) */
  featured: boolean;
  /**
   * Optional PDF for download — absolute `https://…`, or site path `/reports/….pdf`.
   * Takes precedence over `pdf` when both are set.
   */
  pdfUrl?: string | null;
  /** Legacy: file name only, resolved to `/public/reports/{pdf}` */
  pdf?: string | null;
  readTime?: number;
}

/** Newest-first among published rows (featured selection). */
export function newestFirst(a: GloryReport, b: GloryReport): number {
  const tb = normalizePublishTimeMs(b.publishDate, b.year);
  const ta = normalizePublishTimeMs(a.publishDate, a.year);
  if (tb !== ta) return tb - ta;
  return (a.id ?? '').localeCompare(b.id ?? '');
}

/**
 * Featured hero: newest published among `featured: true`, else single published row,
 * else newest published.
 */
export function selectFeaturedReport(entries: readonly GloryReport[]): GloryReport | null {
  const published = entries.filter((e) => e.status === 'published');
  if (published.length === 0) return null;

  const flagged = published.filter((e) => e.featured).sort(newestFirst);
  if (flagged.length > 0) return flagged[0];

  if (published.length === 1) return published[0];

  return [...published].sort(newestFirst)[0];
}

/**
 * Hub / archive order (not title or period string):
 * - `published` first, publishDate descending
 * - `coming_soon` after, publishDate ascending (next upcoming first)
 */
export function sortReportsForDisplay(entries: readonly GloryReport[]): GloryReport[] {
  return sortGloryReportsForDisplay(entries);
}

export function reportSlug(entry: GloryReport): string {
  return entry.slug ?? entry.id;
}

/**
 * All reports — append new monthlies / quarterlies here.
 */
const Q1_2026_NOTION_URL =
  'https://awake-crowd-3c6.notion.site/Glory-Insight-Q1-2026-Strategic-Report-337dd2386dd2807aafeaed94ab27c68f';

export const REPORTS: GloryReport[] = [
  {
    id: 'q1-2026-strategic-report',
    title: 'Glory Insight — Q1 2026 Strategic Report',
    type: 'quarterly',
    period: 'Q1 2026',
    publishDate: '2026-03-31',
    year: 2026,
    summary:
      'The first official Glory Insight strategic report covering ecosystem development, infrastructure progress, and market context for Q1 2026.',
    image: '/images/q1-report-banner.jpg',
    status: 'published',
    url: Q1_2026_NOTION_URL,
    featured: true,
    /** Optional: full URL or `/reports/file.pdf` — shows Download PDF when set */
    pdfUrl: null,
    pdf: null,
    readTime: 12,
  },
  {
    id: 'april-2026-monthly-brief',
    title: 'April 2026 Monthly Brief',
    type: 'monthly',
    period: 'April 2026',
    publishDate: '2026-05-01',
    year: 2026,
    summary: 'Monthly overview of ecosystem development and operational progress.',
    status: 'coming_soon',
    url: null,
    featured: false,
    pdf: null,
  },
  {
    id: 'may-2026-monthly-brief',
    title: 'May 2026 Monthly Brief',
    type: 'monthly',
    period: 'May 2026',
    publishDate: '2026-06-01',
    year: 2026,
    summary:
      'Monthly update on product development, community growth, and ecosystem expansion.',
    status: 'coming_soon',
    url: null,
    featured: false,
    pdf: null,
  },
];
