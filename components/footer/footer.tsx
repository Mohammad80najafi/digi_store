'use client'
import Link from 'next/link'

import {
  MapPin,
  Phone,
  Mail,
  Home,
  AArrowDown,
  Activity,
  AirVent,
} from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              دیجی استور
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              ارایه دهنده محصولات دیجیتال
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                href="/"
                className="text-gray-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Home size={22} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 transition-colors hover:text-pink-600 dark:hover:text-pink-400"
              >
                <AArrowDown size={22} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 transition-colors hover:text-blue-700 dark:hover:text-blue-400"
              >
                <Activity size={22} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 transition-colors hover:text-sky-500 dark:hover:text-sky-400"
              >
                <AirVent size={22} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              لینک‌های سریع
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  خانه
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  خدمات
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  فروشگاه
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  ورود / ثبت نام
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              پشتیبانی
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  سوالات متداول
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  شرایط و قوانین
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  حریم خصوصی
                </a>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  تماس با پشتیبانی
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              تماس با ما
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin size={20} />
                <span>تهران، جنوب تهران</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} />
                <span dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} />
                <span>najafimohammad2808@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 text-sm text-gray-500 md:flex-row dark:border-gray-800 dark:text-gray-400">
          <p dir="rtl">
            © {new Date().getFullYear()} تمامی حقوق برای شرکت محفوظ است.
          </p>

          <p dir="rtl" className="text-center md:text-right">
            طراحی شده با ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
