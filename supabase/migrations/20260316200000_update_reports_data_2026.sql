/*
  # Update Glory Insight Report Data for 2026

  1. Remove fake placeholder reports from 2024 and 2025
  2. Add official 2026 reports (Q1 Strategic + April/May Monthly Briefs)
  3. All new reports have status 'coming_soon'
  4. Q1 2026 Strategic Report is featured
*/

-- Remove placeholder reports from 2024 and 2025
DELETE FROM reports
WHERE EXTRACT(YEAR FROM publish_date) IN (2024, 2025);

-- Insert Q1 2026 Strategic Report (Featured, Coming Soon)
INSERT INTO reports (
  title,
  slug,
  type,
  reporting_period,
  publish_date,
  cover_image_url,
  executive_summary,
  key_metrics,
  content_sections,
  is_featured,
  pdf_url,
  status,
  tags,
  read_time,
  year
) VALUES (
  'Q1 2026 Strategic Report',
  'q1-2026-strategic-report',
  'quarterly',
  'Q1 2026',
  '2026-04-01'::timestamptz,
  'https://placehold.co/800x600/1e293b/64748b?text=Q1+2026',
  'The first official Glory Insight strategic report covering ecosystem development, infrastructure progress, and market context for Q1 2026.',
  '[]'::jsonb,
  '[]'::jsonb,
  true,
  NULL,
  'coming_soon',
  ARRAY['strategic', 'quarterly', 'ecosystem'],
  0,
  2026
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  type = EXCLUDED.type,
  reporting_period = EXCLUDED.reporting_period,
  publish_date = EXCLUDED.publish_date,
  executive_summary = EXCLUDED.executive_summary,
  is_featured = EXCLUDED.is_featured,
  pdf_url = EXCLUDED.pdf_url,
  status = EXCLUDED.status,
  tags = EXCLUDED.tags,
  read_time = EXCLUDED.read_time,
  year = EXCLUDED.year,
  updated_at = now();

-- Insert April 2026 Monthly Brief
INSERT INTO reports (
  title,
  slug,
  type,
  reporting_period,
  publish_date,
  cover_image_url,
  executive_summary,
  key_metrics,
  content_sections,
  is_featured,
  pdf_url,
  status,
  tags,
  read_time,
  year
) VALUES (
  'April 2026 Monthly Brief',
  'april-2026-monthly-brief',
  'monthly',
  'April 2026',
  '2026-05-01'::timestamptz,
  'https://placehold.co/800x600/1e293b/64748b?text=April+2026',
  'Monthly overview of ecosystem development and operational progress.',
  '[]'::jsonb,
  '[]'::jsonb,
  false,
  NULL,
  'coming_soon',
  ARRAY['monthly', 'brief', 'ecosystem'],
  0,
  2026
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  type = EXCLUDED.type,
  reporting_period = EXCLUDED.reporting_period,
  publish_date = EXCLUDED.publish_date,
  executive_summary = EXCLUDED.executive_summary,
  pdf_url = EXCLUDED.pdf_url,
  status = EXCLUDED.status,
  tags = EXCLUDED.tags,
  read_time = EXCLUDED.read_time,
  year = EXCLUDED.year,
  updated_at = now();

-- Insert May 2026 Monthly Brief
INSERT INTO reports (
  title,
  slug,
  type,
  reporting_period,
  publish_date,
  cover_image_url,
  executive_summary,
  key_metrics,
  content_sections,
  is_featured,
  pdf_url,
  status,
  tags,
  read_time,
  year
) VALUES (
  'May 2026 Monthly Brief',
  'may-2026-monthly-brief',
  'monthly',
  'May 2026',
  '2026-06-01'::timestamptz,
  'https://placehold.co/800x600/1e293b/64748b?text=May+2026',
  'Monthly update on product development, community growth, and ecosystem expansion.',
  '[]'::jsonb,
  '[]'::jsonb,
  false,
  NULL,
  'coming_soon',
  ARRAY['monthly', 'brief', 'product', 'community'],
  0,
  2026
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  type = EXCLUDED.type,
  reporting_period = EXCLUDED.reporting_period,
  publish_date = EXCLUDED.publish_date,
  executive_summary = EXCLUDED.executive_summary,
  pdf_url = EXCLUDED.pdf_url,
  status = EXCLUDED.status,
  tags = EXCLUDED.tags,
  read_time = EXCLUDED.read_time,
  year = EXCLUDED.year,
  updated_at = now();
