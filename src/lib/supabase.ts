import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface KeyMetric {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
}

export interface Report {
  id: string;
  title: string;
  slug: string;
  type: 'monthly' | 'quarterly';
  reporting_period: string;
  publish_date: string;
  cover_image_url: string;
  /** Optional banner path from `src/data/reports.ts` (`image`); preferred by UI when set. */
  image?: string | null;
  executive_summary: string;
  key_metrics: KeyMetric[];
  content_sections: ContentSection[];
  is_featured: boolean;
  pdf_url: string | null;
  /** Canonical public permalink from `src/data/reports.ts` (`url`); optional. */
  public_url?: string | null;
  related_reports?: string[];
  tags?: string[];
  read_time?: number;
  year?: number;
  status?: 'published' | 'coming_soon' | 'draft';
  created_at: string;
  updated_at: string;
}
