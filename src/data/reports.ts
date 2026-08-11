/**
 * =============================================================================
 * GLORY INSIGHT — SINGLE SOURCE OF TRUTH (PUBLISHING PIPELINE)
 * =============================================================================
 *
 * Add one object per report. Everything else (featured, archive, links, images,
 * filters, sort order) is derived from this list.
 *
 * Publishing workflow:
 * 1. Drop PDF into `public/reports/` (e.g. `q2-2026.pdf`)
 * 2. Drop banner into `public/images/reports/` (e.g. `q2-2026-banner.jpg`)
 * 3. Append a row to `REPORTS` below (`pdfUrl`: `/reports/…`, `image`: `/images/reports/…`)
 * 4. `npm run build`
 * 5. `npx wrangler pages deploy dist --project-name=glory-insight`
 *
 * Sorting (automatic):
 * - Published first, `publishDate` descending
 * - Coming Soon after, `publishDate` ascending
 *
 * Rendering (automatic):
 * - `image` set → show banner where applicable
 * - `url` set + Published → active Read report
 * - `pdfUrl` set + Published → Download PDF
 * - Coming Soon → subdued UI, no live Read/PDF actions
 *
 * =============================================================================
 */

import { normalizePublishTimeMs, sortGloryReportsForDisplay } from '../lib/reportSort';

export type ReportType = 'Monthly' | 'Quarterly';

export type ReportStatus = 'Published' | 'Coming Soon';

/** One hub row — edit only this shape + `REPORTS` below. */
export interface InsightReport {
  id: string;
  title: string;
  type: ReportType;
  period: string;
  publishDate: string;
  year: number;
  summary: string;
  status: ReportStatus;
  featured: boolean;
  url: string | null;
  pdfUrl: string | null;
  image: string | null;
}

export function reportSlug(entry: InsightReport): string {
  return entry.id;
}

export function newestFirst(a: InsightReport, b: InsightReport): number {
  const tb = normalizePublishTimeMs(b.publishDate, b.year);
  const ta = normalizePublishTimeMs(a.publishDate, a.year);
  if (tb !== ta) return tb - ta;
  return a.id.localeCompare(b.id);
}

/**
 * Featured: newest Published among `featured: true`, else lone Published,
 * else newest Published.
 */
export function selectFeaturedReport(entries: readonly InsightReport[]): InsightReport | null {
  const published = entries.filter((e) => e.status === 'Published');
  if (published.length === 0) return null;

  const flagged = published.filter((e) => e.featured).sort(newestFirst);
  if (flagged.length > 0) return flagged[0];

  if (published.length === 1) return published[0];

  return [...published].sort(newestFirst)[0];
}

export function sortReportsForDisplay(entries: readonly InsightReport[]): InsightReport[] {
  return sortGloryReportsForDisplay(entries);
}

const Q2_2026_NOTION_URL =
  'https://www.notion.so/Glory-Insight-Q2-2026-Strategic-Report-337dd2386dd2807aafeaed94ab27c68f';

export const REPORTS: InsightReport[] = [
  {
    id: 'q2-2026-strategic-report',
    title: 'Glory Insight — Q2 2026 Strategic Report',
    type: 'Quarterly',
    period: 'Q2 2026',
    publishDate: '2026-06-30',
    year: 2026,
    summary:
      'Glory Insight Q2 strategic report covering ecosystem development, infrastructure progress, and market context for Q2 2026.',
    status: 'Published',
    featured: true,
    url: Q2_2026_NOTION_URL,
    pdfUrl: "/reports/glory-insight-q2-2026-strategic-report.pdf",
    image: '/images/reports/q1-report-banner.jpg',
  },
  {
    id: 'july-2026-monthly-brief',
    title: 'July 2026 Monthly Brief',
    type: 'Monthly',
    period: 'July 2026',
    publishDate: '2026-07-31',
    year: 2026,
    summary: 'Monthly update on product development, community growth, and ecosystem expansion.',
    status: 'Published',
    featured: false,
    url: "https://app.notion.com/p/Glory-Insight-July-2026-Monthly-Brief-3b9dd2386dd280b7aee5c1c54fa2d699",
    pdfUrl: "/reports/glory-insight-july-2026-monthly-brief.pdf",
    image: '/images/reports/q1-report-banner.jpg',
  },
  {
    id: 'may-2026-monthly-brief',
    title: 'May 2026 Monthly Brief',
    type: 'Monthly',
    period: 'May 2026',
    publishDate: '2026-06-01',
    year: 2026,
    summary:
      'Monthly update on product development, community growth, and ecosystem expansion.',
    status: 'Published',
    featured: false,
    url: "https://app.notion.com/p/Glory-Insight-May-2026-Monthly-Brief-377dd2386dd28032b405c1df8c7e75f4?v=337dd2386dd280039629000cfb1b85a5",
    pdfUrl: "/reports/glory-insight-may-2026-monthly-brief.3pdf",
    image: '/images/reports/q1-report-banner.jpg',
  },
];
