import React from 'react';

export interface ReportSectionProps {
  title: string;
  content: string | string[];
  type?: 'text' | 'list' | 'metrics';
  order?: number;
}

export const ReportSection: React.FC<ReportSectionProps> = ({ title, content, type = 'text' }) => {
  return (
    <section className="mb-12 scroll-mt-24" id={title.toLowerCase().replace(/\s+/g, '-')}>
      <div className="mb-6 border-l-4 border-[color:var(--glory-gold-muted)] pl-6">
        <h2 className="mb-2 text-2xl font-bold text-[color:var(--glory-text)] md:text-3xl">
          {title}
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-[color:var(--glory-gold)] to-transparent opacity-80" />
      </div>

      {type === 'text' && typeof content === 'string' && (
        <div className="prose prose-invert max-w-none">
          {content.split('\n\n').map((paragraph, idx) => (
            <p
              key={idx}
              className="mb-4 text-base font-light leading-relaxed text-[color:var(--glory-text-muted)] md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {type === 'list' && Array.isArray(content) && (
        <ul className="space-y-4">
          {content.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-[color:var(--glory-text-muted)]">
              <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--glory-border)] bg-[color:var(--glory-gold-glow-faint)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--glory-gold)]" />
              </span>
              <span className="flex-1 text-base font-light leading-relaxed md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {type === 'metrics' && typeof content === 'string' && (
        <div className="rounded-xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] p-6 shadow-glory-panel backdrop-blur-sm md:p-8">
          <div className="prose prose-invert max-w-none">
            {content.split('\n\n').map((paragraph, idx) => (
              <p
                key={idx}
                className="mb-4 text-base font-light leading-relaxed text-[color:var(--glory-text-muted)] last:mb-0 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
