'use client'

import Footer from '@/components/footer/footer'
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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 8)
        }
      },
      { threshold: 1 },
    )
    if (currentLoader) observer.observe(currentLoader)
    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [])

  return (
    <>
      <div className="fixed top-4 right-0 left-0 z-50 px-4">
        <Navbar />
      </div>

      <main
        dir="rtl"
        className="min-h-screen bg-gray-50 px-4 pt-28 pb-10 text-gray-900 sm:px-6 lg:px-8 dark:bg-black dark:text-white"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="order-1">
            <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-zinc-950">
              <h2 className="mb-5 text-xl font-semibold">فیلترها</h2>
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
      className="group block rounded-3xl border border-gray-200 bg-white p-4 text-right shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-zinc-950"
    >
      <div className="overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-black dark:text-gray-300">
            {product.category}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ⭐ {toPersianNumber(product.rating)}
          </span>
        </div>
        <h3 className="line-clamp-1 text-lg font-semibold">{product.title}</h3>
        <div className="mt-4 flex items-center justify-between">
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
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            افزودن
          </button>
          <p className="text-xl font-bold">{toPersianPrice(product.price)} تومان</p>
        </div>
      </div>
    </a>
  )
}
