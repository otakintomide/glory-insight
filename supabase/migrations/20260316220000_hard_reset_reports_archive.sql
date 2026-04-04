/*
  # Hard Reset Reports Archive

  Replace ALL report data with exactly 3 entries:
  1. Q1 2026 Strategic Report (Featured)
  2. April 2026 Monthly Brief
  3. May 2026 Monthly Brief

  Removes: Q4 2025, Q2 2026, Glory Universe Monthly Brief, February/June samples, and all other entries.
*/

-- Delete ALL reports for a clean slate
DELETE FROM reports;

-- Insert 1. Q1 2026 Strategic Report (Featured, Coming Soon)
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
  '',
  'The first official Glory Insight strategic report covering ecosystem development, infrastructure progress, and market context for Q1 2026.',
  '[]'::jsonb,
  '[]'::jsonb,
  true,
  NULL,
  'coming_soon',
  ARRAY['strategic', 'quarterly', 'ecosystem'],
  0,
  2026
);

-- Insert 2. April 2026 Monthly Brief (Coming Soon)
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
  '',
  'Monthly overview of ecosystem development and operational progress.',
  '[]'::jsonb,
  '[]'::jsonb,
  false,
  NULL,
  'coming_soon',
  ARRAY['monthly', 'brief', 'ecosystem'],
  0,
  2026
);

-- Insert 3. May 2026 Monthly Brief (Coming Soon)
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
  '',
  'Monthly update on product development, community growth, and ecosystem expansion.',
  '[]'::jsonb,
  '[]'::jsonb,
  false,
  NULL,
  'coming_soon',
  ARRAY['monthly', 'brief', 'product', 'community'],
  0,
  2026
);
