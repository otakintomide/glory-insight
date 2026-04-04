import { Eye, TrendingUp, MessageSquare, Award } from 'lucide-react';

export const WhyInsight: React.FC = () => {
  const benefits = [
    {
      icon: Eye,
      title: 'Transparency',
      description:
        'Structured disclosure on ecosystem activity, risk, and delivery — written for holders, partners, and the wider community.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description:
        'A dated sequence of briefs and strategic reports so progress, pivots, and milestones are documented in one place.',
    },
    {
      icon: MessageSquare,
      title: 'Strategic Communication',
      description:
        'Clear alignment between roadmap intent, operational reality, and what the ecosystem should expect next.',
    },
    {
      icon: Award,
      title: 'Credibility Over Time',
      description:
        'An auditable archive that demonstrates consistency, accountability, and long-horizon stewardship.',
    },
  ];

  return (
    <section id="why-insight" className="relative scroll-mt-24 border-t border-[color:var(--glory-border)] py-16 md:py-24">
      <div className="absolute inset-0 bg-[color:var(--glory-void)]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto w-full">
          <div className="mb-12 text-center md:mb-14">
            <h2 className="mb-4 text-3xl font-bold leading-tight text-[color:var(--glory-text)] md:text-4xl">
              Why Glory Insight Matters
            </h2>
            <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-[color:var(--glory-text-muted)] md:text-lg">
              The formal reporting layer for Glory Universe: independent of social channels, designed for serious
              reading and long-term reference.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="group relative overflow-hidden rounded-[var(--glory-radius-card)] border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] p-8 shadow-glory-panel backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--glory-border-strong)]"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[color:var(--glory-gold-glow-faint)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[color:var(--glory-border)] bg-[color:var(--glory-panel-elevated)]">
                      <Icon className="h-6 w-6 text-[color:var(--glory-gold)] opacity-90" />
                    </div>

                    <h3 className="mb-2 text-xl font-bold text-[color:var(--glory-text)]">{benefit.title}</h3>

                    <p className="text-sm font-light leading-relaxed text-[color:var(--glory-text-muted)] md:text-base">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
