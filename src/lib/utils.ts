import { clsx, type ClassValue } from 'clsx'

// Since clsx may not be installed, provide a simple implementation
function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]): string {
  const classes: string[] = []
  for (const input of inputs) {
    if (!input) continue
    if (typeof input === 'string') {
      classes.push(input)
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }
  return classes.join(' ')
}

export { cn }

// ─── Currency ────────────────────────────────────────────────
export function formatPrice(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPriceUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// ─── Date ────────────────────────────────────────────────────
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function timeAgo(date: Date | string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ]
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count > 0) return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`
  }
  return 'just now'
}

// ─── String ──────────────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + '…' : text
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function titleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => capitalize(word))
}

// ─── Order ───────────────────────────────────────────────────
export function generateOrderNumber(): string {
  const prefix = 'EL'
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `${prefix}-${date}-${random}`
}

// ─── Status ──────────────────────────────────────────────────
export function getOrderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING:          'Pending',
    CONFIRMED:        'Confirmed',
    PROCESSING:       'Processing',
    SHIPPED:          'Shipped',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED:        'Delivered',
    CANCELLED:        'Cancelled',
    REFUNDED:         'Refunded',
    RETURNED:         'Returned',
  }
  return labels[status] ?? status
}

export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING:          'badge-muted',
    CONFIRMED:        'badge-gold',
    PROCESSING:       'badge-gold',
    SHIPPED:          'badge-success',
    OUT_FOR_DELIVERY: 'badge-success',
    DELIVERED:        'badge-success',
    CANCELLED:        'badge-error',
    REFUNDED:         'badge-error',
    RETURNED:         'badge-warning',
  }
  return colors[status] ?? 'badge-muted'
}

export function getPaymentStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING:              'badge-muted',
    PAID:                 'badge-success',
    FAILED:               'badge-error',
    REFUNDED:             'badge-error',
    PARTIALLY_REFUNDED:   'badge-warning',
  }
  return colors[status] ?? 'badge-muted'
}

// ─── Validation helpers ───────────────────────────────────────
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^[+]?[\d\s\-()]{10,15}$/.test(phone)
}

// ─── Product helpers ─────────────────────────────────────────
export function getDiscountPercent(price: number, comparePrice: number): number {
  if (!comparePrice || comparePrice <= price) return 0
  return Math.round(((comparePrice - price) / comparePrice) * 100)
}

export function getAverageRating(reviews: { rating: number }[]): number {
  if (!reviews.length) return 0
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}

// ─── Image ───────────────────────────────────────────────────
export function getProductImageUrl(url: string): string {
  if (!url) return '/images/placeholder-product.jpg'
  if (url.startsWith('http')) return url
  return url
}

// ─── Misc ────────────────────────────────────────────────────
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
