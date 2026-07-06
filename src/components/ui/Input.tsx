import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'luxury' | 'box';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helper, icon, rightIcon, variant = 'luxury', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    
    return (
      <div className={cn('w-full flex flex-col', className)}>
        {label && (
          <label htmlFor={inputId} className="label-luxury">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-0 pl-3 flex items-center pointer-events-none text-mink">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              variant === 'luxury' ? 'input-luxury' : 'input-luxury-box',
              icon && variant === 'box' && 'pl-10',
              icon && variant === 'luxury' && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-error focus:border-error focus:ring-error',
              'w-full'
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-0 pr-3 flex items-center text-mink">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-error font-body-md">{error}</p>}
        {!error && helper && <p className="mt-1 text-xs text-mink font-body-md">{helper}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
