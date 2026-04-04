/**
 * Glory Insight — design tokens & asset paths.
 * Visual source of truth: CSS variables in src/index.css (:root).
 */

export const gloryAssets = {
  /** Default hero/fallback visual; primary report art should come from `src/data/reports.ts` / featured cover. */
  heroBanner: '/images/glory-insight-hero.svg',
} as const;

/** Focus ring aligned with gold accent — use on all interactive controls. */
export const gloryFocusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--glory-gold)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--glory-void)]';

/** Reusable Tailwind class groups for consistent panels, sections, and chrome. */
export const gloryClasses = {
  sectionBackdrop:
    'relative overflow-hidden bg-[var(--glory-void)] before:pointer-events-none before:absolute before:inset-0 before:bg-[var(--glory-radial-section)]',
  panel:
    'relative rounded-xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] shadow-[var(--glory-shadow-panel)] backdrop-blur-sm transition-colors duration-200',
  panelHover:
    'hover:border-[color:var(--glory-border-strong)] hover:shadow-[var(--glory-shadow-panel-hover)]',
  innerGradient:
    'pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[color:var(--glory-gold-glow-faint)] via-transparent to-transparent opacity-70',
  heading: 'font-bold tracking-tight text-[color:var(--glory-text)]',
  bodyMuted: 'font-light text-[color:var(--glory-text-muted)]',
  bodySoft: 'text-[color:var(--glory-text-soft)]',
  navLink: `font-medium text-[color:var(--glory-text-muted)] transition-colors hover:text-[color:var(--glory-gold)] rounded-sm ${gloryFocusRing}`,
  navLinkActive: 'text-[color:var(--glory-gold)]',
  primaryCta: `inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--glory-gold)] to-[color:var(--glory-gold-deep)] font-bold text-[color:var(--glory-void)] shadow-[var(--glory-shadow-gold)] transition-all duration-300 hover:brightness-110 hover:shadow-[var(--glory-shadow-gold-lg)] active:brightness-95 ${gloryFocusRing}`,
  secondaryCta: `inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel-elevated)] font-bold text-[color:var(--glory-text)] transition-all duration-300 hover:border-[color:var(--glory-border-strong)] hover:bg-[color:var(--glory-panel)] active:scale-[0.99] ${gloryFocusRing}`,
  /** Archive / filter toggles (inactive). */
  filterPill: `rounded-xl border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] px-5 py-2.5 text-sm font-semibold text-[color:var(--glory-text-muted)] shadow-sm transition-all duration-200 hover:border-[color:var(--glory-border-strong)] hover:text-[color:var(--glory-text)] sm:px-6 sm:py-3 ${gloryFocusRing}`,
  filterPillActive: `rounded-xl bg-gradient-to-r from-[color:var(--glory-gold)] to-[color:var(--glory-gold-deep)] px-5 py-2.5 text-sm font-bold text-[color:var(--glory-void)] shadow-[var(--glory-shadow-gold)] transition-all duration-200 hover:brightness-110 sm:px-6 sm:py-3 ${gloryFocusRing}`,
} as const;
