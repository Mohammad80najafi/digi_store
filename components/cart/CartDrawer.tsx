'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/store/cart'
import { cn } from '@/lib/cn'
import { toPersianPrice, toPersianNumber } from '@/lib/price'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-zinc-950"
            dir="rtl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  سبد خرید
                </h2>
                {totalItems() > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-2 text-xs font-bold text-white dark:bg-white dark:text-black">
                    {totalItems()}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800">
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  سبد خرید شما خالی است.
                </p>
                <button
                  onClick={closeCart}
                  className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  مشاهده محصولات
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item._id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-zinc-900"
                      >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-200 dark:bg-zinc-800">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">
                              {item.title}
                            </h3>
                            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                              {item.category}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-zinc-800"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-6 text-center text-sm font-semibold">
                                {toPersianNumber(item.quantity)}
                              </span>
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-zinc-800"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                              {toPersianPrice(item.price * item.quantity)} تومان
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 px-6 py-5 dark:border-gray-800">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      جمع کل
                    </span>
                    <span className="text-xl font-black text-gray-900 dark:text-white">
                      {toPersianPrice(totalPrice())} تومان
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full rounded-full bg-black py-3.5 text-center text-sm font-bold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    تکمیل خرید
                  </Link>
                  <button
                    onClick={clearCart}
                    className={cn(
                      'mt-3 w-full rounded-full border py-3 text-sm font-medium transition',
                      'border-gray-300 text-gray-600 hover:bg-gray-100',
                      'dark:border-gray-700 dark:text-gray-400 dark:hover:bg-zinc-900',
                    )}
                  >
                    خالی کردن سبد
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
