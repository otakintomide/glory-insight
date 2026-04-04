import { useParams } from '../lib/router';
import { useReport, useReports } from '../hooks/useReports';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { Calendar, Download, ArrowRight, Share2, FileText, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { Link } from '../lib/router';
import { useState } from 'react';
import { ReportMetrics } from '../components/report/ReportMetrics';
import { TableOfContents } from '../components/report/TableOfContents';
import { ReportNavigation } from '../components/report/ReportNavigation';
import { RelatedReports } from '../components/report/RelatedReports';
import { gloryClasses } from '../theme/gloryTheme';
import { reportBannerSrc } from '../lib/reportBanner';
import { formatPublishDateDisplay } from '../lib/reportDate';
import { sortUiReportsForDisplay } from '../lib/reportSort';

export const ReportDetail: React.FC = () => {
  const { slug } = useParams();
  const { report, loading, error } = useReport(slug);
  const { reports } = useReports();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen glory-page-bg pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl space-y-6">
            <div className="h-96 animate-pulse rounded-2xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)]" />
            <div className="h-64 animate-pulse rounded-2xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen glory-page-bg pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl py-20 text-center">
            <FileText className="mx-auto mb-6 h-20 w-20 text-[color:var(--glory-text-soft)] opacity-50" />
            <h1 className="mb-4 text-4xl font-bold text-[color:var(--glory-text)] md:text-5xl">
              Report Not Found
            </h1>
            <p className="mx-auto mb-8 max-w-md text-lg text-[color:var(--glory-text-muted)]">
              The report you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/" className={`inline-flex items-center gap-2 px-8 py-3 ${gloryClasses.primaryCta}`}>
              <ArrowRight className="h-5 w-5 rotate-180" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedReports = sortUiReportsForDisplay(
    report.related_reports
      ? reports.filter((r) => report.related_reports?.includes(r.slug))
      : reports.filter((r) => r.id !== report.id && r.type === report.type).slice(0, 3)
  );

  const sortedReports = sortUiReportsForDisplay(reports);

  const currentIndex = sortedReports.findIndex((r) => r.id === report.id);
  const previousReport = currentIndex > 0 ? sortedReports[currentIndex - 1] : null;
  const nextReport = currentIndex < sortedReports.length - 1 ? sortedReports[currentIndex + 1] : null;

  const heroBannerSrc = reportBannerSrc(report);

  return (
    <div className="min-h-screen glory-page-bg">
      <div className="pb-24 pt-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10">
              <Link
                to="/"
                className={`inline-flex items-center gap-2 font-medium ${gloryClasses.navLink}`}
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to Reports
              </Link>
            </div>

            <div className="relative mb-12 overflow-hidden rounded-[var(--glory-radius-hero)] border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
              <div className={gloryClasses.innerGradient} />

              <div className="relative h-[400px] min-h-0 w-full md:h-[500px]">
                {heroBannerSrc ? (
                  <img
                    src={heroBannerSrc}
                    alt={report.title}
                    className="h-full w-full min-h-0 object-cover object-center"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[color:var(--glory-navy-deep)]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.12),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(5,8,16,0.5)_100%)]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--glory-void)] via-[color:var(--glory-void)]/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <Badge variant={report.type === 'quarterly' ? 'quarterly' : 'monthly'}>
                      {report.type === 'quarterly' ? 'Quarterly' : 'Monthly'} Report
                    </Badge>
                    <div className="flex items-center gap-2 rounded-full border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] px-4 py-2 text-sm font-medium text-[color:var(--glory-text-muted)] backdrop-blur-md">
                      <Calendar className="h-4 w-4 text-[color:var(--glory-gold)] opacity-80" />
                      <time dateTime={report.publish_date}>{formatPublishDateDisplay(report.publish_date)}</time>
                    </div>
                    {report.read_time && (
                      <div className="flex items-center gap-2 rounded-full border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] px-4 py-2 text-sm font-medium text-[color:var(--glory-text-muted)] backdrop-blur-md">
                        <Clock className="h-4 w-4 text-[color:var(--glory-gold)] opacity-80" />
                        {report.read_time} min read
                      </div>
                    )}
                  </div>

                  <h1 className="mb-4 text-4xl font-bold leading-tight text-[color:var(--glory-text)] md:text-6xl">
                    {report.title}
                  </h1>
                  <p className="mb-8 text-2xl font-bold text-[color:var(--glory-gold)] md:text-3xl">
                    {report.reporting_period}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {report.pdf_url ? (
                      <a
                        href={report.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-8 py-4 text-lg ${gloryClasses.primaryCta}`}
                      >
                        <Download className="h-5 w-5" />
                        Download PDF
                      </a>
                    ) : (
                      report.public_url && (
                        <a
                          href={report.public_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-8 py-4 text-lg ${gloryClasses.primaryCta}`}
                        >
                          <ExternalLink className="h-5 w-5" />
                          Public report link
                        </a>
                      )
                    )}
                    {report.pdf_url && report.public_url && (
                      <a
                        href={report.public_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-8 py-4 text-lg ${gloryClasses.secondaryCta}`}
                      >
                        <ExternalLink className="h-5 w-5" />
                        Public link
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className={`inline-flex items-center gap-2 px-8 py-4 text-lg ${gloryClasses.secondaryCta}`}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          Link Copied!
                        </>
                      ) : (
                        <>
                          <Share2 className="h-5 w-5" />
                          Share Report
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-4xl">
              <Card hover className="mb-16">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-[color:var(--glory-border)] bg-[color:var(--glory-gold-glow-faint)]">
                    <FileText className="h-7 w-7 text-[color:var(--glory-gold)]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-5 text-2xl font-bold text-[color:var(--glory-text)] md:text-3xl">
                      Executive Summary
                    </h2>
                    <p className="text-lg font-light leading-relaxed text-[color:var(--glory-text-muted)] md:text-xl">
                      {report.executive_summary}
                    </p>
                  </div>
                </div>
              </Card>

              <ReportMetrics metrics={report.key_metrics} />

              {report.content_sections && report.content_sections.length > 0 && (
                <>
                  <TableOfContents sections={report.content_sections} />

                  <div className="mb-20 space-y-8">
                    {report.content_sections.map((section, index) => (
                      <article key={section.id} id={`section-${section.id}`} className="scroll-mt-24">
                        <Card hover>
                          <div className="mb-8 flex items-start gap-5">
                            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-[color:var(--glory-border)] bg-[color:var(--glory-gold-glow-faint)] text-lg font-bold text-[color:var(--glory-gold)]">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <h2 className="pt-1 text-2xl font-bold leading-tight text-[color:var(--glory-text)] md:text-3xl">
                              {section.title}
                            </h2>
                          </div>
                          <div className="prose prose-invert max-w-none">
                            <div className="space-y-6 whitespace-pre-line text-base font-light leading-relaxed text-[color:var(--glory-text-muted)] md:text-lg">
                              {section.content}
                            </div>
                          </div>
                        </Card>
                      </article>
                    ))}
                  </div>
                </>
              )}

              <ReportNavigation previousReport={previousReport} nextReport={nextReport} />

              <RelatedReports reports={relatedReports} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
