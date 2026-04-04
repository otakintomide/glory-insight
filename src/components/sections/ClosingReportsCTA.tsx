import { ArrowRight, FileText } from 'lucide-react';
import { useFeaturedReport } from '../../hooks/useReports';
import { gloryClasses } from '../../theme/gloryTheme';
import { getPublishedReportHref, isExternalHref } from '../../lib/reportLinks';

/** Final band: report-centric actions only — no repeated manifesto copy. */
export const ClosingReportsCTA: React.FC = () => {
  const { report } = useFeaturedReport();
  const readHref =
    report && report.status !== 'coming_soon' ? getPublishedReportHref(report) : '#reports';
  const external = isExternalHref(readHref);

  return (
    <section className="border-t border-[color:var(--glory-border)] bg-[color:var(--glory-cosmos)]/90 py-10 md:py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto flex max-w-lg flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <a
            href="#reports"
            className={`w-full px-7 py-3.5 text-center text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-base ${gloryClasses.secondaryCta}`}
          >
            Explore all reports
          </a>
          <a
            href={readHref}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`group w-full px-7 py-3.5 text-center text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-base ${gloryClasses.primaryCta}`}
          >
            <FileText className="h-5 w-5" />
            Read latest report
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
