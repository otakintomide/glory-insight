/*
  # Enhance Reports Table

  1. New Columns
    - `tags` (text[]) - Array of tags for categorization and filtering
    - `read_time` (integer) - Estimated read time in minutes
    - `year` (integer) - Year extracted from publish_date for easier filtering

  2. Changes
    - Add index on year column for better query performance
    - Add index on tags for array operations
    - Add index on is_featured for quick featured report queries

  3. Notes
    - These fields make it easier to filter, categorize, and display reports
    - The year field is redundant but improves query performance
    - Read time helps users understand time commitment
*/

DO $$
BEGIN
  -- Add tags column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'tags'
  ) THEN
    ALTER TABLE reports ADD COLUMN tags TEXT[] DEFAULT '{}';
  END IF;

  -- Add read_time column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'read_time'
  ) THEN
    ALTER TABLE reports ADD COLUMN read_time INTEGER DEFAULT 10;
  END IF;

  -- Add year column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'year'
  ) THEN
    ALTER TABLE reports ADD COLUMN year INTEGER;
  END IF;
END $$;

-- Create index on year for filtering
CREATE INDEX IF NOT EXISTS idx_reports_year ON reports(year);

-- Create index on tags for array searches
CREATE INDEX IF NOT EXISTS idx_reports_tags ON reports USING GIN(tags);

-- Create index on is_featured for quick featured report queries
CREATE INDEX IF NOT EXISTS idx_reports_is_featured ON reports(is_featured) WHERE is_featured = true;

-- Update year from publish_date for existing records
UPDATE reports SET year = EXTRACT(YEAR FROM publish_date)::INTEGER WHERE year IS NULL;
