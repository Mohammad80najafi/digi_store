'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'

const slides = [
  { id: 1, image: '/images/banner/1.webp' },
  { id: 2, image: '/images/banner/2.webp' },
  { id: 3, image: '/images/banner/3.gif' },
  { id: 4, image: '/images/banner/4.webp' },
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [imageError, setImageError] = useState<Record<number, boolean>>({})
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const currentSlide = slides[currentIndex]
  const totalSlides = slides.length

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0
    })
  }

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(goNext, 6000)
  }, [goNext])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [resetTimer])

  return (
    <section
      className="w-full overflow-hidden relative"
      onMouseEnter={() => {
        if (timerRef.current) clearInterval(timerRef.current)
      }}
      onMouseLeave={resetTimer}
    >
      <div className="relative mx-auto min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
            className="absolute inset-0"
          >
            {imageError[currentSlide.id] ? (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <span className="text-white text-lg font-medium">تصویر در دسترس نیست</span>
              </div>
            ) : (
              <Image
                src={currentSlide.image}
                alt="Hero banner"
                fill
                className="object-cover"
                priority
                onError={() => setImageError(prev => ({ ...prev, [currentSlide.id]: true }))}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 right-0 left-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                aria-label={`رفتن به اسلاید ${index + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 ease-out",
                  index === currentIndex ? "w-10 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={goPrev}
              aria-label="اسلاید قبلی"
              className="group grid h-12 w-12 place-items-center rounded-2xl border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-900 active:scale-95"
            >
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={goNext}
              aria-label="اسلاید بعدی"
              className="group grid h-12 w-12 place-items-center rounded-2xl border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-900 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
