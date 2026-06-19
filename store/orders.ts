import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type OrderItem = {
  _id: string
  title: string
  price: number
  image: string
  quantity: number
}

export type Order = {
  id: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: string
  address: string
}

type OrdersState = {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) => {
        const newOrder: Order = {
          ...order,
          id: `ORD-${Date.now()}`,
          date: new Date().toLocaleDateString('fa-IR'),
          status: 'pending',
        }
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }))
      },
    }),
    { name: 'orders-storage' },
  ),
)
