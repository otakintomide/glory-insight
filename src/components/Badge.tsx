import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'monthly' | 'quarterly' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variantStyles = {
    monthly:
      'border-[color:var(--glory-border-strong)] bg-[color:var(--glory-gold-glow-faint)] text-[color:var(--glory-gold)]',
    quarterly:
      'border-[color:var(--glory-border-strong)] bg-[color:var(--glory-panel-elevated)] text-[color:var(--glory-text)] ring-1 ring-[color:var(--glory-gold-muted)]',
    default:
      'border-[color:var(--glory-border)] bg-[color:var(--glory-panel)] text-[color:var(--glory-text-muted)]',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
