'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { getProductImageUrl } from '@/lib/utils';

export const CartDrawer = () => {
  const { items, isOpen, closeCart, updateQty, removeItem, getSubtotal } = useCartStore();
  
  const subtotal = getSubtotal();
  const shippingThreshold = 10000;
  const shippingCost = subtotal > shippingThreshold || subtotal === 0 ? 0 : 500;
  const total = subtotal + shippingCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="drawer-overlay"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="drawer-panel-right bg-ivory"
          >
            <div className="p-6 flex justify-between items-center border-b border-mink/10">
              <h2 className="font-headline-md text-2xl">Your Bag <span className="text-mink text-lg">({items.reduce((s, i) => s + i.quantity, 0)})</span></h2>
              <button onClick={closeCart} className="text-mink hover:text-noir transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 text-mink">
                  <span className="material-symbols-outlined text-6xl opacity-20">shopping_bag</span>
                  <p className="font-body-md">Your shopping bag is empty.</p>
                  <Button variant="secondary" onClick={closeCart} href="/shop">
                    Discover Collections
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                      <div className="relative w-20 h-[106px] bg-surface-container-low flex-shrink-0">
                        <Image
                          src={getProductImageUrl(item.image)}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link href={`/product/${item.slug}`} onClick={closeCart} className="font-body-md text-noir hover:text-gold transition-colors">
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.productId, item.variantId)}
                              className="text-mink hover:text-error transition-colors"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </div>
                          {item.variant && (
                            <p className="font-label-caps text-[10px] text-mink mt-1">Variant: {item.variant}</p>
                          )}
                          <p className="font-body-md text-sm mt-1">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex items-center border border-mink/20 w-fit">
                          <button
                            onClick={() => updateQty(item.productId, item.quantity - 1, item.variantId)}
                            className="px-3 py-1 text-mink hover:text-noir transition-colors"
                          >
                            -
                          </button>
                          <span className="font-body-md text-sm px-2 min-w-[2ch] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.productId, item.quantity + 1, item.variantId)}
                            className="px-3 py-1 text-mink hover:text-noir transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-mink/10 bg-ivory">
                <div className="space-y-3 mb-6 font-body-md text-sm">
                  <div className="flex justify-between">
                    <span className="text-mink">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mink">Shipping</span>
                    <span>{shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}</span>
                  </div>
                  {shippingCost > 0 && (
                    <div className="w-full bg-surface-container-low h-1 mt-2">
                      <div 
                        className="bg-gold h-full" 
                        style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }} 
                      />
                      <p className="font-label-caps text-[9px] text-mink mt-2 text-center">
                        Add {formatPrice(shippingThreshold - subtotal)} for complimentary shipping
                      </p>
                    </div>
                  )}
                  <div className="flex justify-between pt-4 border-t border-mink/10 font-medium text-base">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <Button variant="primary" fullWidth href="/checkout" onClick={closeCart}>
                  Proceed to Checkout
                </Button>
                <div className="mt-4 text-center">
                  <button onClick={closeCart} className="link-luxury">
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
