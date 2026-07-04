'use client'

import Link from 'next/link'
import { useFavorites } from '@/store/favorites'
import { useCart } from '@/store/cart'
import { toPersianPrice, toPersianNumber } from '@/lib/price'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function ProductCard({
  _id,
  image,
  category,
  title,
  description,
  price,
  rating,
}: {
  _id: string
  image: string
  category: string
  title: string
  description?: string
  price: number
  rating: number
}) {
  const toggleFavorite = useFavorites((s) => s.toggleFavorite)
  const isFav = useFavorites((s) => s.isFavorite(_id))
  const addItem = useCart((s) => s.addItem)

  return (
    <Link
      href={`/store/${_id}`}
      className="group block w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl sm:p-4 dark:border-gray-800 dark:bg-black"
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-100 sm:rounded-2xl dark:bg-gray-900">
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
        />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite({ _id, title, category, price, image, rating })
          }}
          className={cn(
            'absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition hover:scale-110 sm:top-3 sm:right-3 sm:h-10 sm:w-10',
            isFav
              ? 'bg-red-50 text-red-500 dark:bg-red-950'
              : 'bg-white text-gray-900 dark:bg-black dark:text-white',
          )}
        >
          <Heart className={cn('h-4 w-4 sm:h-5 sm:w-5', isFav && 'fill-current')} />
        </button>
      </div>

      <div className="mt-3 space-y-2 sm:mt-5 sm:space-y-3">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300 sm:px-3 sm:py-1 sm:text-xs">
            {category}
          </span>

          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
            ⭐ {toPersianNumber(rating)}
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold text-gray-950 dark:text-white sm:text-xl">
            {title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-600 dark:text-gray-400 sm:mt-2 sm:text-sm sm:leading-6">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 sm:text-xs">قیمت</p>
            <p className="text-lg font-bold text-gray-950 dark:text-white sm:text-2xl">
              {toPersianPrice(price)} تومان
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              addItem({ _id, title, category, price, image })
            }}
            className="cursor-pointer rounded-xl bg-black px-3 py-2 text-xs font-semibold text-white transition hover:bg-gray-800 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            خرید
          </button>
        </div>
      </div>
    </Link>
  )
}
