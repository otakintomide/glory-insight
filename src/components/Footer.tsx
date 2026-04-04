import { FileText, Twitter, Send } from 'lucide-react';
import { Link } from '../lib/router';
import { gloryClasses } from '../theme/gloryTheme';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[color:var(--glory-border)] bg-[color:var(--glory-cosmos)]/95 py-10 backdrop-blur-md md:py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:mb-10 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="group mb-4 flex items-center gap-3 sm:mb-5">
              <div className="rounded-lg border border-[color:var(--glory-border-strong)] bg-gradient-to-br from-[color:var(--glory-gold)] to-[color:var(--glory-gold-deep)] p-2 shadow-glory-gold transition-all group-hover:brightness-110">
                <FileText className="h-5 w-5 text-[color:var(--glory-void)] sm:h-6 sm:w-6" />
              </div>
              <div>
                <div className="text-lg font-bold text-[color:var(--glory-text)] sm:text-xl">Glory Insight</div>
                <div className="text-[0.7rem] font-medium text-[color:var(--glory-text-soft)] sm:text-xs">
                  Official reporting · Glory Universe
                </div>
              </div>
            </Link>
            <p className="max-w-sm text-sm font-light leading-relaxed text-[color:var(--glory-text-muted)] sm:text-base">
              Formal disclosures and strategic reports for the Glory Universe ecosystem.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[color:var(--glory-text-soft)] sm:mb-4 sm:text-sm">
              Navigate
            </h3>
            <ul className="space-y-2.5 text-sm sm:space-y-3 sm:text-base">
              <li>
                <a href="#reports" className={gloryClasses.navLink}>
                  Reports archive
                </a>
              </li>
              <li>
                <a href="#why-insight" className={gloryClasses.navLink}>
                  Why Glory Insight
                </a>
              </li>
              <li>
                <a
                  href="https://glorycatcoin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={gloryClasses.navLink}
                >
                  Glory Cat (GCAT)
                </a>
              </li>
              <li>
                <a
                  href="https://TheGloryUniverse.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={gloryClasses.navLink}
                >
                  Glory Universe
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[color:var(--glory-text-soft)] sm:mb-4 sm:text-sm">
              Community
            </h3>
            <div className="flex gap-2">
              <a
                href="https://twitter.com/gloryuniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] p-2.5 text-[color:var(--glory-text-soft)] transition-all hover:border-[color:var(--glory-gold-muted)] hover:text-[color:var(--glory-gold)]"
                aria-label="X (Twitter)"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://t.me/gloryuniverse"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] p-2.5 text-[color:var(--glory-text-soft)] transition-all hover:border-[color:var(--glory-gold-muted)] hover:text-[color:var(--glory-gold)]"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[color:var(--glory-border)] pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs font-light text-[color:var(--glory-text-soft)] sm:flex-row sm:text-left sm:text-sm">
            <p>© {new Date().getFullYear()} Glory Universe. All rights reserved.</p>
            <p>Glory Insight is part of the Glory Universe reporting layer.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
