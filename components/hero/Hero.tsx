'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    title: 'زیبایی را با طراحی حرفه‌ای تجربه کنید',
    subtitle:
      'یک هدر تمام‌عرض، واکنش‌گرا و راست‌چین برای معرفی خدمات، نمونه‌کار یا صفحه اصلی سایت شما.',
    buttonText: 'خرید کنید',
    image: '/images/banner/1.webp',
  },
  {
    id: 2,
    title: 'اسلایدر مدرن با کنترل چپ و راست',
    subtitle:
      'تصویر پس‌زمینه تغییر می‌کند و متن روی تصویر با انیمیشن نرم نمایش داده می‌شود.',
    buttonText: 'خرید کنید',
    image: '/images/banner/2.webp',
  },
  {
    id: 3,
    title: 'مناسب برای موبایل، تبلت و دسکتاپ',
    subtitle:
      'چیدمان این سکشن برای همه اندازه‌ها بهینه شده و در حالت RTL کاملاً مرتب می‌ماند.',
    buttonText: 'خرید کنید',
    image: '/images/banner/3.gif',
  },
  {
    id: 4,
    title: 'مناسب برای موبایل، تبلت و دسکتاپ',
    subtitle:
      'چیدمان این سکشن برای همه اندازه‌ها بهینه شده و در حالت RTL کاملاً مرتب می‌ماند.',
    buttonText: 'خرید کنید',
    image: '/images/banner/4.webp',
  },
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageError, setImageError] = useState<Record<number, boolean>>({})

  const currentSlide = slides[currentIndex]
  const totalSlides = slides.length

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <section className="w-full overflow-hidden rounded-b-2xl text-white">
      <div className="relative mx-auto min-h-[400px] min-w-full md:min-h-[720px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            {imageError[currentSlide.id] ? (
              <div className="flex h-full w-full items-center justify-center bg-gray-800">
                <span className="text-white">تصویر در دسترس نیست</span>
              </div>
            ) : (
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                className="object-cover"
                priority
                onError={() => {
                  setImageError((prev) => ({ ...prev, [currentSlide.id]: true }))
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/45 to-black/25" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-7xl items-center px-5 py-16 sm:px-8 md:min-h-[720px] lg:px-12">
          <div className="max-w-2xl text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: 45 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -45 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute right-5 bottom-6 left-5 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-0 sm:right-8 sm:left-8 lg:right-12 lg:left-12">
          <button
            onClick={goPrev}
            aria-label="اسلاید قبلی"
            className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-950"
          >
            <ChevronRight size={22} />
          </button>

          <div className="flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                aria-label={`رفتن به اسلاید ${index + 1}`}
                className={`h-2 rounded-full transition-all ${index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="اسلاید بعدی"
            className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-950"
          >
            <ChevronLeft size={22} />
          </button>
        </div>
      </div>
    </section>
  )
}
