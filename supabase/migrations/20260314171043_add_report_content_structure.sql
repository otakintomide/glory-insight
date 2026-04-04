/*
  # Add Report Content Structure

  1. Changes
    - Add `content_sections` JSONB column to reports table to store structured sections
    - Each section will have: title, content, order, type (text, metrics, list, etc.)
    - This allows flexible content formatting for both Monthly Brief and Quarterly Strategic formats
  
  2. Structure
    Monthly Brief sections:
      - Executive Summary
      - Ecosystem Highlights
      - Product Development Updates
      - Token / Market Overview
      - Community Growth and Activity
      - Partnerships / Strategic Progress
      - Challenges / Notes
      - Next Month Outlook
    
    Quarterly Strategic Report sections:
      - Leadership / Team Note
      - Quarterly Executive Summary
      - Major Milestones
      - Ecosystem Performance Review
      - Product-by-Product Updates
      - Community and Brand Growth
      - Treasury / Sustainability / Revenue Discussion
      - Strategic Priorities for Next Quarter
      - Long-Term Roadmap Progress
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reports' AND column_name = 'content_sections'
  ) THEN
    ALTER TABLE reports ADD COLUMN content_sections JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;