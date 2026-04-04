import { useState, useEffect } from 'react';
import type { Report } from '../lib/supabase';
import {
  REPORTS,
  selectFeaturedReport,
  sortReportsForDisplay,
  reportSlug,
  type InsightReport,
} from '../data/reports';

/**
 * All report-driven UI reads from `src/data/reports.ts` (`REPORTS`).
 */

function toReport(entry: InsightReport): Report {
  const slug = reportSlug(entry);
  const pdfUrl = entry.pdfUrl?.trim() || null;
  const imageTrimmed = entry.image?.trim() ?? '';

  return {
    id: entry.id,
    title: entry.title,
    slug,
    type: entry.type === 'Quarterly' ? 'quarterly' : 'monthly',
    reporting_period: entry.period,
    publish_date: entry.publishDate,
    cover_image_url: imageTrimmed,
    image: imageTrimmed || null,
    executive_summary: entry.summary,
    key_metrics: [],
    content_sections: [],
    is_featured: entry.featured,
    pdf_url: pdfUrl,
    public_url: entry.url,
    status: entry.status === 'Coming Soon' ? 'coming_soon' : 'published',
    tags: [],
    read_time: 0,
    year: entry.year,
    created_at: `${entry.publishDate}T00:00:00Z`,
    updated_at: `${entry.publishDate}T00:00:00Z`,
  };
}

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      const orderedConfig = sortReportsForDisplay(REPORTS);
      setReports(orderedConfig.map(toReport));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  }, []);

  return { reports, loading, error };
};

export const useFeaturedReport = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      const entry = selectFeaturedReport(REPORTS);
      setReport(entry ? toReport(entry) : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load featured report');
    } finally {
      setLoading(false);
    }
  }, []);

  return { report, loading, error };
};

export const useReport = (slug: string | undefined) => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setReport(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const entry = REPORTS.find((r) => reportSlug(r) === slug) ?? null;
      setReport(entry ? toReport(entry) : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load report');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  return { report, loading, error };
};
