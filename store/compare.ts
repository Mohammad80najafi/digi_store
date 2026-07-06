import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CompareItem = {
  _id: string
  title: string
  price: number
  image: string
  specs?: { label: string; value: string }[]
}

type CompareState = {
  items: CompareItem[]
  toggleCompare: (item: CompareItem) => void
  isCompared: (id: string) => boolean
  clearCompare: () => void
}

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleCompare: (item) => {
        const exists = get().items.find((i) => i._id === item._id)
        if (exists) {
          set((state) => ({
            items: state.items.filter((i) => i._id !== item._id),
          }))
        } else {
          if (get().items.length >= 4) return
          set((state) => ({ items: [...state.items, item] }))
        }
      },
      isCompared: (id) => get().items.some((i) => i._id === id),
      clearCompare: () => set({ items: [] }),
    }),
    { name: 'compare-storage' },
  ),
)
