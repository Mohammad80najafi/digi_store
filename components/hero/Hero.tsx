'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const slides = [
  {
    id: 1,
    image: '/images/banner/1.webp',
    title: 'ژوپیتر',
    subtitle: 'انتخابی اقتصادی بر مدار نیازهای تو!',
    cta: 'مشاهده محصولات',
    href: '/store',
  },
  {
    id: 2,
    image: '/images/banner/2.webp',
    title: 'تابستون تو راهه!',
    subtitle: 'با تخفیف‌های ویژه آماده شو',
    cta: 'شروع خرید',
    href: '/store',
  },
  {
    id: 3,
    image: '/images/banner/4.webp',
    title: 'جدیدترین محصولات',
    subtitle: 'هارد و فلش با بهترین قیمت',
    cta: 'خرید کنید',
    href: '/store',
  },
]

export default function HeroSection() {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section dir="rtl" className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        speed={800}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        className="hero-swiper h-[340px] w-full sm:h-[420px] lg:h-[520px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-l from-black/70 via-black/30 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="max-w-lg"
                  >
                    <h1 className="text-3xl leading-tight font-black text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="mt-3 text-base font-medium text-white/85 drop-shadow sm:text-lg lg:mt-4 lg:text-xl">
                      {slide.subtitle}
                    </p>

                    <Link
                      href={slide.href}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-neutral-900 shadow-lg transition-all duration-300 hover:bg-orange-500 hover:text-white hover:shadow-xl sm:mt-6 sm:px-8 sm:py-3 sm:text-base"
                    >
                      {slide.cta}
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination styling */}
      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 5px;
          background: #fff;
        }
      `}</style>
    </section>
  )
}
