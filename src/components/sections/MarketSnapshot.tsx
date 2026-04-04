import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, LineChart } from 'lucide-react';
import { LiveBadge } from '../LiveBadge';

const GCAT_TOKEN_ADDRESS = '0x47318Ce01d3c447acA06A7bbBd25a35Ad1184D96';
const GCAT_PAIR_ADDRESS = '0x591256b910Cb9E62988Ebc22a12e029ce32C5d52';
const DEXSCREENER_API = 'https://api.dexscreener.com/token-pairs/v1/bsc';

interface DexScreenerPair {
  pairAddress: string;
  priceUsd?: string;
  marketCap?: number;
  liquidity?: { usd?: number };
  volume?: { h24?: number };
  priceChange?: { h24?: number };
}

function formatPrice(priceUsd: string | undefined): string {
  if (!priceUsd) return '—';
  const num = parseFloat(priceUsd);
  if (num === 0 || isNaN(num)) return '—';
  if (num <= 0.000001) return `$${num.toExponential(2)}`;
  if (num < 0.01) return `$${num.toFixed(8)}`;
  if (num < 1) return `$${num.toFixed(6)}`;
  return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
}

function formatCompactUsd(value: number | undefined): string {
  if (value == null || isNaN(value)) return '—';
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

function formatPercent(value: number | undefined): string {
  if (value == null || isNaN(value)) return '—';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function metricValueClasses(trend: 'up' | 'down' | 'neutral'): string {
  const base =
    'relative text-sm font-semibold tabular-nums transition-colors duration-300 ease-out';
  if (trend === 'up') {
    return `${base} text-emerald-400/90 group-hover:text-emerald-300`;
  }
  if (trend === 'down') {
    return `${base} text-red-400/90 group-hover:text-red-300`;
  }
  return `${base} text-[color:var(--glory-text-muted)] group-hover:text-[color:var(--glory-text)]`;
}

/** Optional supporting context: live GCAT reference data, subordinate to reports. */
export const MarketSnapshot: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState<string>('—');
  const [metrics, setMetrics] = useState<
    Array<{ label: string; value: string; change: string; trend: 'up' | 'down' | 'neutral' }>
  >([
    { label: 'Price', value: '—', change: '—', trend: 'neutral' },
    { label: 'Market cap', value: '—', change: '—', trend: 'neutral' },
    { label: 'Liquidity', value: '—', change: '—', trend: 'neutral' },
    { label: 'Holders', value: '—', change: '—', trend: 'neutral' },
    { label: '24h volume', value: '—', change: '—', trend: 'neutral' },
    { label: '24h change', value: '—', change: '—', trend: 'neutral' },
  ]);

  const fetchHolders = async (): Promise<string> => {
    try {
      const res = await fetch('/api/holders');
      const data = await res.json();
      const total = data?.totalHolders;
      if (total != null && total !== '') {
        const num = typeof total === 'number' ? total : parseInt(String(total), 10);
        return isNaN(num) ? '—' : num.toLocaleString();
      }
    } catch {
      /* ignore */
    }
    return '—';
  };

  useEffect(() => {
    const fetchData = async () => {
      const [dexResult, holders] = await Promise.all([
        fetch(`${DEXSCREENER_API}/${GCAT_TOKEN_ADDRESS}`).then((r) => r.json()).catch(() => null),
        fetchHolders(),
      ]);
      setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

      const data: DexScreenerPair[] | null = Array.isArray(dexResult) ? dexResult : null;
      const pair =
        data?.find((p) => p.pairAddress?.toLowerCase() === GCAT_PAIR_ADDRESS.toLowerCase()) ?? data?.[0];

      if (!pair) {
        setMetrics((prev) =>
          prev.map((m) => (m.label === 'Holders' ? { ...m, value: holders } : m))
        );
        return;
      }

      const priceChange = pair.priceChange?.h24 ?? 0;
      const trend: 'up' | 'down' | 'neutral' =
        priceChange > 0 ? 'up' : priceChange < 0 ? 'down' : 'neutral';

      setMetrics([
        { label: 'Price', value: formatPrice(pair.priceUsd), change: '—', trend: 'neutral' },
        { label: 'Market cap', value: formatCompactUsd(pair.marketCap), change: '—', trend: 'neutral' },
        { label: 'Liquidity', value: formatCompactUsd(pair.liquidity?.usd), change: '—', trend: 'neutral' },
        { label: 'Holders', value: holders, change: '—', trend: 'neutral' },
        { label: '24h volume', value: formatCompactUsd(pair.volume?.h24), change: '—', trend: 'neutral' },
        { label: '24h change', value: formatPercent(priceChange), change: '—', trend },
      ]);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative border-t border-[color:var(--glory-border)] py-10 md:py-12"
      aria-labelledby="ecosystem-snapshot-heading"
    >
      <div className="absolute inset-0 bg-[color:var(--glory-void)]/80" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-1 flex items-center gap-2 text-[color:var(--glory-text-soft)]">
                <LineChart className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                <h3
                  id="ecosystem-snapshot-heading"
                  className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--glory-text-muted)]"
                >
                  Ecosystem reference
                </h3>
              </div>
              <p className="text-base font-medium text-[color:var(--glory-text)]">
                GCAT market snapshot
              </p>
              <p className="mt-1 text-sm font-light leading-relaxed text-[color:var(--glory-text-soft)]">
                Live figures for context alongside formal disclosures. Not a substitute for published Glory
                Insight reports.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 md:flex-col md:items-end">
              <LiveBadge />
              <p className="text-[0.65rem] font-medium uppercase tracking-wider text-[color:var(--glory-text-soft)]">
                Updated {lastUpdated}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 md:gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="group relative isolate cursor-default overflow-hidden rounded-[var(--glory-radius-card)] border border-[color:var(--glory-border-strong)] bg-[color:var(--glory-panel)] px-3 py-3 shadow-[0_10px_32px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)] ring-1 ring-[color:var(--glory-border)]/50 backdrop-blur-md transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-[color:rgba(201,162,39,0.42)] hover:bg-[color:var(--glory-panel-elevated)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.42),0_0_36px_rgba(15,22,41,0.5),0_0_32px_rgba(212,175,55,0.1),0_0_24px_rgba(59,130,246,0.06),inset_0_1px_0_rgba(255,255,255,0.07)]"
                aria-label={`${metric.label}: ${metric.value}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_-20%,rgba(212,175,55,0.09),transparent_55%)] opacity-70 transition-opacity duration-300 ease-out group-hover:opacity-100"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(30,58,138,0.12),transparent_62%)] opacity-50 transition-opacity duration-300 group-hover:opacity-80"
                  aria-hidden
                />
                <div className="relative">
                  <div className="mb-1.5 flex items-start justify-between gap-1">
                    <span className="text-[0.65rem] font-semibold uppercase leading-tight tracking-wide text-[color:var(--glory-text-soft)] transition-colors duration-300 group-hover:text-[color:var(--glory-text-muted)]">
                      {metric.label}
                    </span>
                    {metric.trend !== 'neutral' && (
                      <span
                        className={`shrink-0 transition-opacity duration-300 group-hover:opacity-100 ${
                          metric.trend === 'up' ? 'text-emerald-400/90' : 'text-red-400/90'
                        }`}
                      >
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3" aria-hidden />
                        ) : (
                          <TrendingDown className="h-3 w-3" aria-hidden />
                        )}
                      </span>
                    )}
                  </div>
                  <div className={metricValueClasses(metric.trend)}>{metric.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
