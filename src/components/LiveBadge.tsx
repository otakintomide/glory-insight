/**
 * Live indicator — subdued for dark premium UI; distinct from primary gold CTAs.
 */
export const LiveBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-400/90 backdrop-blur-sm">
    <span
      className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/90 animate-live-pulse"
      aria-hidden
    />
    Live
  </span>
);
