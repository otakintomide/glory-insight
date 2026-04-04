import type { Report } from './supabase';

/** Primary "read" target: public permalink when set, otherwise in-app report route. */
export function getPublishedReportHref(report: Report): string {
  if (report.status === 'coming_soon') return '#reports';
  const pub = report.public_url?.trim();
  if (pub) return pub;
  return `#/report/${report.slug}`;
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
