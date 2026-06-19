import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FavoriteItem = {
  _id: string
  title: string
  category: string
  price: number
  image: string
  rating: number
}

type FavoritesState = {
  items: FavoriteItem[]
  toggleFavorite: (item: Omit<FavoriteItem, 'rating'> & { rating: number }) => void
  isFavorite: (id: string) => boolean
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleFavorite: (item) => {
        const exists = get().items.find((i) => i._id === item._id)
        if (exists) {
          set((state) => ({
            items: state.items.filter((i) => i._id !== item._id),
          }))
        } else {
          set((state) => ({
            items: [...state.items, item],
          }))
        }
      },

      isFavorite: (id) => get().items.some((i) => i._id === id),
    }),
    { name: 'favorites-storage' },
  ),
)
