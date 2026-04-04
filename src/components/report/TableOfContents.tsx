import { ArrowRight } from 'lucide-react';
import { Card } from '../Card';
import type { ContentSection } from '../../lib/supabase';

interface TableOfContentsProps {
  sections: ContentSection[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  if (!sections || sections.length === 0) return null;

  return (
    <Card className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-[color:var(--glory-text)]">Table of Contents</h2>
      <nav className="space-y-1">
        {sections.map((section, index) => (
          <a
            key={section.id}
            href={`#section-${section.id}`}
            className="group flex items-center gap-4 border-b border-[color:var(--glory-border)] py-4 text-[color:var(--glory-text-muted)] transition-all duration-200 last:border-0 hover:pl-4 hover:text-[color:var(--glory-gold)]"
          >
            <span className="w-8 text-lg font-bold text-[color:var(--glory-gold)] opacity-50 transition-opacity group-hover:opacity-100">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-lg font-medium">{section.title}</span>
            <ArrowRight className="ml-auto h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        ))}
      </nav>
    </Card>
  );
};
