import { FileText } from 'lucide-react';
import { Link } from '../lib/router';
import { gloryClasses } from '../theme/gloryTheme';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[color:var(--glory-border)] bg-[color:var(--glory-cosmos)]/88 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <div className="rounded-lg border border-[color:var(--glory-border-strong)] bg-gradient-to-br from-[color:var(--glory-gold)] to-[color:var(--glory-gold-deep)] p-2 shadow-glory-gold transition-all duration-200 group-hover:brightness-110">
              <FileText className="h-6 w-6 text-[color:var(--glory-void)]" />
            </div>
            <div>
              <div className="text-xl font-bold text-[color:var(--glory-text)]">Glory Insight</div>
              <div className="text-xs font-medium text-[color:var(--glory-text-soft)]">
                Official reporting hub · Glory Universe
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#reports" className={gloryClasses.navLink}>
              Reports
            </a>
            <a href="#why-insight" className={gloryClasses.navLink}>
              About
            </a>
            <a
              href="https://glorycatcoin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${gloryClasses.navLink} text-sm`}
            >
              GCAT
            </a>
            <a
              href="https://TheGloryUniverse.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-2.5 text-sm ${gloryClasses.primaryCta}`}
            >
              Glory Universe
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
