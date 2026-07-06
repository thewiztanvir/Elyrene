'use client';

import * as React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-noir text-ivory pt-section-gap pb-12 border-t border-mink/10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-gutter mb-24">
        <div className="md:col-span-4">
          <h2 className="font-headline-md tracking-[0.4em] font-light mb-8">ELYRÈNE</h2>
          <p className="font-body-md text-mink max-w-xs mb-10 leading-relaxed">
            Redefining modern heirloom fashion through meticulous craftsmanship and quiet luxury.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-mink hover:text-gold transition-colors" aria-label="Facebook">
              <span className="material-symbols-outlined">facebook</span>
            </a>
            <a href="#" className="text-mink hover:text-gold transition-colors" aria-label="Instagram">
              <span className="material-symbols-outlined">camera</span>
            </a>
            <a href="#" className="text-mink hover:text-gold transition-colors" aria-label="Pinterest">
              <span className="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>

        <div className="md:col-span-2 md:col-start-6">
          <h4 className="font-label-caps text-mink tracking-widest mb-8">COLLECTIONS</h4>
          <ul className="space-y-4 font-body-md text-mink">
            <li><Link href="/shop/sarees" className="hover:text-gold transition-colors">Sarees</Link></li>
            <li><Link href="/shop/bangles" className="hover:text-gold transition-colors">Bangles</Link></li>
            <li><Link href="/shop/ornaments" className="hover:text-gold transition-colors">Ornaments</Link></li>
            <li><Link href="/shop/bridal" className="hover:text-gold transition-colors">Bridal Edit</Link></li>
            <li><Link href="/shop?newArrival=true" className="hover:text-gold transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-label-caps text-mink tracking-widest mb-8">MAISON</h4>
          <ul className="space-y-4 font-body-md text-mink">
            <li><Link href="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
            <li><Link href="/about#craftsmanship" className="hover:text-gold transition-colors">Craftsmanship</Link></li>
            <li><Link href="/about#sustainability" className="hover:text-gold transition-colors">Sustainability</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Atelier Services</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-label-caps text-mink tracking-widest mb-8">CONCIERGE</h4>
          <ul className="space-y-4 font-body-md text-mink">
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
            <li><Link href="/faq#shipping" className="hover:text-gold transition-colors">Shipping</Link></li>
            <li><Link href="/contact#appointments" className="hover:text-gold transition-colors">Appointments</Link></li>
            <li><Link href="/faq" className="hover:text-gold transition-colors">FAQs</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-24 max-w-2xl text-center">
        <h4 className="font-headline-lg italic mb-6">Join the Inner Circle</h4>
        <p className="font-body-md text-mink mb-12">Receive exclusive early access to private archives and invitations to our secret seasonal viewings.</p>
        <form className="flex flex-col sm:flex-row gap-4 border-b border-mink/50 pb-2 focus-within:border-gold transition-colors">
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            required
            className="flex-grow bg-transparent border-none focus:ring-0 px-0 py-4 font-body-md text-ivory placeholder:text-mink placeholder:font-label-caps placeholder:tracking-[0.1em]"
          />
          <button type="submit" className="font-button text-[10px] tracking-[0.3em] uppercase px-6 py-4 text-ivory hover:text-gold transition-colors">
            SUBSCRIBE
          </button>
        </form>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop border-t border-mink/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-label-caps text-[10px] text-mink tracking-widest">
          © {new Date().getFullYear()} ELYRÈNE HAUTE COUTURE. ALL RIGHTS RESERVED.
        </p>
        <div className="flex space-x-8">
          <Link href="/privacy" className="font-label-caps text-[10px] text-mink hover:text-gold tracking-widest">PRIVACY</Link>
          <Link href="/terms" className="font-label-caps text-[10px] text-mink hover:text-gold tracking-widest">TERMS</Link>
          <Link href="/accessibility" className="font-label-caps text-[10px] text-mink hover:text-gold tracking-widest">ACCESSIBILITY</Link>
        </div>
      </div>
    </footer>
  );
};
