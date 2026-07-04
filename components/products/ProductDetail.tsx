'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Star,
  ShoppingCart,
  Heart,
  ChevronLeft,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useCart } from '@/store/cart'
import { useFavorites } from '@/store/favorites'
import { toPersianPrice, toPersianNumber } from '@/lib/price'

type Product = {
  _id: string
  title: string
  category: string
  price: number
  rating: number
  image: string
  description?: string
  specs?: { label: string; value: string }[]
  gallery?: string[]
}

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(
    product.gallery?.[0] ?? product.image,
  )
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const addItem = useCart((s) => s.addItem)
  const openCart = useCart((s) => s.openCart)
  const toggleFavorite = useFavorites((s) => s.toggleFavorite)
  const isFav = useFavorites((s) => s.isFavorite(product._id))

  useEffect(() => {
    fetch(`/api/products?category=${encodeURIComponent(product.category)}`)
      .then((res) => res.json())
      .then((products: Product[]) => {
        setRelatedProducts(products.filter((p) => p._id !== product._id))
      })
      .catch(console.error)
  }, [product.category, product._id])

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-50 pt-28 pb-16 dark:bg-black"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/"
            className="transition hover:text-gray-900 dark:hover:text-white"
          >
            خانه
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/store"
            className="transition hover:text-gray-900 dark:hover:text-white"
          >
            فروشگاه
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{product.title}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-zinc-950">
              <img
                src={selectedImage}
                alt={product.title}
                className="h-[340px] w-full object-cover sm:h-[420px] lg:h-[500px]"
              />
            </div>

            {product.gallery && product.gallery.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      'h-20 w-20 overflow-hidden rounded-xl border-2 transition-all duration-200 sm:h-24 sm:w-24',
                      selectedImage === img
                        ? 'border-gray-900 dark:border-white'
                        : 'border-gray-200 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500',
                    )}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-zinc-800 dark:text-gray-300">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">
                  {toPersianNumber(product.rating)}
                </span>
              </div>
            </div>

            <h1 className="text-2xl font-black text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
              {product.title}
            </h1>

            {product.description && (
              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
                {product.description}
              </p>
            )}

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-zinc-950">
              <p className="text-sm text-gray-500 dark:text-gray-400">قیمت</p>
              <p className="mt-1 text-3xl font-black text-gray-900 sm:text-4xl dark:text-white">
                {toPersianPrice(product.price)} تومان
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center justify-center overflow-hidden rounded-full border border-gray-300 dark:border-gray-700">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center text-lg font-bold transition hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  −
                </button>
                <span className="flex h-12 w-14 items-center justify-center text-lg font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-12 w-12 items-center justify-center text-lg font-bold transition hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  addItem(
                    {
                      _id: product._id,
                      title: product.title,
                      category: product.category,
                      price: product.price,
                      image: product.image,
                    },
                    quantity,
                  )
                  openCart()
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800 sm:text-base dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <ShoppingCart className="h-5 w-5" />
                افزودن به سبد خرید
              </button>

              <button
                onClick={() =>
                  toggleFavorite({
                    _id: product._id,
                    title: product.title,
                    category: product.category,
                    price: product.price,
                    image: product.image,
                    rating: product.rating,
                  })
                }
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-200',
                  isFav
                    ? 'border-red-300 bg-red-50 text-red-500 dark:border-red-800 dark:bg-red-950'
                    : 'border-gray-300 text-gray-500 hover:border-red-300 hover:text-red-500 dark:border-gray-700 dark:text-gray-400',
                )}
              >
                <Heart className={cn('h-5 w-5', isFav && 'fill-current')} />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, text: 'ارسال رایگان' },
                { icon: Shield, text: 'ضمانت اصالت' },
                { icon: RotateCcw, text: '۷ روز ضمانت بازگشت' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-center dark:border-gray-800 dark:bg-zinc-950"
                >
                  <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {product.specs && product.specs.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                  مشخصات محصول
                </h2>
                <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
                  {product.specs.map((spec, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-center justify-between px-5 py-3.5 text-sm',
                        index % 2 === 0
                          ? 'bg-gray-50 dark:bg-zinc-900'
                          : 'bg-white dark:bg-zinc-950',
                      )}
                    >
                      <span className="text-gray-500 dark:text-gray-400">
                        {spec.label}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                محصولات مرتبط
              </h2>
              <Link
                href="/store"
                className="flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                مشاهده همه
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item._id}
                  href={`/store/${item._id}`}
                  className="group overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-zinc-950"
                >
                  <div className="overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.category}
                    </span>
                    <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base font-bold text-gray-900 dark:text-white">
                      {toPersianPrice(item.price)} تومان
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
