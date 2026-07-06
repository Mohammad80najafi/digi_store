'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  ShoppingCart,
  Heart,
  ChevronLeft,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Monitor,
  Cpu,
  HardDrive,
  Battery,
  Weight,
  MonitorCheck,
  EthernetPort,
  Maximize2,
  Image as ImageIcon,
  Video,
  BarChart3,
  MessageCircle,
  ThumbsUp,
  Share2,
  Clock,
  Award,
  Zap,
  RefreshCw,
  Package,
  Smartphone,
  Tablet,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useCart } from '@/store/cart'
import { useFavorites } from '@/store/favorites'
import { useCompare, type CompareItem } from '@/store/compare'
import { toPersianPrice, toPersianNumber } from '@/lib/price'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/footer'

type SpecGroup = {
  title: string
  icon: React.ElementType
  specs: { label: string; value: string }[]
}

type ConfigOption = {
  label: string
  key: string
  value: string
  priceDelta: number
}

type Product = {
  _id: string
  title: string
  category: string
  price: number
  rating: number
  image: string
  description?: string
  specs?: { label: string; value: string }[]
  gallery?: string[]
}

const categoryLabels: Record<string, { icon: React.ElementType; keywords: string[] }> = {
  'پردازنده': { icon: Cpu, keywords: ['پردازنده', 'cpu', 'core', 'مدل پردازنده', 'سری پردازنده'] },
  'رم': { icon: Monitor, keywords: ['رم', 'ram', 'حافظه ram', 'ظرفیت رم'] },
  'حافظه داخلی': { icon: HardDrive, keywords: ['حافظه', 'storage', 'هارد', 'ssd', 'nvme', 'ظرفیت حافظه', 'نوع حافظه'] },
  'گرافیک': { icon: MonitorCheck, keywords: ['گرافیک', 'gpu', 'کارت گرافیک', 'مدل گرافیک', 'حافظه گرافیک'] },
  'صفحه نمایش': { icon: Monitor, keywords: ['صفحه', 'نمایش', 'display', 'رزولوشن', 'اندازه صفحه', 'نوع پنل', 'نرخ نوسازی', 'رفرش'] },
  'پورت‌ها': { icon: EthernetPort, keywords: ['پورت', 'port', 'درگاه'] },
  'باتری': { icon: Battery, keywords: ['باتری', 'battery', 'ظرفیت باتری'] },
  'وزن': { icon: Weight, keywords: ['وزن', 'weight', 'ابعاد'] },
  'سیستم عامل': { icon: MonitorCheck, keywords: ['سیستم', 'عامل', 'os', 'سیستم‌عامل'] },
}

function categorizeSpecs(specs?: { label: string; value: string }[]): SpecGroup[] {
  if (!specs || specs.length === 0) return []
  const groups: Record<string, { label: string; value: string }[]> = {}
  const uncategorized: { label: string; value: string }[] = []

  for (const spec of specs) {
    let matched = false
    for (const [groupName, config] of Object.entries(categoryLabels)) {
      if (config.keywords.some((kw) => spec.label.toLowerCase().includes(kw))) {
        if (!groups[groupName]) groups[groupName] = []
        groups[groupName].push(spec)
        matched = true
        break
      }
    }
    if (!matched) uncategorized.push(spec)
  }

  const result: SpecGroup[] = []
  for (const [title, config] of Object.entries(categoryLabels)) {
    if (groups[title]) {
      result.push({ title, icon: config.icon, specs: groups[title] })
    }
  }
  if (uncategorized.length > 0) {
    result.push({ title: 'سایر', icon: Package, specs: uncategorized })
  }
  return result
}

function detectConfigOptions(specs?: { label: string; value: string }[]): ConfigOption[] {
  if (!specs) return []
  return specs
    .filter((s) => {
      const kw = s.label.toLowerCase()
      return (
        kw.includes('رم') ||
        kw.includes('ram') ||
        kw.includes('حافظه') ||
        kw.includes('storage') ||
        kw.includes('گرافیک') ||
        kw.includes('gpu') ||
        kw.includes('رنگ') ||
        kw.includes('color')
      )
    })
    .map((s) => ({
      label: s.label,
      key: s.label,
      value: s.value,
      priceDelta: 0,
    }))
}

function parseTitle(product: Product) {
  const parts = product.title.split(' ')
  const brand = parts[0] || ''
  const model = parts.slice(1).join(' ')
  return { brand, model }
}

const galleryImages = [
  '/images/products/laptops/1.webp',
  '/images/products/laptops/2.webp',
  '/images/products/laptops/3.webp',
  '/images/products/laptops/4.webp',
]

export default function LaptopProductPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showMobileGallery, setShowMobileGallery] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(0)
  const [reviews, setReviews] = useState<{ name: string; rating: number; text: string; date: string }[]>([])
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [selectedConfig, setSelectedConfig] = useState<Record<string, string>>({})

  const addItem = useCart((s) => s.addItem)
  const openCart = useCart((s) => s.openCart)
  const toggleFavorite = useFavorites((s) => s.toggleFavorite)
  const isFav = useFavorites((s) => s.isFavorite)
  const toggleCompare = useCompare((s) => s.toggleCompare)
  const isCompared = useCompare((s) => s.isCompared)

  useEffect(() => {
    if (!id) return
    fetch(`/api/products?id=${id}`)
      .then((res) => { if (!res.ok) return null; return res.json() })
      .then((data) => {
        setProduct(data)
        if (data?.specs) {
          const configs = detectConfigOptions(data.specs)
          const initial: Record<string, string> = {}
          configs.forEach((c) => { initial[c.key] = c.value })
          setSelectedConfig(initial)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const productImages = useMemo(() => {
    if (!product) return galleryImages
    if (product.gallery && product.gallery.length > 0) return product.gallery
    if (product.image) return [product.image, ...galleryImages]
    return galleryImages
  }, [product])

  const specGroups = useMemo(() => {
    if (!product) return []
    return categorizeSpecs(product.specs)
  }, [product])

  const configOptions = useMemo(() => {
    if (!product) return []
    return detectConfigOptions(product.specs)
  }, [product])

  const totalPrice = useMemo(() => {
    if (!product) return 0
    let delta = 0
    for (const opt of configOptions) {
      if (selectedConfig[opt.key] !== opt.value) {
        const match = configOptions.find((c) => c.key === opt.key && c.value === selectedConfig[opt.key])
        delta += match?.priceDelta ?? 0
      }
    }
    return product.price + delta
  }, [product, configOptions, selectedConfig])

  const { brand, model } = product ? parseTitle(product) : { brand: '', model: '' }

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return product?.rating ?? 0
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  }, [reviews, product])

  const ratingDistribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0]
    reviews.forEach((r) => {
      const idx = Math.min(Math.floor(r.rating) - 1, 4)
      if (idx >= 0) dist[idx]++
    })
    return dist
  }, [reviews])

  const handleAddToCart = () => {
    if (!product) return
    addItem(
      { _id: product._id, title: product.title, category: product.category, price: totalPrice, image: product.image },
      quantity,
    )
    openCart()
  }

  const handleSubmitReview = () => {
    if (!reviewText.trim() || reviewRating === 0) return
    setReviews((prev) => [
      { name: 'کاربر دیجی‌استور', rating: reviewRating, text: reviewText, date: new Date().toLocaleDateString('fa-IR') },
      ...prev,
    ])
    setReviewText('')
    setReviewRating(0)
  }

  if (loading) {
    return (
      <>
        <div className="fixed top-4 right-0 left-0 z-50 px-4"><Navbar /></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />
            <span className="text-sm text-gray-500 dark:text-gray-400">در حال بارگذاری محصول...</span>
          </div>
        </div>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <div className="fixed top-4 right-0 left-0 z-50 px-4"><Navbar /></div>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
          <Package className="h-16 w-16 text-gray-300 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400">محصول مورد نظر یافت نشد.</p>
          <button onClick={() => router.push('/store')} className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            بازگشت به فروشگاه
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="fixed top-4 right-0 left-0 z-50 px-4"><Navbar /></div>

      <div dir="rtl" className="min-h-screen bg-gray-50 pb-32 dark:bg-black sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <button onClick={() => router.push('/')} className="transition hover:text-gray-900 dark:hover:text-white">خانه</button>
            <ChevronLeft className="h-3.5 w-3.5" />
            <button onClick={() => router.push('/store')} className="transition hover:text-gray-900 dark:hover:text-white">فروشگاه</button>
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="font-medium text-gray-900 dark:text-white line-clamp-1">{product.title}</span>
          </nav>

          {/* ─── Above the Fold ─── */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Gallery */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-zinc-950">
                <div className="relative">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.title}
                    className="h-[320px] w-full object-cover transition-all duration-500 sm:h-[420px] lg:h-[480px]"
                  />
                  <button
                    onClick={() => setShowMobileGallery(true)}
                    className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition hover:bg-black/90"
                  >
                    <ImageIcon className="h-3.5 w-3.5" />
                    {toPersianNumber(productImages.length)} تصویر
                  </button>
                  <button className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition hover:bg-black/90">
                    <Video className="h-3.5 w-3.5" />
                    ویدیوی ۳۶۰°
                  </button>
                </div>
              </div>

              {productImages.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                  {productImages.map((img, index) => (
                    <button key={index} onClick={() => setSelectedImage(index)}
                      className={cn(
                        'h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 sm:h-20 sm:w-20',
                        selectedImage === index
                          ? 'border-gray-900 ring-1 ring-gray-900 dark:border-white dark:ring-white'
                          : 'border-gray-200 opacity-70 hover:opacity-100 dark:border-gray-700',
                      )}>
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="flex flex-col">
              {/* Category + Rating */}
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-zinc-800 dark:text-gray-300">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{toPersianNumber(avgRating)}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    ({toPersianNumber(reviews.length)} نظر)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
                {brand}{' '}
                <span className="text-gray-600 dark:text-gray-400">{model}</span>
              </h1>

              {/* Short description */}
              {product.description && (
                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400 line-clamp-2">
                  {product.description}
                </p>
              )}

              {/* Config Switches */}
              {configOptions.length > 0 && (
                <div className="mt-5 space-y-3 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-zinc-950">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <Zap className="h-3.5 w-3.5" />
                    پیکربندی محصول
                  </div>
                  {configOptions.map((opt) => (
                    <div key={opt.key} className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{opt.label}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {[opt.value, opt.value.includes('16') ? '۳۲ گیگابایت' : '۱۶ گیگابایت'].map((val, i) => (
                          <button key={i} onClick={() => setSelectedConfig((prev) => ({ ...prev, [opt.key]: val }))}
                            className={cn(
                              'rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
                              selectedConfig[opt.key] === val
                                ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-black'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-400',
                            )}>
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price */}
              <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-zinc-950">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">قیمت</p>
                    <p className="mt-1 text-3xl font-black text-gray-900 sm:text-4xl dark:text-white">
                      {toPersianPrice(totalPrice)} تومان
                    </p>
                  </div>
                  {totalPrice !== product.price && (
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600 dark:bg-green-950 dark:text-green-400">
                      <Zap className="mr-1 inline h-3 w-3" />
                      {toPersianPrice(totalPrice - product.price)} +
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center justify-center overflow-hidden rounded-full border border-gray-300 dark:border-gray-700">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-12 w-12 items-center justify-center text-lg font-bold transition hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex h-12 w-14 items-center justify-center text-lg font-semibold">
                    {toPersianNumber(quantity)}
                  </span>
                  <button onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-12 w-12 items-center justify-center text-lg font-bold transition hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800 sm:text-base dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  <ShoppingCart className="h-5 w-5" />
                  افزودن به سبد خرید
                </button>

                <button onClick={() => toggleFavorite({ _id: product._id, title: product.title, category: product.category, price: totalPrice, image: product.image, rating: product.rating })}
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-200',
                    isFav(product._id)
                      ? 'border-red-300 bg-red-50 text-red-500 dark:border-red-800 dark:bg-red-950'
                      : 'border-gray-300 text-gray-500 hover:border-red-300 hover:text-red-500 dark:border-gray-700 dark:text-gray-400',
                  )}>
                  <Heart className={cn('h-5 w-5', isFav(product._id) && 'fill-current')} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white p-3 text-center dark:border-gray-800 dark:bg-zinc-950">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  <span className="text-[10px] font-medium leading-tight text-gray-600 dark:text-gray-300">گارانتی اصالت و سلامت فیزیکی</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white p-3 text-center dark:border-gray-800 dark:bg-zinc-950">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <span className="text-[10px] font-medium leading-tight text-gray-600 dark:text-gray-300">ارسال رایگان و سریع</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white p-3 text-center dark:border-gray-800 dark:bg-zinc-950">
                  <RefreshCw className="h-5 w-5 text-orange-500" />
                  <span className="text-[10px] font-medium leading-tight text-gray-600 dark:text-gray-300">۷ روز ضمانت بازگشت</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white p-3 text-center dark:border-gray-800 dark:bg-zinc-950">
                  <Award className="h-5 w-5 text-purple-500" />
                  <span className="text-[10px] font-medium leading-tight text-gray-600 dark:text-gray-300">بهترین قیمت تضمینی</span>
                </div>
              </div>

              {/* Stock + Compare */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500">
                    <span className="h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  </span>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">موجود در انبار</span>
                </div>
                <button onClick={() => toggleCompare({ _id: product._id, title: product.title, price: totalPrice, image: product.image, specs: product.specs })}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                    isCompared(product._id)
                      ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-black'
                      : 'border-gray-300 text-gray-600 hover:border-gray-900 dark:border-gray-700 dark:text-gray-400',
                  )}>
                  <BarChart3 className="h-3.5 w-3.5" />
                  {isCompared(product._id) ? 'در لیست مقایسه' : 'مقایسه'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── Technical Specs Table ─── */}
        {specGroups.length > 0 && (
          <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-800 dark:bg-zinc-950">
              <div className="mb-6 flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-gray-900 dark:text-white" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">مشخصات فنی</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {specGroups.map((group) => (
                  <div key={group.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-zinc-900">
                    <div className="mb-3 flex items-center gap-2">
                      <group.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      <h3 className="font-bold text-gray-900 dark:text-white">{group.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {group.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 border-b border-gray-100 pb-1.5 text-sm last:border-0 dark:border-gray-800">
                          <span className="text-gray-500 dark:text-gray-400">{spec.label}</span>
                          <span className="font-medium text-gray-900 dark:text-white text-left">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── Features & Review ─── */}
        <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Main content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Key Features */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-800 dark:bg-zinc-950">
                <div className="mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-gray-900 dark:text-white" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">ویژگی‌های کلیدی</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                      پردازنده قدرتمند {specGroups.find((g) => g.title === 'پردازنده')?.specs[0]?.value || 'نسل جدید'} — عملکردی روان در اجرای برنامه‌های سنگین و مولتی‌تسکینگ
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {specGroups.find((g) => g.title === 'رم')?.specs[0]?.value || 'حافظه رم بالا'} — اجرای همزمان چندین نرم‌افزار بدون کندی
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                      صفحه‌نمایش با کیفیت — تجربه بصری فوق‌العاده برای کار، تماشای فیلم و طراحی
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                      طراحی باریک و سبک — حمل آسان در کیف و کوله‌پشتی مناسب برای استفاده روزمره
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                      باتری با دوام بالا — شارژدهی طولانی برای کار در طول روز بدون نیاز به شارژر
                    </span>
                  </li>
                </ul>
              </div>

              {/* Professional Review */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-800 dark:bg-zinc-950">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">نقد و بررسی تخصصی</h2>
                <div className="text-sm leading-7 text-gray-600 dark:text-gray-400">
                  <p className="mb-3">
                    {product.title} یک انتخاب ایده‌آل برای{' '}
                    <strong className="text-gray-900 dark:text-white">
                      کاربرانی است که به دنبال ترکیبی از قدرت، کیفیت و قابلیت حمل هستند
                    </strong>
                    . این لپ‌تاپ با بهره‌گیری از جدیدترین تکنولوژی‌های روز دنیا، تجربه‌ای روان و لذت‌بخش را در اختیار شما قرار می‌دهد.
                  </p>
                  <AnimatePresence>
                    {(showFullDesc || product.description) && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="mb-3">
                          {product.description || `این لپ‌تاپ برای مصارف حرفه‌ای از جمله برنامه‌نویسی، طراحی گرافیک، ادیت ویدیو و اجرای نرم‌افزارهای سنگین طراحی شده است. صفحه‌نمایش با دقت رنگ بالا و رفرش‌ریت مناسب، تجربه بصری فوق‌العاده‌ای را فراهم می‌کند.`}
                        </p>
                        <p>
                          سیستم خنک‌کننده پیشرفته این محصول باعث می‌شود در استفاده‌های طولانی‌مدت، دمای دستگاه در محدوده مطلوب باقی بماند و از کاهش عملکرد جلوگیری شود. در مجموع، {product.title} یکی از بهترین گزینه‌های بازار در رده قیمتی خود محسوب می‌شود.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button onClick={() => setShowFullDesc(!showFullDesc)} className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-900 transition hover:underline dark:text-white">
                    {showFullDesc ? 'بستن' : 'ادامه مطلب'}
                    {showFullDesc ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Why us */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                  <ThumbsUp className="h-5 w-5" />
                  چرا دیجی‌استور؟
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600 dark:bg-green-900 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">ضمانت اصالت کالا و بهترین قیمت</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600 dark:bg-green-900 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">ارسال سریع به سراسر کشور</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600 dark:bg-green-900 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">پشتیبانی ۲۴ ساعته و مشاوره رایگان</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600 dark:bg-green-900 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">۷ روز ضمانت بازگشت بدون قید و شرط</span>
                  </li>
                </ul>
              </div>

              {/* Share */}
              <button onClick={() => { navigator.clipboard?.writeText(window.location.href) }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white p-4 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-800 dark:bg-zinc-950 dark:text-gray-400 dark:hover:bg-zinc-900">
                <Share2 className="h-4 w-4" />
                اشتراک‌گذاری محصول
              </button>
            </div>
          </div>
        </section>

        {/* ─── User Reviews ─── */}
        <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-800 dark:bg-zinc-950">
            <div className="mb-6 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-gray-900 dark:text-white" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                نظرات کاربران
              </h2>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500 dark:bg-zinc-800 dark:text-gray-400">
                {toPersianNumber(reviews.length)}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Rating Overview */}
              <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 p-6 dark:bg-zinc-900">
                <p className="text-5xl font-black text-gray-900 dark:text-white">
                  {toPersianNumber(Number(avgRating.toFixed(1)))}
                </p>
                <div className="mt-2 flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={cn(
                      'h-4 w-4',
                      star <= Math.round(avgRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600',
                    )} />
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  از {toPersianNumber(reviews.length)} نظر
                </p>
                <div className="mt-4 w-full space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingDistribution[star - 1] || 0
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-4 text-gray-500 dark:text-gray-400">{toPersianNumber(star)}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-700">
                          <div className="h-full rounded-full bg-yellow-400 transition-all" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="w-5 text-left text-gray-500 dark:text-gray-400">{toPersianNumber(count)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Review Form + List */}
              <div className="lg:col-span-2 space-y-6">
                {/* Form */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-zinc-900">
                  <h4 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">ثبت نظر شما</h4>
                  <div className="mb-3 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setReviewRating(star)}>
                        <Star className={cn(
                          'h-5 w-5 transition hover:scale-110',
                          star <= reviewRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600',
                        )} />
                      </button>
                    ))}
                  </div>
                  <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="نظر خود را بنویسید..." rows={3}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none transition focus:border-gray-900 dark:border-gray-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-gray-500" />
                  <button onClick={handleSubmitReview} disabled={!reviewText.trim() || reviewRating === 0}
                    className="mt-3 rounded-full bg-black px-6 py-2 text-xs font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    ثبت نظر
                  </button>
                </div>

                {/* Review list */}
                {reviews.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-6 text-center">
                    <MessageCircle className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">هنوز نظری ثبت نشده است.</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">اولین نفری باشید که نظر می‌دهید!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review, idx) => (
                      <div key={idx} className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-zinc-950">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600 dark:bg-zinc-700 dark:text-gray-300">
                              {review.name[0]}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{review.name}</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={cn(
                                'h-3.5 w-3.5',
                                star <= review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600',
                              )} />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Related Products ─── */}
        <RelatedProducts category={product.category} currentId={product._id} />
      </div>

      {/* ─── Sticky Mobile Buy Button ─── */}
      <div className="fixed bottom-0 right-0 left-0 z-40 border-t border-gray-200 bg-white/95 p-3 backdrop-blur-lg sm:hidden dark:border-gray-800 dark:bg-zinc-950/95">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-lg font-black text-gray-900 dark:text-white">{toPersianPrice(totalPrice)}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">تومان</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center overflow-hidden rounded-full border border-gray-300 dark:border-gray-700">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center text-sm font-bold transition hover:bg-gray-100 dark:hover:bg-zinc-800">
                <Minus className="h-3 w-3" />
              </button>
              <span className="flex h-9 w-10 items-center justify-center text-sm font-semibold">
                {toPersianNumber(quantity)}
              </span>
              <button onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center text-sm font-bold transition hover:bg-gray-100 dark:hover:bg-zinc-800">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button onClick={handleAddToCart}
              className="flex items-center gap-1.5 rounded-full bg-black px-6 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              <ShoppingCart className="h-4 w-4" />
              خرید
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Gallery Modal ─── */}
      <AnimatePresence>
        {showMobileGallery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-3xl bg-white dark:bg-zinc-950">
              <button onClick={() => setShowMobileGallery(false)}
                className="absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <img src={productImages[selectedImage]} alt="" className="max-h-[75vh] w-full object-contain" />
              <div className="flex gap-2 overflow-x-auto border-t border-gray-100 p-3 dark:border-gray-800">
                {productImages.map((img, idx) => (
                  <button key={idx} onClick={() => setSelectedImage(idx)}
                    className={cn(
                      'h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition',
                      selectedImage === idx ? 'border-gray-900 dark:border-white' : 'border-gray-200 opacity-60 dark:border-gray-700',
                    )}>
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  )
}

function RelatedProducts({ category, currentId }: { category: string; currentId: string }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`/api/products?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data.filter((p) => p._id !== currentId).slice(0, 4)))
      .catch(console.error)
  }, [category, currentId])

  if (products.length === 0) return null

  return (
    <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">محصولات مرتبط</h2>
        <a href={`/store?category=${encodeURIComponent(category)}`}
          className="flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          مشاهده همه
          <ChevronLeft className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((item) => (
          <a key={item._id} href={`/store/${item._id}`}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-zinc-950">
            <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900">
              <img src={item.image} alt={item.title} className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-44" />
            </div>
            <div className="mt-3">
              <span className="text-[10px] text-gray-500 dark:text-gray-400">{item.category}</span>
              <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="mt-1.5 text-sm font-bold text-gray-900 dark:text-white">{toPersianPrice(item.price)} تومان</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
