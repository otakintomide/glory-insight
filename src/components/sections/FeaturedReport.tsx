import { ArrowRight, Calendar, Clock, Download } from 'lucide-react';
import { useFeaturedReport } from '../../hooks/useReports';
import { Badge } from '../Badge';
import { gloryClasses, gloryFocusRing } from '../../theme/gloryTheme';
import { getPublishedReportHref, isExternalHref } from '../../lib/reportLinks';
import { reportBannerSrc } from '../../lib/reportBanner';
import { formatPublishDateDisplay } from '../../lib/reportDate';

export const FeaturedReport: React.FC = () => {
  const { report, loading } = useFeaturedReport();

  if (loading) {
    return (
      <section className="border-t border-[color:var(--glory-border)] py-12 md:py-16" aria-hidden>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid animate-pulse grid-cols-1 overflow-hidden rounded-2xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] md:grid-cols-2">
            <div className="h-[280px] bg-[color:var(--glory-navy-deep)] sm:h-[300px] md:h-[360px]" />
            <div className="space-y-4 p-6 sm:p-8 md:p-10">
              <div className="h-3 w-24 rounded bg-[color:var(--glory-border)]" />
              <div className="h-8 max-w-md rounded bg-[color:var(--glory-border)]" />
              <div className="h-16 rounded bg-[color:var(--glory-border)]/60" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!report) {
    return null;
  }

  const readHref =
    report.status === 'coming_soon' ? undefined : getPublishedReportHref(report);
  const readExternal = readHref ? isExternalHref(readHref) : false;
  const pdfHref = report.pdf_url?.trim() || null;
  const bannerSrc = reportBannerSrc(report);

  const cardShellPublished =
    'group relative overflow-hidden rounded-2xl border border-[color:var(--glory-border-strong)] bg-[color:var(--glory-panel)] shadow-[0_24px_72px_rgba(0,0,0,0.45)] ring-1 ring-[color:var(--glory-border)]/50 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[color:rgba(201,162,39,0.38)] hover:shadow-[0_32px_88px_rgba(0,0,0,0.5),0_0_40px_rgba(212,175,55,0.08)]';

  const cardShellPlaceholder =
    'relative overflow-hidden rounded-2xl border border-dashed border-[color:var(--glory-border)] bg-[color:var(--glory-panel)]/80 shadow-[0_16px_48px_rgba(0,0,0,0.35)] ring-1 ring-[color:var(--glory-border)]/35 backdrop-blur-sm';

  const ctaLift =
    'transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5';

  return (
    <section
      className="relative border-t border-[color:var(--glory-border)] py-12 md:py-16 lg:py-20"
      aria-labelledby="featured-report-heading"
    >
      <div className="absolute inset-0 bg-[color:var(--glory-void)]" />
      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {readHref ? (
            <article className={cardShellPublished}>
              <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch md:gap-0">
                {/* Banner — full bleed left; height capped for polish */}
                <div className="relative isolate min-h-0 w-full shrink-0 overflow-hidden bg-[color:var(--glory-navy-deep)]">
                  {bannerSrc ? (
                    <img
                      src={bannerSrc}
                      alt={report.title}
                      className="h-[280px] w-full object-cover object-center sm:h-[300px] md:h-[360px] md:max-h-[360px]"
                      loading="eager"
                      decoding="async"
                    />
                  ) : (
                    <div
                      className="flex h-[280px] w-full items-center justify-center sm:h-[300px] md:h-[360px]"
                      style={{
                        backgroundImage:
                          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.12), transparent 55%)',
                      }}
                    />
                  )}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--glory-void)]/65 via-[color:var(--glory-void)]/15 to-transparent"
                    aria-hidden
                  />
                </div>

                {/* Copy & actions */}
                <div className="flex min-h-0 min-w-0 flex-col justify-between border-t border-[color:var(--glory-border)] p-6 sm:p-8 md:border-l md:border-t-0 md:p-8 lg:p-10">
                  <div>
                    <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--glory-gold)] sm:text-xs">
                      Featured report
                    </p>

                    <h2
                      id="featured-report-heading"
                      className="mb-4 text-2xl font-bold leading-[1.15] tracking-tight text-[color:var(--glory-text)] sm:text-3xl"
                    >
                      {report.title}
                    </h2>

                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <Badge variant={report.type === 'quarterly' ? 'quarterly' : 'monthly'}>
                        {report.type === 'quarterly' ? 'Quarterly' : 'Monthly'}
                      </Badge>
                      <span className="text-sm font-semibold text-[color:var(--glory-gold)]">
                        {report.reporting_period}
                      </span>
                    </div>

                    <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[color:var(--glory-text-soft)] sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-[color:var(--glory-gold)] sm:h-4 sm:w-4" />
                        <time dateTime={report.publish_date}>
                          {formatPublishDateDisplay(report.publish_date)}
                        </time>
                      </div>
                      {!!report.read_time && (
                        <>
                          <span className="hidden text-[color:var(--glory-border-subtle)] sm:inline" aria-hidden>
                            ·
                          </span>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 shrink-0 opacity-80 sm:h-4 sm:w-4" />
                            <span>{report.read_time} min read</span>
                          </div>
                        </>
                      )}
                    </div>

                    <p className="max-w-xl text-sm font-light leading-relaxed text-[color:var(--glory-text-muted)] sm:text-base">
                      {report.executive_summary}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--glory-border)] pt-6 sm:flex-row sm:flex-wrap sm:items-center">
                    <a
                      href={readHref}
                      {...(readExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`${gloryClasses.primaryCta} w-full px-6 py-3.5 text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-base ${ctaLift} ${gloryFocusRing} justify-center`}
                    >
                      Read report
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                    </a>
                    {pdfHref ? (
                      <a
                        href={pdfHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${gloryClasses.secondaryCta} w-full px-6 py-3.5 text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-base ${ctaLift} ${gloryFocusRing} justify-center`}
                      >
                        <Download className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                        Download PDF
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <article className={`${cardShellPlaceholder} cursor-default`}>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-0">
                <div className="relative isolate min-h-0 w-full overflow-hidden bg-[color:var(--glory-navy-deep)]">
                  {bannerSrc ? (
                    <img
                      src={bannerSrc}
                      alt={report.title}
                      className="h-[280px] w-full object-cover object-center sm:h-[300px] md:h-[360px]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-[280px] w-full sm:h-[300px] md:h-[360px]" />
                  )}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--glory-void)]/65 via-transparent to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-col justify-between border-t border-[color:var(--glory-border)] p-6 sm:p-8 md:border-l md:border-t-0 md:p-8 lg:p-10">
                  <div>
                    <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--glory-text-soft)] sm:text-xs">
                      Featured report
                    </p>
                    <h2
                      id="featured-report-heading"
                      className="mb-4 text-2xl font-bold text-[color:var(--glory-text-soft)] sm:text-3xl"
                    >
                      {report.title}
                    </h2>
                    <p className="text-sm font-light text-[color:var(--glory-text-muted)]">
                      {report.executive_summary}
                    </p>
                  </div>
                  <p className="mt-8 border-t border-[color:var(--glory-border)] pt-6 text-sm font-semibold text-[color:var(--glory-text-soft)]">
                    Report link — coming soon
                  </p>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};
