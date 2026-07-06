'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { SearchOverlay } from './SearchOverlay';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const wishlistItemCount = useWishlistStore((s) => s.items.length);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'SAREES', href: '/shop/sarees' },
    { label: 'BANGLES', href: '/shop/bangles' },
    { label: 'ORNAMENTS', href: '/shop/ornaments' },
    { label: 'ETHNIC WEAR', href: '/shop/ethnic-wear' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-40 bg-ivory/80 backdrop-blur-md transition-all duration-500',
          isScrolled ? 'border-b border-mink/10 shadow-sm py-4' : 'border-b border-mink/10 py-6'
        )}
      >
        <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          {/* Left Navigation */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-label-caps text-label-caps text-mink hover:text-noir transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-noir"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/">
              <h1 className="font-headline-md text-2xl md:text-3xl tracking-[0.3em] font-light text-noir cursor-pointer whitespace-nowrap">
                ELYRÈNE
              </h1>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex space-x-4 md:space-x-6 items-center">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-noir hover:text-gold transition-colors"
              aria-label="Search"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-noir hover:text-gold transition-colors flex items-center"
                aria-label="Account"
              >
                <span className="material-symbols-outlined">person</span>
              </button>
              
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-48 bg-ivory border border-mink/20 shadow-xl py-2 flex flex-col z-50"
                  >
                    {session ? (
                      <>
                        <div className="px-4 py-3 border-b border-mink/10">
                          <p className="font-label-caps text-xs text-noir">{session.user.name || 'User'}</p>
                          <p className="font-body-md text-xs text-mink truncate">{session.user.email}</p>
                        </div>
                        {session.user.role === 'ADMIN' && (
                          <Link href="/admin/dashboard" className="px-4 py-2 text-sm font-body-md hover:bg-surface-container-low text-noir">
                            Admin Dashboard
                          </Link>
                        )}
                        <Link href="/account" className="px-4 py-2 text-sm font-body-md hover:bg-surface-container-low text-noir">
                          My Account
                        </Link>
                        <Link href="/account/orders" className="px-4 py-2 text-sm font-body-md hover:bg-surface-container-low text-noir">
                          Order History
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="px-4 py-2 text-sm font-body-md hover:bg-surface-container-low text-left text-error"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/login" className="px-4 py-2 text-sm font-body-md hover:bg-surface-container-low text-noir">
                          Sign In
                        </Link>
                        <Link href="/auth/signup" className="px-4 py-2 text-sm font-body-md hover:bg-surface-container-low text-noir">
                          Create Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/wishlist" className="text-noir hover:text-gold transition-colors relative hidden sm:block" aria-label="Wishlist">
              <span className="material-symbols-outlined">favorite</span>
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] bg-gold text-noir w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleCart}
              className="text-noir hover:text-gold transition-colors relative"
              aria-label="Cart"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] bg-gold text-noir w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="drawer-overlay"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="drawer-panel-left bg-ivory"
            >
              <div className="p-6 flex justify-between items-center border-b border-mink/10">
                <h2 className="font-headline-md text-xl tracking-[0.2em]">ELYRÈNE</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-noir">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="p-6 flex flex-col space-y-6 flex-1 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-label-caps text-lg tracking-widest text-noir hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-6 border-t border-mink/10" />
                <Link href="/wishlist" className="font-label-caps text-sm tracking-widest text-mink hover:text-noir transition-colors flex items-center justify-between">
                  WISHLIST
                  {wishlistItemCount > 0 && <span className="bg-gold text-noir px-2 py-0.5 rounded-full text-[10px]">{wishlistItemCount}</span>}
                </Link>
                {session ? (
                  <Link href="/account" className="font-label-caps text-sm tracking-widest text-mink hover:text-noir transition-colors">
                    MY ACCOUNT
                  </Link>
                ) : (
                  <Link href="/auth/login" className="font-label-caps text-sm tracking-widest text-mink hover:text-noir transition-colors">
                    SIGN IN
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
