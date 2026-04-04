/*
  # Glory Insight Reports System

  1. New Tables
    - `reports`
      - `id` (uuid, primary key) - Unique identifier for each report
      - `title` (text) - Report title
      - `slug` (text, unique) - URL-friendly identifier
      - `type` (text) - Report type: 'monthly' or 'quarterly'
      - `reporting_period` (text) - e.g., "Q1 2024" or "March 2024"
      - `publish_date` (timestamptz) - When the report was published
      - `cover_image_url` (text) - URL to cover image
      - `executive_summary` (text) - Brief summary of the report
      - `key_metrics` (jsonb) - Array of key metric objects
      - `content_sections` (jsonb) - Array of content section objects
      - `is_featured` (boolean) - Whether to feature on landing page
      - `pdf_url` (text, nullable) - URL to downloadable PDF
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `reports` table
    - Add policy for public read access (reports are public content)
*/

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('monthly', 'quarterly')),
  reporting_period text NOT NULL,
  publish_date timestamptz NOT NULL DEFAULT now(),
  cover_image_url text NOT NULL DEFAULT '',
  executive_summary text NOT NULL DEFAULT '',
  key_metrics jsonb DEFAULT '[]'::jsonb,
  content_sections jsonb DEFAULT '[]'::jsonb,
  is_featured boolean DEFAULT false,
  pdf_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all reports
CREATE POLICY "Reports are publicly readable"
  ON reports
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create index for common queries
CREATE INDEX IF NOT EXISTS idx_reports_publish_date ON reports(publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(type);
CREATE INDEX IF NOT EXISTS idx_reports_slug ON reports(slug);
CREATE INDEX IF NOT EXISTS idx_reports_featured ON reports(is_featured) WHERE is_featured = true;