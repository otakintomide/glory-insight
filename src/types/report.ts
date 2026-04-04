export interface ReportSection {
  title: string;
  content: string | string[];
  type: 'text' | 'list' | 'metrics';
  order: number;
}

export interface Report {
  id: string;
  type: 'Monthly Brief' | 'Quarterly Strategic';
  title: string;
  period: string;
  publish_date: string;
  cover_image: string;
  executive_summary: string;
  content_sections: ReportSection[];
  key_metrics: {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
  }[];
  related_reports?: string[];
  created_at: string;
  status?: 'published' | 'coming_soon' | 'draft';
}
