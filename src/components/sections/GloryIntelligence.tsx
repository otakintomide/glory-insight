import { useState, useEffect } from 'react';
import {
  computeGloryIntelligence,
  type GloryIntelligenceResult,
} from '../../lib/gloryIntelligence';
import { LiveBadge } from '../LiveBadge';

const GCAT_TOKEN_ADDRESS = '0x47318Ce01d3c447acA06A7bbBd25a35Ad1184D96';
const GCAT_PAIR_ADDRESS = '0x591256b910Cb9E62988Ebc22a12e029ce32C5d52';
const DEXSCREENER_API = 'https://api.dexscreener.com/token-pairs/v1/bsc';

interface DexScreenerPair {
  pairAddress: string;
  priceUsd?: string;
  liquidity?: { usd?: number };
  volume?: { h24?: number };
  priceChange?: { h24?: number };
}

export const GloryIntelligence: React.FC = () => {
  const [result, setResult] = useState<GloryIntelligenceResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dexResult, holdersRes] = await Promise.all([
          fetch(`${DEXSCREENER_API}/${GCAT_TOKEN_ADDRESS}`)
            .then((r) => r.json())
            .catch(() => null),
          fetch('/api/holders').then((r) => r.json()).catch(() => ({ totalHolders: 0 })),
        ]);

        const data: DexScreenerPair[] | null = Array.isArray(dexResult)
          ? dexResult
          : null;
        const pair =
          data?.find(
            (p) =>
              p.pairAddress?.toLowerCase() === GCAT_PAIR_ADDRESS.toLowerCase()
          ) ?? data?.[0];

        const totalHolders =
          typeof holdersRes?.totalHolders === 'number'
            ? holdersRes.totalHolders
            : parseInt(String(holdersRes?.totalHolders ?? 0), 10) || 0;

        const price = pair?.priceUsd ? parseFloat(pair.priceUsd) : 0;
        const volume = pair?.volume?.h24 ?? 0;
        const liquidity = pair?.liquidity?.usd ?? 0;
        const priceChange24h = pair?.priceChange?.h24 ?? 0;

        const intelligence = computeGloryIntelligence({
          price,
          volume,
          liquidity,
          holders: totalHolders,
          priceChange24h,
        });
        setResult(intelligence);
      } catch {
        setResult({
          status: 'Consolidation',
          observations: [
            'Insufficient data to generate observations. Please check back after market data is available.',
          ],
          outlook:
            'Market conditions cannot be assessed at this time. Additional data is required.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="relative border-b border-[color:var(--glory-border)] py-16">
        <div className="absolute inset-0 bg-[color:var(--glory-navy)]/35" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-lg border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] p-8 shadow-glory-panel backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-bold text-[color:var(--glory-text)]">
                Glory Intelligence
              </h3>
              <p className="text-sm text-[color:var(--glory-text-soft)]">Loading analysis...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!result) return null;

  return (
    <section className="relative border-b border-[color:var(--glory-border)] py-16">
      <div className="absolute inset-0 bg-[color:var(--glory-navy)]/35" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-[color:var(--glory-text)]">
                  Glory Intelligence
                </h3>
                <LiveBadge />
              </div>
              <p className="text-sm font-light text-[color:var(--glory-text-soft)]">
                Rule-based market analysis derived from live metrics
              </p>
            </div>
          </div>

          <div className="relative rounded-lg border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] p-6 shadow-glory-panel backdrop-blur-sm transition-all duration-200 hover:border-[color:var(--glory-border-strong)] md:p-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--glory-text-soft)]">
                  Market Status
                </span>
                <p className="mt-2 text-lg font-bold text-[color:var(--glory-text-muted)]">
                  {result.status}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--glory-text-soft)]">
                  Key Observations
                </span>
                <ul className="mt-2 space-y-2">
                  {result.observations.map((obs, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm font-light text-[color:var(--glory-text-muted)]"
                    >
                      <span className="mt-0.5 text-[color:var(--glory-gold)] opacity-80">•</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--glory-text-soft)]">
                  Outlook
                </span>
                <p className="mt-2 text-sm font-light leading-relaxed text-[color:var(--glory-text-muted)]">
                  {result.outlook}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
