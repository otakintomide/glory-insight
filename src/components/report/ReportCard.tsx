import { useState } from 'react';
import { ArrowRight, Download, Library } from 'lucide-react';
import { Link } from '../../lib/router';
import { Badge } from '../Badge';
import type { Report } from '../../lib/supabase';
import { reportBannerSrc } from '../../lib/reportBanner';
import { getPublishedReportHref, isExternalHref } from '../../lib/reportLinks';
import { gloryClasses, gloryFocusRing } from '../../theme/gloryTheme';

interface ReportCardProps {
  report: Report;
}

const coverPlaceholder = (
  <div className="absolute inset-0 bg-[color:var(--glory-navy-deep)]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(212,175,55,0.08),transparent_55%)]" />
    <div className="flex h-full items-center justify-center opacity-25">
      <Library className="h-14 w-14 text-[color:var(--glory-text-soft)]" aria-hidden />
    </div>
  </div>
);

function PublishedReadLink({
  report,
  href,
  external,
  className,
  children,
}: {
  report: Report;
  href: string;
  external: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={`/report/${report.slug}`} className={className}>
      {children}
    </Link>
  );
}

function PublishedReportCardBody({
  report,
  publishedHref,
  openExternally,
}: {
  report: Report;
  publishedHref: string;
  openExternally: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const bannerSrc = reportBannerSrc(report);
  const showPlaceholder = !bannerSrc || imageError;
  const pdfHref = report.pdf_url?.trim() || null;

  return (
    <div className="flex h-full flex-col">
      <PublishedReadLink
        report={report}
        href={publishedHref}
        external={openExternally}
        className="relative block h-52 min-h-0 w-full flex-shrink-0 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--glory-gold)]/35 sm:h-56"
      >
        {showPlaceholder ? (
          coverPlaceholder
        ) : (
          <img
            src={bannerSrc}
            alt=""
            onError={() => setImageError(true)}
            className="h-full w-full min-h-0 object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        )}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[color:var(--glory-void)]/55 to-transparent sm:h-32"
          aria-hidden
        />
      </PublishedReadLink>

      <div className="relative flex flex-1 flex-col border-t border-[color:var(--glory-border)] border-l-[3px] border-l-[color:var(--glory-gold)] bg-[color:var(--glory-panel)] p-5 sm:p-6">
        <Badge variant={report.type === 'quarterly' ? 'quarterly' : 'monthly'} className="mb-3 w-fit">
          {report.type === 'quarterly' ? 'Quarterly' : 'Monthly'}
        </Badge>
        <PublishedReadLink
          report={report}
          href={publishedHref}
          external={openExternally}
          className={`mb-2 block min-h-0 rounded-sm outline-none ${gloryFocusRing}`}
        >
          <h3 className="line-clamp-2 min-h-[2.75rem] text-left text-lg font-bold leading-snug text-[color:var(--glory-text)] transition-colors group-hover:text-[color:var(--glory-gold)] sm:text-xl">
            {report.title}
          </h3>
        </PublishedReadLink>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--glory-gold)] sm:text-sm">
          {report.reporting_period}
        </p>
        <PublishedReadLink
          report={report}
          href={publishedHref}
          external={openExternally}
          className={`mb-4 block flex-1 min-w-0 rounded-sm outline-none ${gloryFocusRing}`}
        >
          <p className="line-clamp-2 text-left text-sm font-light leading-relaxed text-[color:var(--glory-text)]/92 sm:text-[0.9375rem]">
            {report.executive_summary}
          </p>
        </PublishedReadLink>

        <div className="mt-auto flex flex-col gap-2.5 pt-1">
          <PublishedReadLink
            report={report}
            href={publishedHref}
            external={openExternally}
            className={`inline-flex w-fit items-center gap-2 pt-1 text-sm font-bold text-[color:var(--glory-gold)] underline-offset-4 transition-all hover:gap-3 hover:underline hover:decoration-[color:var(--glory-gold)]/60 ${gloryFocusRing} rounded-sm`}
          >
            Open report
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </PublishedReadLink>
          {pdfHref ? (
            <a
              href={pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${gloryClasses.secondaryCta} w-full justify-center gap-2 px-3 py-2.5 text-xs font-bold sm:w-auto sm:px-4 sm:py-2.5 sm:text-sm ${gloryFocusRing}`}
            >
              <Download className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
              Download PDF
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ComingSoonCardInner({ report }: { report: Report }) {
  const [imageError, setImageError] = useState(false);
  const bannerSrc = reportBannerSrc(report);
  const showPlaceholder = !bannerSrc || imageError;

  return (
    <div className="flex h-full flex-col">
      <div className="relative h-52 min-h-0 w-full flex-shrink-0 overflow-hidden opacity-75 grayscale-[0.25] sm:h-56">
        {showPlaceholder ? (
          coverPlaceholder
        ) : (
          <img
            src={bannerSrc}
            alt=""
            onError={() => setImageError(true)}
            className="h-full w-full min-h-0 object-cover object-center"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--glory-void)] via-[color:var(--glory-void)]/40 to-[color:var(--glory-void)]/10" />
        <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--glory-void)]/45 backdrop-blur-[2px]">
          <span className="rounded-lg border border-[color:var(--glory-border-strong)] bg-[color:var(--glory-cosmos)]/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[color:var(--glory-gold)] shadow-lg">
            Coming soon
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col border-t border-[color:var(--glory-border)] bg-[color:var(--glory-void)]/40 p-5 sm:p-6">
        <Badge variant={report.type === 'quarterly' ? 'quarterly' : 'monthly'} className="mb-3 w-fit">
          {report.type === 'quarterly' ? 'Quarterly' : 'Monthly'}
        </Badge>
        <h3 className="mb-2 line-clamp-2 min-h-[2.75rem] text-lg font-bold leading-snug text-[color:var(--glory-text-soft)] sm:text-xl">
          {report.title}
        </h3>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--glory-text-soft)] sm:text-sm">
          {report.reporting_period}
        </p>
        <p className="mb-4 line-clamp-2 flex-1 text-sm font-light leading-relaxed text-[color:var(--glory-text-soft)] sm:text-[0.9375rem]">
          {report.executive_summary}
        </p>
        <p className="mt-auto pt-1 text-xs font-medium text-[color:var(--glory-text-soft)]">
          Listed for upcoming release — not yet available to open.
        </p>
      </div>
    </div>
  );
}

export const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const isComingSoon = report.status === 'coming_soon';

  const publishedShell =
    'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--glory-border-strong)] bg-[color:var(--glory-panel)] shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--glory-gold-muted)] hover:shadow-[0_22px_64px_rgba(0,0,0,0.42)]';

  const scheduledShell =
    'relative flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-[color:var(--glory-border)] bg-[color:var(--glory-panel)]/55 shadow-none';

  if (isComingSoon) {
    return (
      <article
        className={`${scheduledShell} h-full cursor-default`}
        aria-label={`${report.title}, coming soon`}
      >
        <ComingSoonCardInner report={report} />
      </article>
    );
  }

  const publishedHref = getPublishedReportHref(report);
  const openExternally = isExternalHref(publishedHref);

  return (
    <article
      className={`${publishedShell} h-full cursor-default`}
      aria-label={`${report.title}, published report`}
    >
      <PublishedReportCardBody
        report={report}
        publishedHref={publishedHref}
        openExternally={openExternally}
      />
    </article>
  );
};
