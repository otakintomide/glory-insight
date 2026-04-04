import type { Report } from './supabase';

/**
 * Resolved banner URL for report cards and featured/detail heroes.
 * Prefers `report.image` (from `reportsData`) when set; falls back to `cover_image_url`.
 */
export function reportBannerSrc(report: Report): string {
  const fromImage = report.image?.trim();
  if (fromImage) return fromImage;
  return report.cover_image_url?.trim() ?? '';
}
