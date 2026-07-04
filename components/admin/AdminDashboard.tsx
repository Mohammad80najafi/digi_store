'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Package,
  ShoppingCart,
  DollarSign,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle,
  Clock,
  Truck,
  Image,
  Tag,
  Search,
  ChevronLeft,
  LayoutDashboard,
  Menu,
  Images,
  Users,
  Settings,
  Home,
} from 'lucide-react'
import { Product } from '@/lib/products'
import { toPersianPrice, toPersianNumber } from '@/lib/price'
import { cn } from '@/lib/cn'

type Tab = 'overview' | 'products' | 'orders' | 'brands' | 'banners' | 'heroSlides' | 'users' | 'settings'

type Order = {
  _id: string
  id: string
  items: { _id: string; title: string; price: number; image: string; quantity: number }[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: string
  address: string
}

type Brand = { _id: string; name: string; image: string }
type Banner = { _id: string; title: string; image: string; link?: string }
type HeroSlide = { _id: string; image: string; title: string; subtitle: string; cta: string; href: string; order: number }
type ManagedUser = { _id: string; name: string; email: string; phone: string; address: string; image: string; role?: string }

const navItems: { id: Tab; label: string; icon: typeof Package }[] = [
  { id: 'overview', label: 'داشبورد', icon: LayoutDashboard },
  { id: 'products', label: 'محصولات', icon: Package },
  { id: 'orders', label: 'سفارشات', icon: ShoppingCart },
  { id: 'brands', label: 'برندها', icon: Tag },
  { id: 'banners', label: 'بنرها', icon: Image },
  { id: 'heroSlides', label: 'اسلایدر هیرو', icon: Images },
  { id: 'users', label: 'کاربران', icon: Users },
  { id: 'settings', label: 'تنظیمات', icon: Settings },
]

const statusMap = {
  pending: { label: 'در انتظار', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30', icon: Clock },
  processing: { label: 'در حال پردازش', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30', icon: Package },
  shipped: { label: 'ارسال شده', color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/30', icon: Truck },
  delivered: { label: 'تحویل شده', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30', icon: CheckCircle },
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [users, setUsers] = useState<ManagedUser[]>([])
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [p, o, b, bn, hs, u, s] = await Promise.all([
          fetch('/api/products').then((r) => r.json()),
          fetch('/api/orders').then((r) => r.json()),
          fetch('/api/brands').then((r) => r.json()),
          fetch('/api/banners').then((r) => r.json()),
          fetch('/api/hero-slides').then((r) => r.json()),
          fetch('/api/users').then((r) => r.json()),
          fetch('/api/settings').then((r) => r.json()),
        ])
        if (!cancelled) {
          setProducts(Array.isArray(p) ? p : [])
          setOrders(Array.isArray(o) ? o : [])
          setBrands(Array.isArray(b) ? b : [])
          setBanners(Array.isArray(bn) ? bn : [])
          setHeroSlides(Array.isArray(hs) ? hs : [])
          setUsers(Array.isArray(u) ? u : [])
          setSiteSettings(s && typeof s === 'object' ? s : {})
          setLoading(false)
        }
      } catch {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const pendingOrders = orders.filter((o) => o.status === 'pending').length

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500 dark:border-gray-700" />
          <p className="text-sm text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  const currentTab = navItems.find((n) => n.id === activeTab)

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-50 dark:bg-black">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-screen border-l border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-zinc-950',
          sidebarOpen ? 'w-64' : 'w-20',
          mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0',
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5 dark:border-gray-800">
          {sidebarOpen && (
            <span className="text-lg font-bold text-gray-900 dark:text-white">پنل مدیریت</span>
          )}
          <button
            onClick={() => {
              setSidebarOpen(!sidebarOpen)
              setMobileSidebarOpen(false)
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-zinc-800"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Home link */}
        <div className="mt-4 px-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <Home className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span>صفحه اصلی</span>}
          </Link>
        </div>

        {/* Nav items */}
        <nav className="mt-2 flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setMobileSidebarOpen(false)
                }}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 dark:bg-white dark:text-black dark:shadow-white/10'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-zinc-800 dark:hover:text-white',
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Sidebar footer */}
        {sidebarOpen && (
          <div className="absolute bottom-0 right-0 left-0 border-t border-gray-100 p-4 dark:border-gray-800">
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-zinc-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold text-white">
                A
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">ادمین</p>
                <p className="truncate text-xs text-gray-400">مدیر سیستم</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main
        className={cn(
          'flex-1 transition-all duration-300',
          sidebarOpen ? 'mr-64' : 'mr-20',
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-xl dark:border-gray-800 dark:bg-black/80">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 lg:hidden dark:hover:bg-zinc-800"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <LayoutDashboard className="h-4 w-4" />
              <ChevronLeft className="h-3 w-3 rotate-180" />
              <span className="font-medium text-gray-900 dark:text-white">{currentTab?.label}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <OverviewTab
                  products={products}
                  orders={orders}
                  totalRevenue={totalRevenue}
                  pendingOrders={pendingOrders}
                />
              )}
              {activeTab === 'products' && (
                <ProductsTab products={products} setProducts={setProducts} />
              )}
              {activeTab === 'orders' && (
                <OrdersTab orders={orders} setOrders={setOrders} />
              )}
              {activeTab === 'brands' && (
                <BrandsTab brands={brands} setBrands={setBrands} />
              )}
              {activeTab === 'banners' && (
                <BannersTab banners={banners} setBanners={setBanners} />
              )}
              {activeTab === 'heroSlides' && (
                <HeroSlidesTab heroSlides={heroSlides} setHeroSlides={setHeroSlides} />
              )}
              {activeTab === 'users' && (
                <UsersTab users={users} setUsers={setUsers} />
              )}
              {activeTab === 'settings' && (
                <SettingsTab settings={siteSettings} setSettings={setSiteSettings} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

function OverviewTab({
  products,
  orders,
  totalRevenue,
  pendingOrders,
}: {
  products: Product[]
  orders: Order[]
  totalRevenue: number
  pendingOrders: number
}) {
  const stats = [
    {
      label: 'کل محصولات',
      value: toPersianNumber(products.length),
      icon: Package,
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      label: 'کل سفارشات',
      value: toPersianNumber(orders.length),
      icon: ShoppingCart,
      gradient: 'from-violet-500 to-violet-600',
      bg: 'bg-violet-50 dark:bg-violet-950/20',
    },
    {
      label: 'درآمد کل',
      value: `${toPersianPrice(totalRevenue)} تومان`,
      icon: DollarSign,
      gradient: 'from-emerald-500 to-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    },
    {
      label: 'در انتظار',
      value: toPersianNumber(pendingOrders),
      icon: Clock,
      gradient: 'from-amber-500 to-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-950/20',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">داشبورد</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          خلاصه وضعیت فروشگاه و مدیریت
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:border-gray-800 dark:bg-zinc-950 dark:hover:shadow-none"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110',
                  stat.gradient,
                )}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className={cn('mt-4 h-1.5 w-full rounded-full', stat.bg)}>
              <div
                className={cn('h-full rounded-full bg-gradient-to-r', stat.gradient)}
                style={{ width: `${Math.min((Number(stat.value) || 0) / 10 * 100, 100)}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Order status breakdown */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950">
          <h3 className="mb-5 text-base font-bold text-gray-900 dark:text-white">
            وضعیت سفارشات
          </h3>
          <div className="space-y-4">
            {Object.entries(statusMap).map(([key, value]) => {
              const count = orders.filter((o) => o.status === key).length
              const pct = orders.length ? Math.round((count / orders.length) * 100) : 0
              return (
                <div key={key}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <value.icon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{value.label}</span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{toPersianNumber(count)}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-zinc-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent orders */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              آخرین سفارشات
            </h3>
            <span className="text-xs text-gray-400">{toPersianNumber(orders.length)} سفارش</span>
          </div>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10">
              <ShoppingCart className="h-10 w-10 text-gray-200 dark:text-gray-700" />
              <p className="text-sm text-gray-400">سفارشی وجود ندارد</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between rounded-xl border border-gray-50 bg-gray-50/50 p-3.5 transition hover:border-gray-100 dark:border-gray-800 dark:bg-zinc-900/50 dark:hover:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-zinc-800">
                      <ShoppingCart className="h-4 w-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.id || order._id?.slice(-6)}
                      </p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {toPersianPrice(order.total)}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-1 text-[11px] font-medium',
                        statusMap[order.status]?.color,
                      )}
                    >
                      {statusMap[order.status]?.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top products */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            محصولات اخیر
          </h3>
          <span className="text-xs text-gray-400">{toPersianNumber(products.length)} محصول</span>
        </div>
        {products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-10">
            <Package className="h-10 w-10 text-gray-200 dark:text-gray-700" />
            <p className="text-sm text-gray-400">محصولی وجود ندارد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-3 pr-4 text-xs font-medium text-gray-400">محصول</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">دسته‌بندی</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">قیمت</th>
                  <th className="pb-3 text-xs font-medium text-gray-400">امتیاز</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {products.slice(0, 5).map((product) => (
                  <tr key={product._id} className="transition hover:bg-gray-50/50 dark:hover:bg-zinc-900/30">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800">
                          <img src={product.image} alt="" className="h-full w-full object-cover" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{product.title}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-500 dark:text-gray-400">{product.category}</td>
                    <td className="py-3 font-medium text-gray-900 dark:text-white">
                      {toPersianPrice(product.price)} $
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">★</span>
                        <span className="text-gray-600 dark:text-gray-300">{toPersianNumber(product.rating)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductsTab({
  products,
  setProducts,
}: {
  products: Product[]
  setProducts: (p: Product[]) => void
}) {
  const [editing, setEditing] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = products.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()),
  )

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این محصول مطمئن هستید؟')) return
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
    setProducts(products.filter((p) => p._id !== id))
  }

  const handleSave = async (product: Product) => {
    if (product._id) {
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      setProducts(products.map((p) => (p._id === product._id ? product : p)))
    } else {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      const { _id } = await res.json()
      setProducts([...products, { ...product, _id }])
    }
    setShowForm(false)
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">محصولات</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            مدیریت و ویرایش محصولات فروشگاه
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <Plus className="h-4 w-4" />
          محصول جدید
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو در محصولات..."
          className={cn(inputClass, 'pr-10')}
        />
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ProductForm
              product={editing}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditing(null) }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-zinc-950">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <Package className="h-12 w-12 text-gray-200 dark:text-gray-700" />
            <p className="text-sm text-gray-400">محصولی یافت نشد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-zinc-900/50">
                  <th className="px-5 py-3.5 text-xs font-medium text-gray-400">محصول</th>
                  <th className="px-5 py-3.5 text-xs font-medium text-gray-400">دسته‌بندی</th>
                  <th className="px-5 py-3.5 text-xs font-medium text-gray-400">قیمت</th>
                  <th className="px-5 py-3.5 text-xs font-medium text-gray-400">امتیاز</th>
                  <th className="px-5 py-3.5 text-right text-xs font-medium text-gray-400">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {filtered.map((product) => (
                  <tr key={product._id} className="transition hover:bg-gray-50/50 dark:hover:bg-zinc-900/30">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800">
                          <img src={product.image} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{product.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{product.category}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">
                      {toPersianPrice(product.price)} $
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                        ★ {toPersianNumber(product.rating)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => { setEditing(product); setShowForm(true) }}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-zinc-800"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id!)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null
  onSave: (p: Product) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    title: product?.title || '',
    category: product?.category || '',
    price: product?.price || 0,
    rating: product?.rating || 0,
    image: product?.image || '',
    description: product?.description || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'price' || name === 'rating' ? Number(value) : value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...product, ...form } as Product)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950"
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          {product ? 'ویرایش محصول' : 'افزودن محصول جدید'}
        </h3>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">نام محصول</label>
          <input name="title" value={form.title} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">دسته‌بندی</label>
          <input name="category" value={form.category} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">قیمت (تومان)</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">امتیاز</label>
          <input name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={handleChange} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">آدرس تصویر</label>
          <input name="image" value={form.image} onChange={handleChange} className={inputClass} required />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">توضیحات</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={cn(inputClass, 'resize-none')} />
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          ذخیره
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-zinc-700"
        >
          انصراف
        </button>
      </div>
    </form>
  )
}

function OrdersTab({
  orders,
  setOrders,
}: {
  orders: Order[]
  setOrders: (o: Order[]) => void
}) {
  const [search, setSearch] = useState('')

  const filtered = orders.filter(
    (o) =>
      o.id?.toLowerCase().includes(search.toLowerCase()) ||
      o.address?.toLowerCase().includes(search.toLowerCase()),
  )

  const handleStatusChange = async (order: Order, status: Order['status']) => {
    await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: order._id, status }),
    })
    setOrders(orders.map((o) => (o._id === order._id ? { ...o, status } : o)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">سفارشات</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          مدیریت و پیگیری سفارشات مشتریان
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو در سفارشات..."
          className={cn(inputClass, 'pr-10')}
        />
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white py-16 dark:border-gray-800 dark:bg-zinc-950">
          <ShoppingCart className="h-12 w-12 text-gray-200 dark:text-gray-700" />
          <p className="text-sm text-gray-400">سفارشی یافت نشد</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl border border-gray-100 bg-white p-5 transition hover:shadow-md dark:border-gray-800 dark:bg-zinc-950 dark:hover:shadow-none"
            >
              {/* Order header */}
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-zinc-800">
                    <ShoppingCart className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      سفارش {order.id || order._id?.slice(-6)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.date} {order.address && `— ${order.address}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-gray-900 dark:text-white">
                    {toPersianPrice(order.total)} تومان
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value as Order['status'])}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300"
                  >
                    <option value="pending">در انتظار</option>
                    <option value="processing">در حال پردازش</option>
                    <option value="shipped">ارسال شده</option>
                    <option value="delivered">تحویل شده</option>
                  </select>
                </div>
              </div>

              {/* Order items */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {order.items?.map((item) => (
                  <div
                    key={item._id}
                    className="flex shrink-0 gap-3 rounded-xl border border-gray-50 bg-gray-50/50 p-3 dark:border-gray-800 dark:bg-zinc-900/50"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-zinc-800">
                      <img src={item.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="line-clamp-1 text-sm font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {toPersianNumber(item.quantity)}× {toPersianPrice(item.price)} $
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BrandsTab({
  brands,
  setBrands,
}: {
  brands: Brand[]
  setBrands: (b: Brand[]) => void
}) {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Brand | null>(null)
  const [form, setForm] = useState({ name: '', image: '' })
  const [search, setSearch] = useState('')

  const filtered = brands.filter((b) =>
    b.name?.toLowerCase().includes(search.toLowerCase()),
  )

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این برند مطمئن هستید؟')) return
    await fetch(`/api/brands?id=${id}`, { method: 'DELETE' })
    setBrands(brands.filter((b) => b._id !== id))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      await fetch('/api/brands', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: editing._id, ...form }),
      })
      setBrands(brands.map((b) => (b._id === editing._id ? { ...b, ...form } : b)))
    } else {
      const res = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const { _id } = await res.json()
      setBrands([...brands, { _id, ...form }])
    }
    setShowForm(false)
    setEditing(null)
    setForm({ name: '', image: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">برندها</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            مدیریت برندهای فروشگاه
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ name: '', image: '' }); setShowForm(true) }}
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <Plus className="h-4 w-4" />
          برند جدید
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو در برندها..."
          className={cn(inputClass, 'pr-10')}
        />
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <form
              onSubmit={handleSave}
              className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {editing ? 'ویرایش برند' : 'افزودن برند جدید'}
                </h3>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">نام برند</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">آدرس تصویر</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass} required />
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button type="submit" className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  ذخیره
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="rounded-xl bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-zinc-700">
                  انصراف
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brands grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white py-16 dark:border-gray-800 dark:bg-zinc-950">
          <Tag className="h-12 w-12 text-gray-200 dark:text-gray-700" />
          <p className="text-sm text-gray-400">برندی یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((brand) => (
            <div
              key={brand._id}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 transition hover:shadow-md dark:border-gray-800 dark:bg-zinc-950 dark:hover:shadow-none"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-50 dark:bg-zinc-900">
                <img src={brand.image} alt={brand.name} className="h-full w-full object-contain p-1" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-gray-900 dark:text-white">{brand.name}</p>
              </div>
              <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={() => { setEditing(brand); setForm({ name: brand.name, image: brand.image }); setShowForm(true) }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-zinc-800"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(brand._id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BannersTab({
  banners,
  setBanners,
}: {
  banners: Banner[]
  setBanners: (b: Banner[]) => void
}) {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Banner | null>(null)
  const [form, setForm] = useState({ title: '', image: '', link: '' })
  const [search, setSearch] = useState('')

  const filtered = banners.filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase()),
  )

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این بنر مطمئن هستید؟')) return
    await fetch(`/api/banners?id=${id}`, { method: 'DELETE' })
    setBanners(banners.filter((b) => b._id !== id))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      await fetch('/api/banners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: editing._id, ...form }),
      })
      setBanners(banners.map((b) => (b._id === editing._id ? { ...b, ...form } : b)))
    } else {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const { _id } = await res.json()
      setBanners([...banners, { _id, ...form }])
    }
    setShowForm(false)
    setEditing(null)
    setForm({ title: '', image: '', link: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">بنرها</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            مدیریت بنرهای تبلیغاتی فروشگاه
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ title: '', image: '', link: '' }); setShowForm(true) }}
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <Plus className="h-4 w-4" />
          بنر جدید
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو در بنرها..."
          className={cn(inputClass, 'pr-10')}
        />
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <form
              onSubmit={handleSave}
              className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {editing ? 'ویرایش بنر' : 'افزودن بنر جدید'}
                </h3>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">عنوان</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">آدرس تصویر</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass} required />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">لینک (اختیاری)</label>
                  <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button type="submit" className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  ذخیره
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="rounded-xl bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-zinc-700">
                  انصراف
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banners grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white py-16 dark:border-gray-800 dark:bg-zinc-950">
          <Image className="h-12 w-12 text-gray-200 dark:text-gray-700" />
          <p className="text-sm text-gray-400">بنری یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((banner) => (
            <div
              key={banner._id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:shadow-md dark:border-gray-800 dark:bg-zinc-950 dark:hover:shadow-none"
            >
              <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute bottom-3 right-3 left-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
                  <button
                    onClick={() => { setEditing(banner); setForm({ title: banner.title, image: banner.image, link: banner.link || '' }); setShowForm(true) }}
                    className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/90 text-xs font-medium text-gray-700 backdrop-blur-sm transition hover:bg-white"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/90 text-white backdrop-blur-sm transition hover:bg-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="font-medium text-gray-900 dark:text-white">{banner.title}</p>
                {banner.link && (
                  <p className="mt-1 line-clamp-1 text-xs text-gray-400">{banner.link}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function HeroSlidesTab({
  heroSlides,
  setHeroSlides,
}: {
  heroSlides: HeroSlide[]
  setHeroSlides: (s: HeroSlide[]) => void
}) {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<HeroSlide | null>(null)
  const [form, setForm] = useState({ image: '', title: '', subtitle: '', cta: '', href: '' })

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این اسلاید مطمئن هستید؟')) return
    await fetch(`/api/hero-slides?id=${id}`, { method: 'DELETE' })
    setHeroSlides(heroSlides.filter((s) => s._id !== id))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      await fetch('/api/hero-slides', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: editing._id, ...form }),
      })
      setHeroSlides(heroSlides.map((s) => (s._id === editing._id ? { ...s, ...form } : s)))
    } else {
      const res = await fetch('/api/hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const { _id } = await res.json()
      setHeroSlides([...heroSlides, { _id, ...form, order: heroSlides.length }])
    }
    setShowForm(false)
    setEditing(null)
    setForm({ image: '', title: '', subtitle: '', cta: '', href: '' })
  }

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const sorted = [...heroSlides].sort((a, b) => a.order - b.order)
    const idx = sorted.findIndex((s) => s._id === id)
    if (idx === -1) return
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= sorted.length) return
    const temp = sorted[idx].order
    sorted[idx] = { ...sorted[idx], order: sorted[swapIdx].order }
    sorted[swapIdx] = { ...sorted[swapIdx], order: temp }
    await Promise.all([
      fetch('/api/hero-slides', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: sorted[idx]._id, order: sorted[idx].order }),
      }),
      fetch('/api/hero-slides', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: sorted[swapIdx]._id, order: sorted[swapIdx].order }),
      }),
    ])
    setHeroSlides(sorted)
  }

  const sorted = [...heroSlides].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">اسلایدر هیرو</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            مدیریت اسلایدر صفحه اصلی
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ image: '', title: '', subtitle: '', cta: '', href: '' }); setShowForm(true) }}
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <Plus className="h-4 w-4" />
          اسلاید جدید
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <form
              onSubmit={handleSave}
              className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {editing ? 'ویرایش اسلاید' : 'افزودن اسلاید جدید'}
                </h3>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">آدرس تصویر</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">عنوان اصلی</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">زیرعنوان</label>
                  <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">متن دکمه</label>
                  <input value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">لینک دکمه</label>
                  <input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} className={inputClass} required />
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button type="submit" className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  ذخیره
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="rounded-xl bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-zinc-700">
                  انصراف
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white py-16 dark:border-gray-800 dark:bg-zinc-950">
          <Images className="h-12 w-12 text-gray-200 dark:text-gray-700" />
          <p className="text-sm text-gray-400">اسلایدی وجود ندارد</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((slide, index) => (
            <div
              key={slide._id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:shadow-md dark:border-gray-800 dark:bg-zinc-950 dark:hover:shadow-none"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative shrink-0 overflow-hidden bg-gray-100 sm:w-64 dark:bg-gray-900">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-48 w-full object-cover sm:h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500 dark:bg-zinc-800">
                        {toPersianNumber(index + 1)}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{slide.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{slide.subtitle}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 dark:bg-zinc-800">{slide.cta}</span>
                      <span className="truncate">{slide.href}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => handleReorder(slide._id, 'up')}
                      disabled={index === 0}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 dark:hover:bg-zinc-800"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleReorder(slide._id, 'down')}
                      disabled={index === sorted.length - 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 dark:hover:bg-zinc-800"
                    >
                      ↓
                    </button>
                    <div className="mr-auto flex gap-1 opacity-0 transition group-hover:opacity-100">
                      <button
                        onClick={() => { setEditing(slide); setForm({ image: slide.image, title: slide.title, subtitle: slide.subtitle, cta: slide.cta, href: slide.href }); setShowForm(true) }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-zinc-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(slide._id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function UsersTab({
  users,
  setUsers,
}: {
  users: ManagedUser[]
  setUsers: (u: ManagedUser[]) => void
}) {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<ManagedUser | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', image: '', role: 'user' })
  const [search, setSearch] = useState('')

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.includes(search),
  )

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این کاربر مطمئن هستید؟')) return
    await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
    setUsers(users.filter((u) => u._id !== id))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: editing._id, ...form }),
      })
      setUsers(users.map((u) => (u._id === editing._id ? { ...u, ...form } : u)))
    } else {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const { _id } = await res.json()
      setUsers([...users, { _id, ...form }])
    }
    setShowForm(false)
    setEditing(null)
    setForm({ name: '', email: '', phone: '', address: '', image: '', role: 'user' })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">کاربران</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            مدیریت کاربران فروشگاه
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ name: '', email: '', phone: '', address: '', image: '', role: 'user' }); setShowForm(true) }}
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <Plus className="h-4 w-4" />
          کاربر جدید
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو در کاربران..."
          className={cn(inputClass, 'pr-10')}
        />
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <form
              onSubmit={handleSave}
              className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {editing ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}
                </h3>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">نام</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">ایمیل</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">تلفن</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">نقش</label>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass}>
                    <option value="user">کاربر</option>
                    <option value="admin">مدیر</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">آدرس</label>
                  <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">آدرس تصویر</label>
                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button type="submit" className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  ذخیره
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="rounded-xl bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-zinc-700">
                  انصراف
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Users table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-zinc-950">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <Users className="h-12 w-12 text-gray-200 dark:text-gray-700" />
            <p className="text-sm text-gray-400">کاربری یافت نشد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-zinc-900/50">
                  <th className="px-5 py-3.5 text-xs font-medium text-gray-400">کاربر</th>
                  <th className="px-5 py-3.5 text-xs font-medium text-gray-400">ایمیل</th>
                  <th className="px-5 py-3.5 text-xs font-medium text-gray-400">تلفن</th>
                  <th className="px-5 py-3.5 text-xs font-medium text-gray-400">نقش</th>
                  <th className="px-5 py-3.5 text-right text-xs font-medium text-gray-400">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                {filtered.map((user) => (
                  <tr key={user._id} className="transition hover:bg-gray-50/50 dark:hover:bg-zinc-900/30">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800">
                          {user.image ? (
                            <img src={user.image} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-400">
                              {user.name?.charAt(0) || '?'}
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{user.email}</td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{user.phone || '—'}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-1 text-[11px] font-medium',
                          user.role === 'admin'
                            ? 'text-violet-600 bg-violet-50 dark:bg-violet-950/30'
                            : 'text-gray-600 bg-gray-100 dark:bg-zinc-800 dark:text-gray-400',
                        )}
                      >
                        {user.role === 'admin' ? 'مدیر' : 'کاربر'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => { setEditing(user); setForm({ name: user.name, email: user.email, phone: user.phone || '', address: user.address || '', image: user.image || '', role: user.role || 'user' }); setShowForm(true) }}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-zinc-800"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function SettingsTab({
  settings,
  setSettings,
}: {
  settings: Record<string, string>
  setSettings: (s: Record<string, string>) => void
}) {
  const [form, setForm] = useState(settings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(settings)
  }, [settings])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSettings(form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const fields = [
    { key: 'siteName', label: 'نام سایت', placeholder: 'دیجی استور' },
    { key: 'siteDescription', label: 'توضیحات سایت', placeholder: 'ارایه دهنده محصولات دیجیتال' },
    { key: 'address', label: 'آدرس', placeholder: 'تهران، جنوب تهران' },
    { key: 'phone', label: 'تلفن', placeholder: '۰۲۱-۱۲۳۴۵۶۷۸' },
    { key: 'email', label: 'ایمیل', placeholder: 'info@example.com' },
    { key: 'workingHours', label: 'ساعت کاری', placeholder: 'شنبه تا پنجشنبه ۹ صبح تا ۶ عصر' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">تنظیمات</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          مدیریت اطلاعات سایت و تنظیمات عمومی
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key} className={field.key === 'siteDescription' ? 'sm:col-span-2' : ''}>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.label}
              </label>
              <input
                value={form[field.key] || ''}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className={inputClass}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {saving ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 dark:text-emerald-400">
              تنظیمات با موفقیت ذخیره شد
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
