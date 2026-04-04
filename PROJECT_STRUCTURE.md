# Glory Insight - Project Structure

## Overview
A scalable market intelligence platform built with React, TypeScript, Vite, and Supabase.

## Architecture

### Core Technologies
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Routing**: Custom hash-based router
- **Icons**: Lucide React
- **Build Tool**: Vite

---

## Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── report/          # Report-specific components
│   │   ├── ArchiveFilters.tsx    # Filter controls for archive page
│   │   ├── RelatedReports.tsx    # Related reports grid
│   │   ├── ReportCard.tsx        # Individual report card
│   │   ├── ReportMetrics.tsx     # Key metrics display
│   │   ├── ReportNavigation.tsx  # Prev/next navigation
│   │   ├── ReportSection.tsx     # Content section renderer
│   │   └── TableOfContents.tsx   # TOC for report detail
│   │
│   ├── sections/        # Page sections (landing page)
│   │   ├── CTASection.tsx        # Call-to-action section
│   │   ├── FeaturedReport.tsx    # Featured report showcase
│   │   ├── Hero.tsx              # Hero banner
│   │   ├── MarketSnapshot.tsx    # Market overview
│   │   ├── ReportsArchive.tsx    # Reports archive section
│   │   └── WhyInsight.tsx        # Value proposition
│   │
│   ├── Badge.tsx        # Badge component
│   ├── Button.tsx       # Button component
│   ├── Card.tsx         # Card container
│   ├── Footer.tsx       # Site footer
│   └── Header.tsx       # Site header/nav
│
├── pages/               # Top-level page components
│   ├── Home.tsx         # Landing page (/)
│   └── ReportDetail.tsx # Report detail page (/report/:slug)
│
├── hooks/               # Custom React hooks
│   └── useReports.ts    # Report data fetching hooks
│
├── lib/                 # Core utilities
│   ├── router.tsx       # Custom routing system
│   └── supabase.ts      # Supabase client & types
│
├── types/               # TypeScript definitions
│   └── report.ts        # Report-related types (legacy)
│
├── App.tsx              # Root application component
├── main.tsx             # Application entry point
└── index.css            # Global styles

supabase/
└── migrations/          # Database migrations
    ├── 20260314162209_create_reports_system.sql
    ├── 20260314171043_add_report_content_structure.sql
    ├── 20260314172450_add_related_reports_column.sql
    └── 20260314172829_enhance_reports_table_with_additional_fields.sql
```

---

## Data Flow

### Database Schema (Supabase)

**Table: `reports`**
```sql
- id (uuid, primary key)
- title (text)
- slug (text, unique) -- URL identifier
- type ('monthly' | 'quarterly')
- reporting_period (text) -- e.g., "Q4 2025"
- publish_date (timestamptz)
- cover_image_url (text)
- executive_summary (text)
- key_metrics (jsonb) -- Array of metric objects
- content_sections (jsonb) -- Array of section objects
- is_featured (boolean) -- Featured report flag
- pdf_url (text, nullable)
- related_reports (jsonb) -- Array of related report IDs
- tags (text[]) -- Categorization tags
- read_time (integer) -- Estimated minutes
- year (integer) -- Extracted from publish_date
- created_at (timestamptz)
- updated_at (timestamptz)
```

### TypeScript Interfaces

```typescript
// From src/lib/supabase.ts

interface KeyMetric {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface ContentSection {
  id: string;
  title: string;
  content: string;
}

interface Report {
  id: string;
  title: string;
  slug: string;
  type: 'monthly' | 'quarterly';
  reporting_period: string;
  publish_date: string;
  cover_image_url: string;
  executive_summary: string;
  key_metrics: KeyMetric[];
  content_sections: ContentSection[];
  is_featured: boolean;
  pdf_url: string | null;
  related_reports?: string[];
  tags?: string[];
  read_time?: number;
  year?: number;
  created_at: string;
  updated_at: string;
}
```

---

## Routing System

### Routes
- `/` - Home page with all sections
- `/report/:slug` - Individual report detail page

### Navigation Pattern
```typescript
// Using the custom Link component
import { Link } from '../lib/router';

<Link to="/report/quarterly-strategic-q4-2025">
  View Report
</Link>

// Programmatic navigation
const { navigate } = useRouter();
navigate('/report/monthly-brief-february-2026');
```

---

## Component Patterns

### Reusable Report Components

**ReportCard** - Displays report preview
```tsx
<ReportCard report={report} />
```

**ReportMetrics** - Shows key metrics grid
```tsx
<ReportMetrics metrics={report.key_metrics} />
```

**TableOfContents** - Navigable TOC
```tsx
<TableOfContents sections={report.content_sections} />
```

**ReportNavigation** - Prev/next links
```tsx
<ReportNavigation
  previousReport={prevReport}
  nextReport={nextReport}
/>
```

**RelatedReports** - Related content
```tsx
<RelatedReports
  reports={relatedReports}
  title="Related Reports"
/>
```

---

## Data Hooks

### useReports()
Fetches all reports, sorted by date descending
```typescript
const { reports, loading, error } = useReports();
```

### useFeaturedReport()
Fetches the featured report (is_featured = true)
```typescript
const { report, loading, error } = useFeaturedReport();
```

### useReport(slug)
Fetches single report by slug
```typescript
const { report, loading, error } = useReport('quarterly-strategic-q4-2025');
```

---

## Adding New Reports

### Method 1: Via Supabase Dashboard
1. Navigate to Supabase dashboard
2. Open the `reports` table
3. Insert new row with all required fields
4. Set `is_featured` to true to feature on homepage

### Method 2: Via SQL
```sql
INSERT INTO reports (
  title,
  slug,
  type,
  reporting_period,
  cover_image_url,
  executive_summary,
  key_metrics,
  content_sections,
  is_featured,
  pdf_url,
  tags,
  read_time
) VALUES (
  'Market Analysis Q1 2026',
  'quarterly-strategic-q1-2026',
  'quarterly',
  'Q1 2026',
  'https://images.pexels.com/photos/123456/image.jpg',
  'Executive summary here...',
  '[
    {
      "label": "Market Growth",
      "value": "23.4%",
      "change": "+5.2%",
      "trend": "up"
    }
  ]'::jsonb,
  '[
    {
      "id": "section-1",
      "title": "Market Overview",
      "content": "Content here..."
    }
  ]'::jsonb,
  false,
  'https://example.com/report.pdf',
  ARRAY['market', 'analysis', 'quarterly'],
  12
);
```

---

## Styling Guidelines

### Color Palette
- **Primary**: Amber (amber-500, amber-600)
- **Background**: Slate (slate-900, slate-950)
- **Text**: White (headings), slate-300/400 (body)
- **Borders**: slate-700/50 (subtle borders)

### Component Patterns
- Glass morphism: `backdrop-blur-sm bg-slate-900/50`
- Hover effects: Border color change + shadow
- Transitions: `transition-all duration-300`

---

## Best Practices

### Component Creation
1. Keep components focused and single-purpose
2. Use TypeScript interfaces for props
3. Export types alongside components
4. Use semantic HTML elements

### Data Management
1. All data comes from Supabase
2. Use provided hooks for data fetching
3. Handle loading and error states
4. Use `maybeSingle()` for single row queries

### Performance
1. Images use object-cover for consistency
2. Lazy loading handled by browser
3. Efficient queries with specific selects
4. Indexes on slug, year, is_featured

---

## Future Extensibility

### Easy Modifications

**Change featured report:**
```sql
UPDATE reports SET is_featured = false WHERE is_featured = true;
UPDATE reports SET is_featured = true WHERE slug = 'new-featured-slug';
```

**Add new report type:**
1. Update type constraint in migration
2. Update TypeScript type definition
3. Add badge variant if needed

**Add search by tags:**
Already indexed and ready - filter in component:
```typescript
reports.filter(r => r.tags?.includes(searchTag))
```

**Add pagination:**
Modify useReports hook:
```typescript
.range(start, end)
```

---

## Key Files Reference

- **Entry**: `src/main.tsx`
- **Router**: `src/lib/router.tsx`
- **Data Layer**: `src/lib/supabase.ts`, `src/hooks/useReports.ts`
- **Pages**: `src/pages/Home.tsx`, `src/pages/ReportDetail.tsx`
- **Components**: `src/components/` (all reusable pieces)

---

## Development Commands

```bash
# Development server (auto-start)
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```
