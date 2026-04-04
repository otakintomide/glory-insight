/*
  # Add Related Reports Column

  1. Changes
    - Add `related_reports` JSONB column to reports table
    - This will store an array of report slugs for related/previous/next reports
    - Allows flexible linking between reports for navigation
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'related_reports'
  ) THEN
    ALTER TABLE reports ADD COLUMN related_reports JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;