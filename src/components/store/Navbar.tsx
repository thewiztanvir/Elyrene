'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'

// ─── Category Data ────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    label: 'Sarees',
    href: '/collections/sarees',
    sub: [
      { label: 'Silk Sarees',        href: '/collections/sarees/silk'        },
      { label: 'Cotton Sarees',      href: '/collections/sarees/cotton'      },
      { label: 'Designer Sarees',    href: '/collections/sarees/designer'    },
      { label: 'Bridal Sarees',      href: '/collections/sarees/bridal'      },
      { label: 'Printed Sarees',     href: '/collections/sarees/printed'     },
      { label: 'Embroidered Sarees', href: '/collections/sarees/embroidered' },
    ],
  },
  {
    label: 'Bangles',
    href: '/collections/bangles',
    sub: [
      { label: 'Gold Bangles',      href: '/collections/bangles/gold'      },
      { label: 'Silver Bangles',    href: '/collections/bangles/silver'    },
      { label: 'Glass Bangles',     href: '/collections/bangles/glass'     },
      { label: 'Bridal Set',        href: '/collections/bangles/bridal'    },
      { label: 'Kada',              href: '/collections/bangles/kada'      },
    ],
  },
  {
    label: 'Ornaments',
    href: '/collections/ornaments',
    sub: [
      { label: 'Necklaces',    href: '/collections/ornaments/necklaces'    },
      { label: 'Earrings',     href: '/collections/ornaments/earrings'     },
      { label: 'Maang Tikka',  href: '/collections/ornaments/maang-tikka'  },
      { label: 'Rings',        href: '/collections/ornaments/rings'        },
      { label: 'Anklets',      href: '/collections/ornaments/anklets'      },
      { label: 'Nose Pins',    href: '/collections/ornaments/nose-pins'    },
    ],
  },
  {
    label: 'Ethnic Wear',
    href: '/collections/ethnic-wear',
    sub: [
      { label: 'Lehenga Choli',   href: '/collections/ethnic-wear/lehenga'   },
      { label: 'Anarkali Suits',  href: '/collections/ethnic-wear/anarkali'  },
      { label: 'Palazzo Sets',    href: '/collections/ethnic-wear/palazzo'   },
      { label: 'Kurta Sets',      href: '/collections/ethnic-wear/kurta'     },
      { label: 'Dupattas',        href: '/collections/ethnic-wear/dupattas'  },
    ],
  },
]

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavbarProps {
  onSearchOpen: () => void
}

// ─── Dropdown Sub-menu ───────────────────────────────────────────────────────

function CategoryDropdown({
  items,
  visible,
}: {
  items: { label: string; href: string }[]
  visible: boolean
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
        >
          <div className="bg-ivory border border-mink/10 shadow-xl min-w-[200px] py-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-6 py-2.5 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir hover:bg-surface-container-low transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── User Dropdown ────────────────────────────────────────────────────────────

function UserDropdown({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    onClose()
    await signOut({ callbackUrl: '/' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full right-0 pt-4 z-50"
        >
          <div className="bg-ivory border border-mink/10 shadow-xl min-w-[200px] py-3">
            {session ? (
              <>
                <div className="px-6 py-3 border-b border-mink/10 mb-1">
                  <p className="font-label-caps text-[10px] tracking-widest text-mink truncate">
                    {session.user?.name ?? session.user?.email}
                  </p>
                </div>
                <Link
                  href="/account/profile"
                  onClick={onClose}
                  className="flex items-center gap-3 px-6 py-2.5 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir hover:bg-surface-container-low transition-colors duration-200"
                >
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  Profile
                </Link>
                <Link
                  href="/account/orders"
                  onClick={onClose}
                  className="flex items-center gap-3 px-6 py-2.5 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir hover:bg-surface-container-low transition-colors duration-200"
                >
                  <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                  My Orders
                </Link>
                <Link
                  href="/account/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-3 px-6 py-2.5 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir hover:bg-surface-container-low transition-colors duration-200"
                >
                  <span className="material-symbols-outlined text-[16px]">favorite</span>
                  Wishlist
                </Link>
                <div className="border-t border-mink/10 mt-1 pt-1">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full px-6 py-2.5 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir hover:bg-surface-container-low transition-colors duration-200 text-left"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={onClose}
                  className="flex items-center gap-3 px-6 py-2.5 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir hover:bg-surface-container-low transition-colors duration-200"
                >
                  <span className="material-symbols-outlined text-[16px]">login</span>
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={onClose}
                  className="flex items-center gap-3 px-6 py-2.5 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir hover:bg-surface-container-low transition-colors duration-200"
                >
                  <span className="material-symbols-outlined text-[16px]">person_add</span>
                  Create Account
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({
  isOpen,
  onClose,
  onSearchOpen,
}: {
  isOpen: boolean
  onClose: () => void
  onSearchOpen: () => void
}) {
  const { data: session } = useSession()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const handleSearchOpen = () => {
    onClose()
    onSearchOpen()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-noir/50 z-40 lg:hidden"
            style={{ backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />
          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 h-full bg-ivory z-50 flex flex-col shadow-2xl lg:hidden"
            style={{ width: 'min(340px, 100vw)' }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-mink/10">
              <Link
                href="/"
                onClick={onClose}
                className="font-headline-md tracking-[0.25em] text-noir text-xl"
              >
                ELYRÈNE
              </Link>
              <button
                onClick={onClose}
                className="p-1.5 text-mink hover:text-noir transition-colors"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-4 border-b border-mink/10">
              <button
                onClick={handleSearchOpen}
                className="flex items-center gap-3 w-full font-label-caps text-[11px] tracking-widest text-mink hover:text-noir transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                Search
              </button>
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <div key={cat.href} className="border-b border-mink/10 last:border-b-0">
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === cat.label ? null : cat.label,
                      )
                    }
                    className="flex items-center justify-between w-full px-6 py-4 font-label-caps text-[12px] tracking-widest text-noir hover:text-gold transition-colors text-left"
                  >
                    {cat.label}
                    <span
                      className={`material-symbols-outlined text-[18px] text-mink transition-transform duration-300 ${
                        expandedCategory === cat.label ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  <AnimatePresence>
                    {expandedCategory === cat.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden bg-surface-container-low"
                      >
                        <div className="px-8 py-2">
                          <Link
                            href={cat.href}
                            onClick={onClose}
                            className="block py-2.5 font-label-caps text-[10px] tracking-widest text-gold hover:text-noir transition-colors"
                          >
                            View All {cat.label}
                          </Link>
                          {cat.sub.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onClose}
                              className="block py-2.5 font-label-caps text-[10px] tracking-widest text-mink hover:text-noir transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Extra links */}
              <div className="px-6 py-4 border-t border-mink/10 mt-2 space-y-3">
                <Link
                  href="/collections/new-arrivals"
                  onClick={onClose}
                  className="block font-label-caps text-[11px] tracking-widest text-gold hover:text-noir transition-colors py-1"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/collections/bridal-edit"
                  onClick={onClose}
                  className="block font-label-caps text-[11px] tracking-widest text-mink hover:text-noir transition-colors py-1"
                >
                  Bridal Edit
                </Link>
              </div>
            </div>

            {/* Footer links */}
            <div className="border-t border-mink/10 px-6 py-5 space-y-3">
              {session ? (
                <>
                  <Link
                    href="/account/profile"
                    onClick={onClose}
                    className="flex items-center gap-3 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    My Account
                  </Link>
                  <Link
                    href="/account/orders"
                    onClick={onClose}
                    className="flex items-center gap-3 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    My Orders
                  </Link>
                  <button
                    onClick={async () => {
                      onClose()
                      await signOut({ callbackUrl: '/' })
                    }}
                    className="flex items-center gap-3 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={onClose}
                    className="flex items-center gap-3 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">login</span>
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={onClose}
                    className="flex items-center gap-3 font-label-caps text-[11px] tracking-widest text-mink hover:text-noir transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [scrolled, setScrolled]           = useState(false)
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [hoveredCat, setHoveredCat]       = useState<string | null>(null)
  const [userDropOpen, setUserDropOpen]   = useState(false)
  const userDropRef                        = useRef<HTMLDivElement>(null)
  const hoverTimerRef                      = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cartCount     = useCartStore((s) => s.getItemCount())
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const openCart      = useCartStore((s) => s.openCart)

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userDropRef.current && !userDropRef.current.contains(e.target as Node)) {
        setUserDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleCatEnter = useCallback((label: string) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    setHoveredCat(label)
  }, [])

  const handleCatLeave = useCallback(() => {
    hoverTimerRef.current = setTimeout(() => setHoveredCat(null), 150)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-shadow duration-400 ${
          scrolled
            ? 'shadow-[0_4px_32px_rgba(14,14,14,0.08)]'
            : ''
        }`}
        style={{
          background: 'rgba(249,249,249,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(140,123,107,0.10)',
        }}
      >
        <nav className="max-w-container-max mx-auto px-5 md:px-10 h-[80px] flex items-center justify-between gap-4">
          {/* ── Left: Hamburger (mobile) + Categories (desktop) ── */}
          <div className="flex items-center gap-1">
            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-noir hover:text-gold transition-colors"
              aria-label="Open navigation menu"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>

            {/* Category links (desktop only) */}
            <ul className="hidden lg:flex items-center gap-1">
              {CATEGORIES.map((cat) => (
                <li
                  key={cat.href}
                  className="relative"
                  onMouseEnter={() => handleCatEnter(cat.label)}
                  onMouseLeave={handleCatLeave}
                >
                  <Link
                    href={cat.href}
                    className={`font-label-caps text-[11px] tracking-widest px-4 py-2.5 inline-block transition-colors duration-200 ${
                      hoveredCat === cat.label ? 'text-gold' : 'text-noir hover:text-gold'
                    }`}
                  >
                    {cat.label}
                  </Link>
                  <CategoryDropdown
                    items={cat.sub}
                    visible={hoveredCat === cat.label}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* ── Center: Logo ── */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-headline-md tracking-[0.3em] text-noir hover:text-gold transition-colors duration-300 whitespace-nowrap select-none"
            style={{ fontSize: '22px', lineHeight: 1 }}
          >
            ELYRÈNE
          </Link>

          {/* ── Right: Icons ── */}
          <div className="flex items-center gap-0.5 md:gap-1">
            {/* Search */}
            <button
              onClick={onSearchOpen}
              className="p-2.5 text-mink hover:text-noir transition-colors duration-200"
              aria-label="Open search"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="relative p-2.5 text-mink hover:text-noir transition-colors duration-200"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 bg-gold text-noir text-[9px] font-bold font-raleway flex items-center justify-center rounded-full px-0.5 leading-none">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2.5 text-mink hover:text-noir transition-colors duration-200"
              aria-label={`Shopping bag (${cartCount} items)`}
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 bg-noir text-ivory text-[9px] font-bold font-raleway flex items-center justify-center rounded-full px-0.5 leading-none">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative" ref={userDropRef}>
              <button
                onClick={() => setUserDropOpen((prev) => !prev)}
                className="p-2.5 text-mink hover:text-noir transition-colors duration-200"
                aria-label="Account"
                aria-expanded={userDropOpen}
              >
                <span className="material-symbols-outlined text-[20px]">person</span>
              </button>
              <UserDropdown
                visible={userDropOpen}
                onClose={() => setUserDropOpen(false)}
              />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSearchOpen={onSearchOpen}
      />
    </>
  )
}
