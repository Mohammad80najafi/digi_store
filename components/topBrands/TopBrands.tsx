'use client'

import { useEffect, useState } from 'react'
import { BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

type Brand = {
  _id: string
  name: string
  logo: string
}

export default function SelectedBrandsSwiper() {
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    fetch('/api/brands')
      .then((res) => res.json())
      .then(setBrands)
      .catch(console.error)
  }, [])

  if (brands.length === 0) return null

  return (
    <section className="w-full bg-white px-4 py-8 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-black">
      <div
        dir="rtl"
        className="mx-auto flex max-w-7xl overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-neutral-950"
      >
        <div className="flex w-42.5 shrink-0 items-center justify-center bg-linear-to-l from-blue-900 to-cyan-600 px-4 text-white sm:w-57.5 lg:w-65">
          <div className="flex flex-col items-center gap-3 text-center">
            <BadgeCheck className="h-9 w-9 sm:h-11 sm:w-11" strokeWidth={2.2} />
            <h2 className="text-base font-black sm:text-xl lg:text-2xl">
              برندهای منتخب
            </h2>
          </div>
        </div>

        <div className="relative min-w-0 flex-1">
          <button
            className="brand-swiper-prev absolute top-1/2 right-4 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-600 shadow-lg transition hover:bg-slate-100 hover:text-blue-700 sm:h-11 sm:w-11 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
            aria-label="قبلی"
          >
            <ChevronRight size={22} />
          </button>

          <button
            className="brand-swiper-next absolute top-1/2 left-4 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-600 shadow-lg transition hover:bg-slate-100 hover:text-blue-700 sm:h-11 sm:w-11 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
            aria-label="بعدی"
          >
            <ChevronLeft size={22} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.brand-swiper-next',
              prevEl: '.brand-swiper-prev',
            }}
            loop={true}
            speed={600}
            slidesPerView={1.4}
            spaceBetween={0}
            breakpoints={{
              480: { slidesPerView: 2 },
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="h-35 px-14 sm:h-42.5"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand._id}>
                <div className="flex h-35 items-center justify-center border-l border-blue-200/80 px-8 sm:h-42.5 dark:border-white/10">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-14 max-w-30 object-contain transition duration-300 hover:scale-105 sm:max-h-16 sm:max-w-40 dark:brightness-110"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
