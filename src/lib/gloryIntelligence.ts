/**
 * Glory Intelligence – modular rule-based market analysis
 * Uses live data (price, volume, liquidity, holders) to classify status,
 * generate observations, and produce outlook. Designed for easy upgrades.
 */

export type MarketStatus =
  | 'Accumulation Phase'
  | 'Consolidation'
  | 'Momentum Build'
  | 'Risk Zone';

export interface MarketDataInput {
  price: number;
  volume: number;
  liquidity: number;
  holders: number;
  priceChange24h: number;
}

/** Thresholds – centralize for easy tuning */
const THRESHOLDS = {
  lowVolatility: 3,
  flatPrice: 1.5,
  volumeSpikeRatio: 0.15,
  priceIncrease: 2,
  riskZoneNegative: -10,
  riskZoneVolatility: 8,
  minLiquidity: 1000,
  minVolume: 100,
} as const;

function hasValidData(data: MarketDataInput): boolean {
  return (
    typeof data.price === 'number' &&
    !isNaN(data.price) &&
    data.price > 0 &&
    (typeof data.volume === 'number' && !isNaN(data.volume)) &&
    (typeof data.liquidity === 'number' && !isNaN(data.liquidity)) &&
    (typeof data.holders === 'number' && !isNaN(data.holders)) &&
    typeof data.priceChange24h === 'number' &&
    !isNaN(data.priceChange24h)
  );
}

/**
 * Classifies market status from live metrics.
 * Rules (modular – add/change as needed):
 * - Risk Zone: sharp decline or high volatility with negative bias
 * - Momentum Build: volume spike + price increase
 * - Consolidation: low volume + flat price
 * - Accumulation Phase: stable holders + low volatility (or default)
 */
export function classifyMarketStatus(data: MarketDataInput): MarketStatus {
  if (!hasValidData(data)) return 'Consolidation';

  const { volume, liquidity, priceChange24h } = data;
  const absChange = Math.abs(priceChange24h);
  const volumeToLiquidity =
    liquidity > THRESHOLDS.minLiquidity ? volume / liquidity : 0;

  if (priceChange24h <= THRESHOLDS.riskZoneNegative) return 'Risk Zone';
  if (
    priceChange24h < 0 &&
    absChange >= THRESHOLDS.riskZoneVolatility
  )
    return 'Risk Zone';

  if (
    priceChange24h >= THRESHOLDS.priceIncrease &&
    volumeToLiquidity >= THRESHOLDS.volumeSpikeRatio
  )
    return 'Momentum Build';

  if (
    absChange <= THRESHOLDS.flatPrice &&
    volume < THRESHOLDS.minVolume * 10
  )
    return 'Consolidation';

  if (
    absChange <= THRESHOLDS.lowVolatility &&
    data.holders >= 100
  )
    return 'Accumulation Phase';

  if (absChange <= THRESHOLDS.flatPrice) return 'Consolidation';

  return 'Accumulation Phase';
}

/**
 * Generates 3–4 bullet observations from holder trends, volume,
 * liquidity stability, and price movement.
 */
export function generateObservations(data: MarketDataInput): string[] {
  const observations: string[] = [];
  const { volume, liquidity, holders, priceChange24h } = data;
  const absChange = Math.abs(priceChange24h);
  const volumeToLiquidity =
    liquidity > THRESHOLDS.minLiquidity ? volume / liquidity : 0;

  if (holders >= 500) {
    observations.push(
      `Holder base remains stable at ${holders.toLocaleString()} addresses, indicating sustained distribution.`
    );
  } else if (holders >= 100) {
    observations.push(
      `Moderate holder count of ${holders.toLocaleString()} suggests ongoing token distribution.`
    );
  } else if (holders > 0) {
    observations.push(
      `Early-stage holder base of ${holders.toLocaleString()} addresses.`
    );
  }

  if (volume > 0) {
    if (volumeToLiquidity >= THRESHOLDS.volumeSpikeRatio) {
      observations.push(
        `24-hour volume elevated relative to liquidity, reflecting increased trading activity.`
      );
    } else if (volume < THRESHOLDS.minVolume) {
      observations.push(
        `Trading volume remains subdued, consistent with a quiet market phase.`
      );
    } else {
      observations.push(
        `Volume levels are within normal range for current liquidity conditions.`
      );
    }
  }

  if (liquidity >= THRESHOLDS.minLiquidity) {
    observations.push(
      `Liquidity pool depth provides adequate support for current market cap.`
    );
  }

  if (priceChange24h > THRESHOLDS.priceIncrease) {
    observations.push(
      `Price appreciation of ${priceChange24h.toFixed(2)}% over 24 hours indicates positive short-term momentum.`
    );
  } else if (priceChange24h < -THRESHOLDS.priceIncrease) {
    observations.push(
      `24-hour price decline of ${Math.abs(priceChange24h).toFixed(2)}% warrants monitoring for support levels.`
    );
  } else if (absChange <= THRESHOLDS.flatPrice) {
    observations.push(
      `Price action remains range-bound with minimal 24-hour change.`
    );
  }

  if (observations.length === 0) {
    observations.push(
      'Insufficient data for detailed observations. Additional metrics may improve analysis.'
    );
  }
  return observations.slice(0, 4);
}

/**
 * Generates a short professional outlook based on the detected status.
 */
export function generateOutlook(
  status: MarketStatus,
  data: MarketDataInput
): string {
  const { priceChange24h } = data;

  switch (status) {
    case 'Accumulation Phase':
      return `Current conditions suggest a phase of steady accumulation. Price stability and a maintained holder base support a constructive medium-term view, pending confirmation of volume expansion.`;
    case 'Consolidation':
      return `The market is consolidating with low volatility and subdued volume. A breakout in either direction would require a catalyst such as increased trading activity or material news flow.`;
    case 'Momentum Build':
      return `Volume and price momentum are aligned positively. The near-term bias is constructive, though sustainability depends on continued participation and liquidity support.`;
    case 'Risk Zone':
      return `Elevated downside volatility warrants caution. A stabilization in price action and volume would be needed before a more favorable assessment can be established.`;
    default:
      return `Market conditions are mixed. Further data is needed to form a clear near-term outlook.`;
  }
}

export interface GloryIntelligenceResult {
  status: MarketStatus;
  observations: string[];
  outlook: string;
}

/**
 * Main entry: compute full intelligence from raw market data.
 */
export function computeGloryIntelligence(data: MarketDataInput): GloryIntelligenceResult {
  const status = classifyMarketStatus(data);
  const observations = generateObservations(data);
  const outlook = generateOutlook(status, data);
  return { status, observations, outlook };
}
