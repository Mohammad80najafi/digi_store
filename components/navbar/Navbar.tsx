'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const navItems = [
  { id: 1, title: 'خانه', href: '/' },
  { id: 2, title: 'فروشگاه', href: '/store' },
  { id: 3, title: 'ارتباط با ما', href: '/contact-us' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    theme == 'dark' ? setTheme('light') : setTheme('dark')
  }

  return (
    <nav
      className={
        'dark:border-surface z-50 mx-auto w-full max-w-7xl rounded-[28px] border-white/15 bg-black/30 px-4 py-3 text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-colors duration-300 sm:px-5 md:rounded-[40px] md:px-6 dark:bg-black/35 dark:text-black'
      }
    >
      <div className="flex items-center justify-between gap-3">
        {/* Right side: logo */}

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={
            'flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition md:hidden dark:bg-black dark:text-white'
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className={
              'flex h-13.5 w-13.5 shrink-0 items-center justify-center rounded-full bg-white md:h-14.5 md:w-14.5 dark:bg-black'
            }
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.5 5C21.2 11.1 17.8 17.2 17.8 23.1c0 .8.08 1.55.24 2.25-1.65-.75-2.82-2.24-3.34-4.2C10.5 25.8 9 30 9 33.2 9 40.1 15.05 45 22.5 45 31.45 45 39 38.85 39 30.2c0-5.55-3.2-10.25-8.55-12.95.78 3.2.05 6.22-2.05 8.6-1.72 1.96-4.25 3.04-7.4 3.15 6.85-5.9 9.05-13.9 6.5-24Z"
                fill="#2563eb"
              />
            </svg>
          </Link>
        </div>

        {/* Center nav - desktop */}
        <ul
          className={
            'hidden items-center gap-8 text-base font-medium md:flex lg:gap-12 lg:text-lg'
          }
        >
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={'rounded-md text-white transition hover:opacity-70'}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Left side: logo */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="تغییر حالت روشن و تاریک"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition dark:bg-black dark:text-white"
          >
            {!mounted ? (
              <span className="h-5 w-5" />
            ) : theme === 'light' ? (
              // Moon icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            ) : (
              // Sun icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            )}
          </button>

          <Link
            href="/profile"
            dir="rtl"
            className={
              'md:11.5 hidden h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-black transition sm:flex md:px-6 md:text-base dark:bg-black dark:text-white'
            }
          >
            mamad@email.com
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={
            'mt-4 rounded-2xl bg-[#f3f3f7] p-4 text-black transition md:hidden dark:bg-[#111111] dark:text-white'
          }
        >
          <ul className="flex flex-col gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block transition hover:opacity-70"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/profile"
                dir="rtl"
                className={
                  'mt-2 flex h-11 items-center justify-center rounded-full bg-black text-sm font-medium text-white dark:bg-white dark:text-black'
                }
              >
                mamd@email.com
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
