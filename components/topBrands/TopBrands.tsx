'use client'

import { useEffect, useState } from 'react'
import { BadgeCheck } from 'lucide-react'
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
        <div className="flex w-28 shrink-0 items-center justify-center bg-linear-to-l from-blue-900 to-cyan-600 px-2 text-white sm:w-42.5 sm:px-4 lg:w-65">
          <div className="flex flex-col items-center gap-1.5 text-center sm:gap-3">
            <BadgeCheck className="h-7 w-7 sm:h-9 sm:w-9 lg:h-11 lg:w-11" strokeWidth={2.2} />
            <h2 className="text-xs font-black sm:text-base lg:text-xl">
              برندهای منتخب
            </h2>
          </div>
        </div>

        <div className="relative min-w-0 flex-1">
          <Swiper
            modules={[Navigation]}
            navigation={false}
            loop={true}
            speed={600}
            slidesPerView={1.6}
            spaceBetween={0}
            breakpoints={{
              480: { slidesPerView: 2 },
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="h-28 px-10 sm:h-35 sm:px-12 md:h-42.5 lg:px-14"
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand._id}>
                <div className="flex h-28 items-center justify-center border-l border-blue-200/80 px-4 sm:h-35 sm:px-6 md:h-42.5 lg:px-8 dark:border-white/10">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-10 max-w-24 object-contain transition duration-300 hover:scale-105 sm:max-h-14 sm:max-w-30 md:max-h-16 md:max-w-40 dark:brightness-110"
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
