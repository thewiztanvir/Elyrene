'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, getProductImageUrl } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<any[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Mock search for now
  React.useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearching(true);
      // In a real app, call /api/search?q=${query}
      // Simulating network delay
      setTimeout(() => {
        setResults([
          { id: '1', name: 'The Midnight Silk', slug: 'the-midnight-silk', price: 45000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9gw3yqVdb4XXoQGaLq1rh20UFBYkbFTqI67OrKmu1WE9FM2dsBbsM1s1Et0Y3VrlLbwG6q-8gGnxBdg7AItcWoL9fMEgN8fSEFxVdhR0g4NMRU3ZhQMX9yLD8kx1pCniAbaSth8O7SQLbPlWF27lLp4hJiYSzEpao4A_2tQufP4c7UdMYTvnNDI5WVu19l1p6EEoREmRGfPkGA8b30ECaU-D0csfgqDE4Fc_1zzn44w9tabX6Ci3vMllvoOTkwQprXSpBH-Pvv_w' },
          { id: '2', name: 'Crimson Heirloom', slug: 'crimson-heirloom', price: 52000, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBICnHKYXKLwWleb_RwDdqJ09EHOGxtgKL6-EcAkGiIyZ22nwwiN5CJopi1zBeGQeJQEoRth-xNIUoNpT6ovfhoGVGSyZ36PjKZ-Sd7ALG1PCEogsIr_onuMA0j7fFkT_psuBxFZPWgQiYqeLSbjJ28gDmfWsuj8xiWVDiMTcPAXWXELW_WNUdD3ZAA-GvIYH1W-7crTZY4yWyeF29qi_u8zTbVoZZjzKirY4UZOuTpkvDiwRHvoIw2Roj6RT7E1eFNXs90SfIJy3M' },
        ]);
        setIsSearching(false);
      }, 500);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-ivory flex flex-col"
        >
          <div className="w-full max-w-4xl mx-auto px-6 py-12 flex-1 flex flex-col">
            <div className="flex justify-end mb-12">
              <button onClick={onClose} className="text-mink hover:text-noir transition-colors flex items-center gap-2 font-label-caps">
                CLOSE <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="relative mb-16">
              <input
                ref={inputRef}
                type="text"
                placeholder="WHAT ARE YOU LOOKING FOR?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-noir/20 focus:border-noir pb-4 text-2xl md:text-4xl font-headline-md italic text-noir placeholder:text-mink/40 outline-none transition-colors"
              />
              <button type="submit" className="absolute right-0 bottom-4 text-noir">
                <span className="material-symbols-outlined text-3xl">search</span>
              </button>
            </form>

            <div className="flex-1 overflow-y-auto pb-12">
              {isSearching ? (
                <div className="flex justify-center text-mink py-12">
                  <span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span>
                </div>
              ) : results.length > 0 ? (
                <div>
                  <h3 className="font-label-caps text-mink mb-6">SUGGESTIONS</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group"
                      >
                        <div className="aspect-[3/4] relative overflow-hidden bg-surface-container-low mb-4">
                          <Image
                            src={getProductImageUrl(product.image)}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                        <h4 className="font-body-md text-noir group-hover:text-gold transition-colors truncate">
                          {product.name}
                        </h4>
                        <p className="font-label-caps text-[10px] text-mink mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-12 text-center">
                    <button onClick={handleSubmit} className="link-luxury">
                      View all results for "{query}"
                    </button>
                  </div>
                </div>
              ) : query.trim().length >= 2 ? (
                <div className="text-center py-12 text-mink">
                  <p className="font-body-md text-lg">No results found for "{query}"</p>
                  <p className="font-label-caps mt-4">Try a different search term</p>
                </div>
              ) : (
                <div>
                  <h3 className="font-label-caps text-mink mb-6">TRENDING SEARCHES</h3>
                  <div className="flex flex-wrap gap-4">
                    {['Sarees', 'Bridal Collection', 'Gold Bangles', 'Noir Silk'].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setQuery(term);
                          inputRef.current?.focus();
                        }}
                        className="px-4 py-2 border border-mink/20 font-label-caps text-xs text-mink hover:text-noir hover:border-noir transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
