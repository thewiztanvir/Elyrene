import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'success' | 'warning' | 'error' | 'muted';
}

const variantClasses = {
  gold: 'badge-gold',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  muted: 'badge-muted',
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'muted',
  children,
  ...props
}) => {
  return (
    <span
      className={cn('badge', variantClasses[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
