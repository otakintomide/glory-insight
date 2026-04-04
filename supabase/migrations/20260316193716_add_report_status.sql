/*
  # Add Status Column to Reports Table

  1. Changes
    - Add `status` column to `reports` table with enum type
    - Status values: 'published', 'coming_soon', 'draft'
    - Default value: 'published' for backward compatibility
    
  2. Notes
    - Existing reports will be set to 'published' status
    - New reports can be marked as 'coming_soon' or 'draft'
*/

-- Create status enum type
DO $$ BEGIN
  CREATE TYPE report_status AS ENUM ('published', 'coming_soon', 'draft');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add status column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'status'
  ) THEN
    ALTER TABLE reports ADD COLUMN status report_status DEFAULT 'published' NOT NULL;
  END IF;
END $$;