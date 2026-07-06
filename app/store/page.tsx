'use client'

import Navbar from '@/components/navbar/Navbar'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCart } from '@/store/cart'
import { toPersianPrice, toPersianNumber } from '@/lib/price'

type Product = {
  _id: string
  title: string
  category: string
  price: number
  rating: number
  image: string
}

export default function StorePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [visibleCount, setVisibleCount] = useState(8)
  const [selectedCategory, setSelectedCategory] = useState('همه')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const loaderRef = useRef(null)

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setAllProducts)
      .catch(console.error)
  }, [])

  const repeatedProducts = useMemo(() => {
    return Array.from({ length: 8 }).flatMap((_, index) =>
      allProducts.map((product) => ({
        ...product,
        _id: `${product._id}-${index}`,
      })),
    )
  }, [allProducts])

  const categories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category).filter(Boolean))
    return ['همه', ...Array.from(cats)]
  }, [allProducts])

  const highestPrice = useMemo(() => {
    if (allProducts.length === 0) return 100000
    return Math.max(...allProducts.map((p) => p.price || 0))
  }, [allProducts])

  const effectiveMax = maxPrice ?? highestPrice

  const filteredProducts = useMemo(() => {
    return repeatedProducts.filter((product) => {
      const matchCategory =
        selectedCategory === 'همه' || product.category === selectedCategory
      const matchPrice = product.price <= effectiveMax
      return matchCategory && matchPrice
    })
  }, [repeatedProducts, selectedCategory, effectiveMax])

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  useEffect(() => {
    const currentLoader = loaderRef.current
    if (!currentLoader) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 8)
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(currentLoader)
    return () => observer.disconnect()
  }, [filteredProducts.length])

  return (
    <>
      <div className="fixed top-4 right-0 left-0 z-50 px-4">
        <Navbar />
      </div>

      <main
        dir="rtl"
        className="min-h-screen bg-gray-50 px-4 pt-28 pb-10 text-gray-900 sm:px-6 lg:px-8 dark:bg-black dark:text-white"
      >
        {/* Mobile filter toggle */}
        <div className="mb-4 lg:hidden">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium transition hover:bg-gray-50 dark:border-gray-800 dark:bg-zinc-950 dark:hover:bg-gray-900"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            فیلترها
          </button>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <aside
            className={`order-1 ${filterOpen ? 'block' : 'hidden'} lg:block`}
          >
            <div className="sticky top-40 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-zinc-950">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold">فیلترها</h2>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="rounded-full p-1 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-800"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    دسته‌بندی
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category)
                          setVisibleCount(8)
                          if (window.innerWidth < 1024) setFilterOpen(false)
                        }}
                        className={`w-full rounded-2xl px-4 py-2 text-right text-sm transition ${
                          selectedCategory === category
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-black dark:text-gray-300 dark:hover:bg-gray-900'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      حداکثر قیمت
                    </h3>
                    <span className="text-sm font-semibold">
                      {toPersianNumber(effectiveMax)} تومان
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={highestPrice}
                    step={500000}
                    value={effectiveMax}
                    onChange={(e) => {
                      setMaxPrice(Number(e.target.value))
                      setVisibleCount(8)
                    }}
                    className="w-full cursor-pointer accent-black dark:accent-white"
                  />
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('همه')
                    setMaxPrice(null)
                    setVisibleCount(8)
                    if (window.innerWidth < 1024) setFilterOpen(false)
                  }}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
                >
                  حذف فیلترها
                </button>
              </div>
            </div>
          </aside>

          <section className="order-2">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                محصولات فروشگاه
              </h1>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                جدیدترین محصولات فروشگاه را مشاهده کنید.
              </p>
            </div>

            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-zinc-950">
                <p className="text-gray-500 dark:text-gray-400">
                  محصولی پیدا نشد.
                </p>
              </div>
            )}

            {visibleCount < filteredProducts.length && (
              <div
                ref={loaderRef}
                className="mt-10 flex justify-center py-6 text-sm text-gray-500 dark:text-gray-400"
              >
                در حال بارگذاری محصولات بیشتر...
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  )
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem)
  return (
    <a
      href={`/store/${product._id.replace(/-\d+$/, '')}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-2 text-right shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl sm:p-4 dark:border-gray-800 dark:bg-zinc-950"
    >
      <div className="overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
        <img
          src={product.image}
          alt={product.title}
          className="h-36 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64 sm:rounded-2xl"
        />
      </div>
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600 sm:px-3 sm:py-1 sm:text-xs dark:bg-black dark:text-gray-300">
            {product.category}
          </span>
          <span className="text-[10px] text-gray-500 sm:text-sm dark:text-gray-400">
            ⭐ {toPersianNumber(product.rating)}
          </span>
        </div>
        <h3 className="line-clamp-1 text-sm font-semibold sm:text-lg">
          {product.title}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-1 sm:mt-4">
          <button
            onClick={(e) => {
              e.preventDefault()
              addItem({
                _id: product._id,
                title: product.title,
                category: product.category,
                price: product.price,
                image: product.image,
              })
            }}
            className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-800 sm:px-4 sm:py-2 sm:text-sm dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            افزودن
          </button>
          <p className="text-xs font-bold sm:text-xl">
            {toPersianPrice(product.price)} تومان
          </p>
        </div>
      </div>
    </a>
  )
}
