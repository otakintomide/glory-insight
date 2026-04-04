import { ReactNode } from 'react';
import { gloryClasses } from '../theme/gloryTheme';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--glory-radius-card)] border border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] p-8 shadow-glory-panel backdrop-blur-sm ${
        hover ? `${gloryClasses.panelHover}` : ''
      } ${className}`}
    >
      <div className={gloryClasses.innerGradient} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
