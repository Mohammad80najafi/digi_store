'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Phone,
  MapPin,
  Camera,
  Package,
  Heart,
  Truck,
  Clock,
  CheckCircle,
  ShoppingBag,
  LogOut,
} from 'lucide-react'
import { useUser, UserProfile } from '@/store/user'
import { useFavorites, FavoriteItem } from '@/store/favorites'
import { useCart } from '@/store/cart'
import { toPersianPrice, toPersianNumber } from '@/lib/price'
import { cn } from '@/lib/cn'

type Tab = 'info' | 'purchases' | 'favorites' | 'tracking'

type OrderItem = {
  _id: string
  title: string
  price: number
  image: string
  quantity: number
}

type Order = {
  _id: string
  id: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: string
  address: string
}

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'info', label: 'اطلاعات حساب', icon: User },
  { id: 'purchases', label: 'آخرین خریدها', icon: Package },
  { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: Heart },
  { id: 'tracking', label: 'پیگیری سفارشات', icon: Truck },
]

const statusMap = {
  pending: { label: 'در انتظار', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30', icon: Clock },
  processing: { label: 'در حال پردازش', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30', icon: Package },
  shipped: { label: 'ارسال شده', color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/30', icon: Truck },
  delivered: { label: 'تحویل شده', color: 'text-green-600 bg-green-50 dark:bg-green-950/30', icon: CheckCircle },
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white'

export default function Profile() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('info')
  const { profile, updateProfile } = useUser()
  const { items: favorites, toggleFavorite } = useFavorites()
  const [orders, setOrders] = useState<Order[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setOrders(data)
      })
      .catch(() => {})
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    })
    updateProfile({ name: '', email: '', phone: '', address: '', image: '', role: undefined })
    localStorage.removeItem('user-storage')
    router.push('/auth')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      updateProfile({ image: ev.target?.result as string })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 px-4 pt-28 pb-16 dark:bg-black">
      <div className="mx-auto max-w-5xl">
        {/* Profile Header */}
        <div className="mb-8 flex flex-col items-center gap-5 sm:flex-row sm:items-end">
          <div className="relative group">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-lg dark:border-zinc-900 dark:bg-zinc-800">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-gray-400 dark:text-gray-500">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition group-hover:opacity-100"
            >
              <Camera className="h-6 w-6 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="text-center sm:text-right">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {profile.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800 sm:mr-auto"
          >
            <LogOut className="h-4 w-4" />
            خروج
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition',
                activeTab === tab.id
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-zinc-900 dark:text-gray-400 dark:hover:bg-zinc-800',
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.id === 'favorites' && favorites.length > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-200 px-1.5 text-xs font-bold text-gray-700 dark:bg-zinc-700 dark:text-gray-300">
                  {toPersianNumber(favorites.length)}
                </span>
              )}
              {tab.id === 'purchases' && orders.length > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-200 px-1.5 text-xs font-bold text-gray-700 dark:bg-zinc-700 dark:text-gray-300">
                  {toPersianNumber(orders.length)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'info' && (
              <InfoTab profile={profile} updateProfile={updateProfile} />
            )}
            {activeTab === 'purchases' && <PurchasesTab orders={orders} />}
            {activeTab === 'favorites' && <FavoritesTab toggleFavorite={toggleFavorite} />}
            {activeTab === 'tracking' && <TrackingTab orders={orders} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function InfoTab({
  profile,
  updateProfile,
}: {
  profile: UserProfile
  updateProfile: (data: Partial<UserProfile>) => void
}) {
  const [form, setForm] = useState({
    name: profile.name,
    phone: profile.phone,
    address: profile.address,
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    updateProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-zinc-950">
      <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
        اطلاعات شخصی
      </h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <User className="h-4 w-4" />
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Phone className="h-4 w-4" />
            شماره تماس
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            dir="ltr"
            className={inputClass}
            placeholder="۰۹۱۲xxxxxxx"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <MapPin className="h-4 w-4" />
            آدرس
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            className={cn(inputClass, 'resize-none')}
            placeholder="آدرس ارسال"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handleSave}
          className="rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          ذخیره تغییرات
        </button>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-green-600 dark:text-green-400"
          >
            ذخیره شد ✓
          </motion.span>
        )}
      </div>
    </div>
  )
}

function PurchasesTab({ orders }: { orders: Order[] }) {
  const { items: cartItems } = useCart()

  if (orders.length === 0 && cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-zinc-950">
        <ShoppingBag className="h-12 w-12 text-gray-300 dark:text-gray-600" />
        <p className="text-gray-500 dark:text-gray-400">
          هنوز خریدی انجام نداده‌اید.
        </p>
        <Link
          href="/store"
          className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          شروع خرید
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-zinc-950"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                سفارش {order.id}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {order.date}
              </p>
            </div>
            <span
              className={cn(
                'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
                statusMap[order.status].color,
              )}
            >
              {(() => {
                const StatusIcon = statusMap[order.status].icon
                return <StatusIcon className="h-3.5 w-3.5" />
              })()}
              {statusMap[order.status].label}
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex shrink-0 gap-3 rounded-xl bg-gray-50 p-3 dark:bg-zinc-900"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-zinc-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="line-clamp-1 text-sm font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {toPersianNumber(item.quantity)}× {toPersianPrice(item.price)} تومان
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-end border-t border-gray-100 pt-3 dark:border-gray-800">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              جمع: {toPersianPrice(order.total)} تومان
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function FavoritesTab({
  toggleFavorite,
}: {
  toggleFavorite: (item: FavoriteItem) => void
}) {
  const { items: favorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-zinc-950">
        <Heart className="h-12 w-12 text-gray-300 dark:text-gray-600" />
        <p className="text-gray-500 dark:text-gray-400">
          هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.
        </p>
        <Link
          href="/store"
          className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          مشاهده محصولات
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((item) => (
        <div
          key={item._id}
          className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-zinc-950"
        >
          <Link href={`/store/${item._id}`} className="block">
            <div className="overflow-hidden bg-gray-100 dark:bg-gray-900">
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
          <div className="flex items-center justify-between p-4">
            <div>
              <Link href={`/store/${item._id}`}>
                <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
              </Link>
              <p className="mt-1 text-base font-bold text-gray-900 dark:text-white">
                {toPersianPrice(item.price)} تومان
              </p>
            </div>
            <button
              onClick={() => toggleFavorite(item)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Heart className="h-5 w-5 fill-current" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function TrackingTab({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-zinc-950">
        <Truck className="h-12 w-12 text-gray-300 dark:text-gray-600" />
        <p className="text-gray-500 dark:text-gray-400">
          سفارشی برای پیگیری وجود ندارد.
        </p>
        <Link
          href="/store"
          className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          شروع خرید
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const steps = ['pending', 'processing', 'shipped', 'delivered'] as const
        const currentIdx = steps.indexOf(order.status)

        return (
          <div
            key={order.id}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-950"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  سفارش {order.id}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {order.date} — {toPersianPrice(order.total)} تومان
                </p>
              </div>
              <span
                className={cn(
                  'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
                  statusMap[order.status].color,
                )}
              >
                {(() => {
                  const StatusIcon = statusMap[order.status].icon
                  return <StatusIcon className="h-3.5 w-3.5" />
                })()}
                {statusMap[order.status].label}
              </span>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-2">
              {steps.map((step, idx) => (
                <div key={step} className="flex flex-1 items-center gap-2">
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition',
                      idx <= currentIdx
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-400 dark:bg-zinc-800 dark:text-gray-600',
                    )}
                  >
                    {idx < currentIdx ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : idx === currentIdx ? (
                      (() => {
                        const StepIcon = statusMap[step].icon
                        return <StepIcon className="h-4 w-4" />
                      })()
                    ) : (
                      idx + 1
                    )}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={cn(
                        'h-0.5 flex-1 rounded-full',
                        idx < currentIdx
                          ? 'bg-green-500'
                          : 'bg-gray-200 dark:bg-zinc-700',
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>در انتظار</span>
              <span>پردازش</span>
              <span>ارسال</span>
              <span>تحویل</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
