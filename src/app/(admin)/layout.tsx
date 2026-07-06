'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

const adminLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' },
  { label: 'Products', href: '/admin/products', icon: 'inventory_2' },
  { label: 'Orders', href: '/admin/orders', icon: 'shopping_cart' },
  { label: 'Customers', href: '/admin/customers', icon: 'group' },
  { label: 'Marketing', href: '/admin/marketing', icon: 'campaign' },
  { label: 'Settings', href: '/admin/settings', icon: 'settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="p-8 border-b border-mink/10 flex items-center justify-center">
          <Link href="/admin/dashboard" className="font-headline-md text-2xl tracking-[0.2em] text-noir">
            ELYRÈNE
          </Link>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-2">
          {adminLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn('admin-nav-item', isActive && 'active')}
              >
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-mink/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-surface-container-low border border-mink/20 flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-mink">person</span>
            </div>
            <div>
              <p className="font-label-caps text-xs text-noir">Admin User</p>
              <p className="font-body-md text-xs text-mink">admin@elyrene.com</p>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-2 text-mink hover:text-error transition-colors font-label-caps text-[11px] tracking-widest"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            SIGN OUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content w-full">
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
