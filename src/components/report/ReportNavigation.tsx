import { ArrowRight } from 'lucide-react';
import { Link } from '../../lib/router';
import { Badge } from '../Badge';
import type { Report } from '../../lib/supabase';

interface ReportNavigationProps {
  previousReport?: Report | null;
  nextReport?: Report | null;
}

export const ReportNavigation: React.FC<ReportNavigationProps> = ({
  previousReport,
  nextReport,
}) => {
  if (!previousReport && !nextReport) return null;

  const navCard =
    'relative h-full overflow-hidden rounded-xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] shadow-glory-panel backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--glory-border-strong)] hover:shadow-[var(--glory-shadow-panel-hover)]';

  return (
    <div className="mb-12 border-t border-[color:var(--glory-border)] pt-16">
      <h2 className="mb-8 text-3xl font-bold text-[color:var(--glory-text)]">Navigation</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {previousReport && (
          <Link to={`/report/${previousReport.slug}`} className="group block">
            <div className={navCard}>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color:var(--glory-gold-glow-faint)] via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative p-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[color:var(--glory-text-soft)]">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  PREVIOUS REPORT
                </div>
                <Badge variant={previousReport.type === 'quarterly' ? 'quarterly' : 'monthly'} className="mb-3">
                  {previousReport.type === 'quarterly' ? 'Quarterly' : 'Monthly'}
                </Badge>
                <h3 className="mb-2 line-clamp-2 text-xl font-bold text-[color:var(--glory-text)] transition-colors group-hover:text-[color:var(--glory-gold)]">
                  {previousReport.title}
                </h3>
                <p className="text-sm font-semibold text-[color:var(--glory-gold)]">
                  {previousReport.reporting_period}
                </p>
              </div>
            </div>
          </Link>
        )}

        {nextReport && (
          <Link to={`/report/${nextReport.slug}`} className="group block">
            <div className={navCard}>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color:var(--glory-gold-glow-faint)] via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative p-6">
                <div className="mb-3 flex items-center justify-end gap-2 text-sm font-semibold text-[color:var(--glory-text-soft)]">
                  NEXT REPORT
                  <ArrowRight className="h-4 w-4" />
                </div>
                <Badge variant={nextReport.type === 'quarterly' ? 'quarterly' : 'monthly'} className="mb-3">
                  {nextReport.type === 'quarterly' ? 'Quarterly' : 'Monthly'}
                </Badge>
                <h3 className="mb-2 line-clamp-2 text-xl font-bold text-[color:var(--glory-text)] transition-colors group-hover:text-[color:var(--glory-gold)]">
                  {nextReport.title}
                </h3>
                <p className="text-sm font-semibold text-[color:var(--glory-gold)]">
                  {nextReport.reporting_period}
                </p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
