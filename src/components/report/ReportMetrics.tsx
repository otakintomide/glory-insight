import { TrendingUp, TrendingDown } from 'lucide-react';
import type { KeyMetric } from '../../lib/supabase';

interface ReportMetricsProps {
  metrics: KeyMetric[];
}

export const ReportMetrics: React.FC<ReportMetricsProps> = ({ metrics }) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="mb-6 text-3xl font-bold text-[color:var(--glory-text)]">Key Metrics</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="group relative rounded-xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] p-6 shadow-glory-panel backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--glory-border-strong)]"
          >
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[color:var(--glory-gold-glow-faint)] via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--glory-text-soft)]">
                  {metric.label}
                </h3>
                {metric.change && (
                  <span
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${
                      metric.trend === 'up'
                        ? 'border border-green-500/20 bg-green-500/10 text-green-400'
                        : metric.trend === 'down'
                          ? 'border border-red-500/20 bg-red-500/10 text-red-400'
                          : 'border border-[color:var(--glory-border)] bg-[color:var(--glory-panel-elevated)] text-[color:var(--glory-text-soft)]'
                    }`}
                  >
                    {metric.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                    {metric.trend === 'down' && <TrendingDown className="h-4 w-4" />}
                    {metric.change}
                  </span>
                )}
              </div>
              <div className="text-4xl font-bold text-[color:var(--glory-text)]">{metric.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
