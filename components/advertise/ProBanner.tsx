'use client'

import { useEffect, useState } from 'react'

type Banner = {
  _id: string
  image: string
  title: string
  subtitle: string
  brand?: string
  button: string
}

export default function PromoBanners() {
  const [banners, setBanners] = useState<Banner[]>([])

  useEffect(() => {
    fetch('/api/banners')
      .then((res) => res.json())
      .then(setBanners)
      .catch(console.error)
  }, [])

  if (banners.length === 0) return null

  return (
    <section className="w-full bg-white px-4 py-8 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-black">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {banners.map((banner) => (
          <div
            key={banner._id}
            dir="rtl"
            className="group relative h-45 overflow-hidden rounded-[22px] bg-neutral-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-50 lg:h-52.5 dark:bg-neutral-900"
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-l from-black/45 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-end p-5 text-right sm:p-6">
              <div className="max-w-[68%]">
                <h3 className="text-2xl leading-tight font-black text-white drop-shadow-md sm:text-3xl lg:text-4xl">
                  {banner.title}
                </h3>

                <p className="mt-1 text-sm font-bold text-white drop-shadow-md sm:text-base">
                  {banner.subtitle}
                </p>

                {banner.brand && (
                  <p className="mt-2 text-lg font-semibold tracking-[0.35em] text-white/90 drop-shadow-md">
                    {banner.brand}
                  </p>
                )}

                <button className="mt-3 rounded-md bg-white px-4 py-1.5 text-xs font-bold text-neutral-900 shadow-sm transition hover:bg-orange-500 hover:text-white sm:text-sm">
                  {banner.button}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
