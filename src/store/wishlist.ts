'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface WishlistItem {
  id:        string
  productId: string
  name:      string
  image:     string
  price:     number
  slug:      string
  category?: string
}

interface WishlistState {
  items:       WishlistItem[]
  addItem:     (item: WishlistItem) => void
  removeItem:  (productId: string) => void
  toggleItem:  (item: WishlistItem) => void
  isWishlisted:(productId: string) => boolean
  clearAll:    () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          if (state.items.some((i) => i.productId === item.productId)) return state
          return { items: [...state.items, item] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }))
      },

      toggleItem: (item) => {
        const { isWishlisted, addItem, removeItem } = get()
        if (isWishlisted(item.productId)) {
          removeItem(item.productId)
        } else {
          addItem(item)
        }
      },

      isWishlisted: (productId) =>
        get().items.some((i) => i.productId === productId),

      clearAll: () => set({ items: [] }),
    }),
    {
      name: 'elyrene-wishlist',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
