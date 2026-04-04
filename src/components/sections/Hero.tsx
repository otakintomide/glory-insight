import { FileText, ArrowRight } from 'lucide-react';
import { useFeaturedReport } from '../../hooks/useReports';
import { gloryClasses } from '../../theme/gloryTheme';
import { getPublishedReportHref } from '../../lib/reportLinks';

/** Compact institutional hero — report artwork lives in the Featured section below. */
export const Hero: React.FC = () => {
  const { report } = useFeaturedReport();
  const latestHref = report && report.status !== 'coming_soon' ? getPublishedReportHref(report) : '#reports';
  const latestExternal = latestHref.startsWith('http');

  return (
    <section className="relative overflow-hidden pt-28 pb-10 md:pt-32 md:pb-12">
      <div className="absolute inset-0 bg-[color:var(--glory-void)]" />
      <div className="glory-hero-ambient pointer-events-none absolute inset-0 opacity-[0.85]" />
      <div className="glory-grid-fine pointer-events-none absolute inset-0 opacity-[0.28]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--glory-text-soft)] sm:mb-5 sm:text-xs">
            Glory Universe
          </p>

          <h1 className="mb-4 text-4xl font-bold leading-[1.05] tracking-tight text-[color:var(--glory-text)] sm:text-5xl md:text-6xl lg:text-7xl">
            Glory Insight
          </h1>

          <p className="mx-auto mb-3 max-w-2xl text-lg font-light leading-snug text-[color:var(--glory-text-muted)] md:text-xl">
            Official reporting hub for the Glory Universe ecosystem
          </p>

          <p className="mx-auto mb-8 max-w-lg text-sm font-light leading-relaxed text-[color:var(--glory-text-soft)] md:mb-9 md:text-base">
            Monthly briefs and quarterly strategic reports — one reference for ecosystem progress and formal
            disclosure.
          </p>

          <div className="mx-auto flex max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            {report && report.status !== 'coming_soon' ? (
              <a
                href={latestHref}
                {...(latestExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group order-1 px-7 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base ${gloryClasses.primaryCta}`}
              >
                <FileText className="h-5 w-5 shrink-0" />
                Read Latest Report
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>
            ) : (
              <span
                className={`order-1 inline-flex cursor-not-allowed items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-[color:var(--glory-text-soft)] sm:px-8 sm:py-4 sm:text-base ${gloryClasses.secondaryCta}`}
              >
                <FileText className="h-5 w-5 shrink-0" />
                Read Latest Report
                <span className="text-xs font-semibold normal-case text-[color:var(--glory-gold)]">
                  (forthcoming)
                </span>
              </span>
            )}
            <a
              href="#reports"
              className={`order-2 px-7 py-3.5 text-sm sm:order-none sm:px-8 sm:py-4 sm:text-base ${gloryClasses.secondaryCta}`}
            >
              Browse Archive
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
