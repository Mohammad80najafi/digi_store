'use client'
import { useState, useEffect } from 'react'
import { Target, Users, Award, Heart } from 'lucide-react'

type SiteSettings = {
  siteName?: string
  aboutUs?: string
  mission?: string
  values?: string[]
  team?: { name: string; role: string; image: string }[]
}

const defaultStats = [
  { icon: Users, label: 'مشتری راضی', value: '۵۰,۰۰۰+' },
  { icon: Award, label: 'سال تجربه', value: '۱۰+' },
  { icon: Target, label: 'محصول', value: '۱۰,۰۰۰+' },
  { icon: Heart, label: 'رضایت مشتری', value: '۹۸٪' },
]

export default function AboutUs() {
  const [settings, setSettings] = useState<SiteSettings>({})

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {})
  }, [])

  return (
    <section className="bg-gray-50 px-4 py-28 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            درباره {settings.siteName || 'دیجی‌استور'}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {settings.aboutUs || 'ما با بیش از ۱۰ سال تجربه در زمینه فروش محصولات دیجیتال، همواره تلاش کرده تا بهترین محصولات با کیفیت و قیمت مناسب را در اختیار مشتریان خود قرار دهیم.'}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {defaultStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-gray-800"
            >
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <stat.icon size={22} />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16 rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            ماموریت ما
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {settings.mission || 'ارائه بهترین تجربه خرید آنلاین با تمرکز بر کیفیت، قیمت مناسب و رضایت مشتری.'}
          </p>
        </div>

        {settings.values && settings.values.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-6 text-center text-xl font-bold text-gray-900 dark:text-white">
              ارزش‌های ما
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {settings.values.map((value) => (
                <span
                  key={value}
                  className="rounded-full bg-blue-100 px-6 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        )}

        {settings.team && settings.team.length > 0 && (
          <div>
            <h2 className="mb-6 text-center text-xl font-bold text-gray-900 dark:text-white">
              تیم ما
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {settings.team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-gray-800"
                >
                  <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
