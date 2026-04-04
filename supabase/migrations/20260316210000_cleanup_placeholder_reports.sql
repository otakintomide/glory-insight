/*
  # Clean Up Placeholder Report Data

  1. Remove Q2 2026 Strategic Report (wrong featured report)
  2. Remove any remaining 2025 reports (e.g. Glory Universe Q4 2025 Strategic Report)
  3. Ensure Q1 2026 Strategic Report is the only featured report
  4. Reporting begins in 2026
*/

-- Remove Q2 2026 Strategic Report if it exists
DELETE FROM reports
WHERE slug IN ('q2-2026-strategic-report', 'quarterly-strategic-q2-2026')
   OR (title ILIKE '%Q2 2026%' AND type = 'quarterly');

-- Remove any remaining 2025 reports (including Glory Universe Q4 2025 Strategic Report)
DELETE FROM reports
WHERE EXTRACT(YEAR FROM publish_date) = 2025
   OR title ILIKE '%2025%'
   OR slug ILIKE '%2025%';

-- Unfeature all reports except Q1 2026 Strategic Report
UPDATE reports SET is_featured = false WHERE slug != 'q1-2026-strategic-report';

-- Ensure Q1 2026 Strategic Report is featured
UPDATE reports
SET is_featured = true,
    title = 'Q1 2026 Strategic Report',
    type = 'quarterly',
    reporting_period = 'Q1 2026',
    publish_date = '2026-04-01'::timestamptz,
    executive_summary = 'The first official Glory Insight strategic report covering ecosystem development, infrastructure progress, and market context for Q1 2026.',
    status = 'coming_soon'
WHERE slug = 'q1-2026-strategic-report';
