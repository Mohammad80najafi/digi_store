'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Lock,
  User,
  Phone,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useUser } from '@/store/user'

type AuthMode = 'login' | 'register'

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-11 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white'

export default function PurpleLoginCard() {
  const router = useRouter()
  const { updateProfile } = useUser()
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [loginError, setLoginError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
          action: 'login',
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setLoginError(data.error || 'خطا در ورود')
        return
      }
      updateProfile({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        address: '',
        image: '',
      })
      router.push('/profile')
    } catch {
      setLoginError('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    if (registerForm.password !== registerForm.confirmPassword) {
      setLoginError('رمز عبور مطابقت ندارد')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          name: registerForm.name,
          email: registerForm.email,
          phone: registerForm.phone,
          password: registerForm.password,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setLoginError(data.error || 'خطا در ثبت نام')
        return
      }
      updateProfile({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        address: '',
        image: '',
      })
      setRegisterSuccess(true)
      setTimeout(() => router.push('/profile'), 1500)
    } catch {
      setLoginError('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-black"
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 dark:border-gray-800 dark:bg-zinc-950 dark:shadow-none">
          {/* Header */}
          <div className="relative px-8 pt-10 pb-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-violet-500 shadow-lg shadow-blue-500/25">
              <span className="text-2xl font-black text-white">D</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {mode === 'login' ? 'ورود به حساب' : 'ایجاد حساب جدید'}
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {mode === 'login'
                ? 'خوش آمدید! لطفاً وارد حساب خود شوید'
                : 'اطلاعات خود را برای ثبت نام وارد کنید'}
            </p>
          </div>

          {/* Tabs */}
          <div className="mx-8 flex rounded-xl bg-gray-100 p-1 dark:bg-zinc-800">
            <button
              onClick={() => {
                setMode('login')
                setLoginError('')
              }}
              className={cn(
                'flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200',
                mode === 'login'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
              )}
            >
              ورود
            </button>
            <button
              onClick={() => {
                setMode('register')
                setLoginError('')
              }}
              className={cn(
                'flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200',
                mode === 'register'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
              )}
            >
              ثبت نام
            </button>
          </div>

          {/* Forms */}
          <div className="px-8 pt-6 pb-10">
            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      ایمیل
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                        placeholder="example@email.com"
                        className={inputClass}
                        dir="ltr"
                        required
                      />
                      <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      رمز عبور
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                        placeholder="••••••••"
                        className={inputClass}
                        required
                      />
                      <Lock className="absolute top-1/2 left-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <input
                        type="checkbox"
                        className="h-3.5 w-3.5 rounded border-gray-300 accent-blue-500"
                      />
                      مرا به خاطر بسپار
                    </label>
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                      فراموشی رمز عبور؟
                    </a>
                  </div>

                  {loginError && (
                    <p className="text-sm text-red-500">{loginError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    {loading ? 'در حال پردازش...' : 'ورود'}
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      نام کامل
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={registerForm.name}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="نام خود را وارد کنید"
                        className={inputClass}
                        required
                      />
                      <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      ایمیل
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={registerForm.email}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            email: e.target.value,
                          })
                        }
                        placeholder="example@email.com"
                        className={inputClass}
                        dir="ltr"
                        required
                      />
                      <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      تلفن
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={registerForm.phone}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            phone: e.target.value,
                          })
                        }
                        placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                        className={inputClass}
                        dir="ltr"
                      />
                      <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      رمز عبور
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={registerForm.password}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            password: e.target.value,
                          })
                        }
                        placeholder="••••••••"
                        className={inputClass}
                        required
                      />
                      <Lock className="absolute top-1/2 left-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      تکرار رمز عبور
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={registerForm.confirmPassword}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="••••••••"
                        className={inputClass}
                        required
                      />
                      <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {loginError && (
                    <p className="text-sm text-red-500">{loginError}</p>
                  )}

                  {registerSuccess && (
                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                      <CheckCircle className="h-4 w-4" />
                      حساب شما با موفقیت ایجاد شد
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    {loading ? 'در حال پردازش...' : 'ثبت نام'}
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {mode === 'login' ? (
            <>
              حساب ندارید؟{' '}
              <button
                onClick={() => setMode('register')}
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                ثبت نام کنید
              </button>
            </>
          ) : (
            <>
              حساب دارید؟{' '}
              <button
                onClick={() => setMode('login')}
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                وارد شوید
              </button>
            </>
          )}
        </p>
      </div>
    </section>
  )
}
