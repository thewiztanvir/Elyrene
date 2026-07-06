import React from 'react'

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
type BadgeVariant = 'gold' | 'success' | 'warning' | 'error' | 'muted'

export interface BadgeProps {
  variant?   : BadgeVariant
  children   : React.ReactNode
  className? : string
  /** Optional leading icon (material symbol name string) */
  icon?      : string
}

// ─────────────────────────────────────────────
//  Variant map
// ─────────────────────────────────────────────
const variantClass: Record<BadgeVariant, string> = {
  gold    : 'badge-gold',
  success : 'badge-success',
  warning : 'badge-warning',
  error   : 'badge-error',
  muted   : 'badge-muted',
}

// ─────────────────────────────────────────────
//  Badge component
// ─────────────────────────────────────────────
export default function Badge({
  variant   = 'muted',
  children,
  className = '',
  icon,
}: BadgeProps) {
  return (
    <span
      className={[variantClass[variant], className].filter(Boolean).join(' ')}
      role="status"
    >
      {icon && (
        <span
          className="material-symbols-outlined !text-[12px] leading-none"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}
