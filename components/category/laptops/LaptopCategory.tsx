'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/products/ProductCard'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Product = {
  _id: string
  image: string
  category: string
  title: string
  description: string
  price: number
  rating: number
}

export default function LaptopsSlider() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error)
  }, [])

  if (products.length === 0) return null

  return (
    <section className="w-full bg-gray-50 py-6 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              محصولات
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">
              بروز ترین لپ تاپ ها
            </h2>
          </div>
          <Link
            href={'/store'}
            className="hidden rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:block dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
          >
            همه
          </Link>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={2}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 18 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="product-slider pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="cursor-pointer pb-2">
              <ProductCard
                _id={product._id}
                image={product.image}
                category={product.category}
                title={product.title}
                description={product.description}
                price={product.price}
                rating={product.rating}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
