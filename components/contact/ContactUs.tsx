'use client'
import { useState, useEffect } from 'react'
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react'

type SiteSettings = {
  address?: string
  phone?: string
  email?: string
  workingHours?: string
}

const defaultIcons = [MapPin, Phone, Mail, Clock]

const defaultLabels = ['آدرس', 'تلفن', 'ایمیل', 'ساعت کاری']

export default function ContactUs() {
  const [settings, setSettings] = useState<SiteSettings>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {})
  }, [])

  const contactInfo = [
    { icon: defaultIcons[0], title: defaultLabels[0], value: settings.address || '' },
    { icon: defaultIcons[1], title: defaultLabels[1], value: settings.phone || '' },
    { icon: defaultIcons[2], title: defaultLabels[2], value: settings.email || '' },
    { icon: defaultIcons[3], title: defaultLabels[3], value: settings.workingHours || '' },
  ].filter((item) => item.value)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section className="bg-gray-50 px-4 py-28 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            تماس با ما
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            ما آماده پاسخگویی به سوالات شما هستیم
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <item.icon size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8 dark:bg-gray-800"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    نام
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder="نام خود را وارد کنید"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    ایمیل
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  موضوع
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="support">پشتیبانی</option>
                  <option value="sales">فروش</option>
                  <option value="feedback">پیشنهادات و انتقادات</option>
                  <option value="other">سایر</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  پیام
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="پیام خود را بنویسید..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 hover:shadow-lg"
                >
                  <Send size={16} />
                  ارسال پیام
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
