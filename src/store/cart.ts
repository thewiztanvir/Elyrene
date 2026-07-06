'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id:        string
  productId: string
  variantId?: string
  name:      string
  image:     string
  price:     number
  quantity:  number
  variant?:  string // display label e.g. "Matte Silk"
  slug:      string
}

interface CartState {
  items:          CartItem[]
  isOpen:         boolean
  couponCode:     string | null
  couponDiscount: number

  // Actions
  addItem:         (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem:      (productId: string, variantId?: string) => void
  updateQty:       (productId: string, quantity: number, variantId?: string) => void
  clearCart:       () => void
  openCart:        () => void
  closeCart:       () => void
  toggleCart:      () => void
  applyCoupon:     (code: string, discount: number) => void
  removeCoupon:    () => void

  // Computed (as getters)
  getSubtotal:     () => number
  getTotal:        () => number
  getItemCount:    () => number
  getItemQuantity: (productId: string, variantId?: string) => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items:          [],
      isOpen:         false,
      couponCode:     null,
      couponDiscount: 0,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.variantId === item.variantId,
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
                  : i,
              ),
              isOpen: true,
            }
          }
          return {
            items: [...state.items, { ...item, quantity: item.quantity ?? 1 }],
            isOpen: true,
          }
        })
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId),
          ),
        }))
      },

      updateQty: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity }
              : i,
          ),
        }))
      },

      clearCart: () => set({ items: [], couponCode: null, couponDiscount: 0 }),
      openCart:  () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart:() => set((state) => ({ isOpen: !state.isOpen })),

      applyCoupon: (code, discount) =>
        set({ couponCode: code, couponDiscount: discount }),
      removeCoupon: () =>
        set({ couponCode: null, couponDiscount: 0 }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getTotal: () => {
        const subtotal = get().getSubtotal()
        return Math.max(0, subtotal - get().couponDiscount)
      },

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      getItemQuantity: (productId, variantId) => {
        const item = get().items.find(
          (i) => i.productId === productId && i.variantId === variantId,
        )
        return item?.quantity ?? 0
      },
    }),
    {
      name: 'elyrene-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
