import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost' | 'ivory' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  fullWidth?: boolean;
}

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  gold: 'btn-gold',
  ghost: 'btn-ghost',
  ivory: 'btn-ivory',
  danger: 'bg-error text-white font-button px-8 py-4 hover:bg-error/90 transition-all uppercase',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: '', // default from btn-* classes
  lg: 'px-10 py-5 text-base',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      icon,
      iconPosition = 'left',
      href,
      fullWidth,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && 'w-full',
      loading && 'opacity-70 cursor-not-allowed',
      className
    );

    const innerContent = (
      <>
        {loading ? (
          <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
        ) : (
          icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={baseClasses}>
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={baseClasses}
        {...props}
      >
        {innerContent}
      </button>
    );
  }
);

Button.displayName = 'Button';
