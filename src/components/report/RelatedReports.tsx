import { ReportCard } from './ReportCard';
import type { Report } from '../../lib/supabase';

interface RelatedReportsProps {
  reports: Report[];
  title?: string;
}

export const RelatedReports: React.FC<RelatedReportsProps> = ({
  reports,
  title = 'Related Reports',
}) => {
  if (!reports || reports.length === 0) return null;

  return (
    <div className="border-t border-[color:var(--glory-border)] pt-16">
      <h2 className="mb-8 text-3xl font-bold text-[color:var(--glory-text)]">{title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};
