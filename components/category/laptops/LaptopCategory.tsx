'use client'

import ProductCard from '@/components/products/ProductCard'

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const products = [
  {
    image: '/images/products/laptops/2.webp',
    category: 'Sneakers',
    title: 'Nike Air Max Pulse',
    description:
      'Comfortable everyday sneakers with a lightweight design and premium finish.',
    price: '$149.00',
    rating: '4.8',
  },
  {
    image: '/images/products/laptops/1.webp',
    category: 'Shoes',
    title: 'Adidas Runner Pro',
    description:
      'Soft and stylish running shoes made for daily comfort and performance.',
    price: '$129.00',
    rating: '4.7',
  },
  {
    image: '/images/products/laptops/3.webp',
    category: 'Fashion',
    title: 'Urban Street Shoes',
    description:
      'Modern streetwear shoes with a clean shape and premium materials.',
    price: '$99.00',
    rating: '4.6',
  },
  {
    image: '/images/products/laptops/4.webp',
    category: 'Sport',
    title: 'Training Sneakers',
    description:
      'Lightweight sneakers designed for gym, walking, and active lifestyle.',
    price: '$119.00',
    rating: '4.9',
  },
  {
    image: '/images/products/laptops/5.webp',
    category: 'Sport',
    title: 'Training Sneakers',
    description:
      'Lightweight sneakers designed for gym, walking, and active lifestyle.',
    price: '$119.00',
    rating: '4.9',
  },
  {
    image: '/images/products/laptops/6.webp',
    category: 'Sport',
    title: 'Training Sneakers',
    description:
      'Lightweight sneakers designed for gym, walking, and active lifestyle.',
    price: '$119.00',
    rating: '4.9',
  },
  {
    image: '/images/products/laptops/2.webp',
    category: 'Sport',
    title: 'Training Sneakers',
    description:
      'Lightweight sneakers designed for gym, walking, and active lifestyle.',
    price: '$119.00',
    rating: '4.9',
  },
]

export default function LaptopsSlider() {
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
          spaceBetween={24}
          slidesPerView={1.1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="product-slider pb-12"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className="cursor-pointer pb-2">
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
