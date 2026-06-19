'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  Truck,
  CheckCircle,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Lock,
} from 'lucide-react'
import { useCart } from '@/store/cart'
import { useOrders } from '@/store/orders'
import { cn } from '@/lib/cn'
import { toPersianPrice, toPersianNumber } from '@/lib/price'

type FormData = {
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  postalCode: string
  note: string
}

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white'

export default function Checkout() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const addOrder = useOrders((s) => s.addOrder)
  const [step, setStep] = useState<'info' | 'confirm' | 'done'>('info')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    note: '',
  })

  const shipping = items.length > 0 ? 0 : 0
  const tax = Math.round(totalPrice() * 0.09)
  const finalTotal = totalPrice() + shipping + tax

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('confirm')
  }

  const handlePlaceOrder = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            _id: i._id,
            title: i.title,
            price: i.price,
            image: i.image,
            quantity: i.quantity,
          })),
          total: finalTotal,
          address: `${formData.address}, ${formData.city}`,
        }),
      })
      const data = await res.json()
      addOrder({
        items: items.map((i) => ({
          _id: i._id,
          title: i.title,
          price: i.price,
          image: i.image,
          quantity: i.quantity,
        })),
        total: finalTotal,
        address: `${formData.address}, ${formData.city}`,
      })
      setStep('done')
      clearCart()
    } catch (error) {
      console.error('Failed to place order:', error)
    }
  }

  if (items.length === 0 && step !== 'done') {
    return (
      <div dir="rtl" className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4 dark:bg-black">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800">
          <CreditCard className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          سبد خرید شما خالی است
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          ابتدا محصولی به سبد خرید اضافه کنید.
        </p>
        <Link
          href="/store"
          className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          رفتن به فروشگاه
        </Link>
      </div>
    )
  }

  if (step === 'done') {
    return (
      <div dir="rtl" className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4 dark:bg-black">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          <CheckCircle className="h-20 w-20 text-green-500" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          سفارش شما ثبت شد!
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          سفارش شما با موفقیت ثبت شد و به زودی ارسال خواهد شد.
        </p>
        <Link
          href="/store"
          className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          ادامه خرید
        </Link>
      </div>
    )
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 px-4 pt-28 pb-16 dark:bg-black">
      <div className="mx-auto max-w-7xl">
        {/* Steps indicator */}
        <div className="mb-10 flex items-center justify-center gap-4">
          <StepIndicator
            number={1}
            label="اطلاعات ارسال"
            active={step === 'info'}
            done={step === 'confirm'}
          />
          <div className="h-0.5 w-12 bg-gray-200 dark:bg-gray-700" />
          <StepIndicator
            number={2}
            label="تایید سفارش"
            active={step === 'confirm'}
            done={false}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left: Form or Confirmation */}
          <div>
            {step === 'info' ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmitInfo}
                className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-zinc-950"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  اطلاعات ارسال
                </h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <User className="h-4 w-4" />
                      نام
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="نام"
                    />
                  </div>
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <User className="h-4 w-4" />
                      نام خانوادگی
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="نام خانوادگی"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Phone className="h-4 w-4" />
                    شماره تماس
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    dir="ltr"
                    className={inputClass}
                    placeholder="0912xxxxxxx"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <MapPin className="h-4 w-4" />
                    آدرس
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className={cn(inputClass, 'resize-none')}
                    placeholder="آدرس کامل ارسال"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      شهر
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="شهر"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      کد پستی
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      dir="ltr"
                      className={inputClass}
                      placeholder="XXXXXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    توضیحات سفارش
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={2}
                    className={cn(inputClass, 'resize-none')}
                    placeholder="توضیحات احتمالی (اختیاری)"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    مرحله بعد
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-zinc-950"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  تایید اطلاعات
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoRow label="نام" value={`${formData.firstName} ${formData.lastName}`} />
                  <InfoRow label="شماره تماس" value={formData.phone} />
                  <InfoRow label="شهر" value={formData.city} />
                  <InfoRow label="کد پستی" value={formData.postalCode || '—'} />
                </div>
                <InfoRow label="آدرس" value={formData.address} />
                {formData.note && <InfoRow label="توضیحات" value={formData.note} />}

                <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/30">
                  <Truck className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    ارسال سفارشات رایگان است.
                  </p>
                </div>

                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => setStep('info')}
                    className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-zinc-900"
                  >
                    بازگشت
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    <Lock className="h-4 w-4" />
                    ثبت سفارش
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-zinc-950">
              <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                خلاصه سفارش
              </h2>

              <div className="max-h-72 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-3 rounded-xl bg-gray-50 p-3 dark:bg-zinc-900"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-zinc-800">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-zinc-800"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-5 text-center text-xs font-semibold">
                            {toPersianNumber(item.quantity)}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-zinc-800"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">
                          {toPersianPrice(item.price * item.quantity)} تومان
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3 border-t border-gray-200 pt-5 dark:border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">جمع کل</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {toPersianPrice(totalPrice())} تومان
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">مالیات (۹٪)</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {toPersianPrice(tax)} تومان
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">ارسال</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    رایگان
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3 dark:border-gray-800">
                  <span className="text-base font-bold text-gray-900 dark:text-white">
                    مبلغ قابل پرداخت
                  </span>
                  <span className="text-lg font-black text-gray-900 dark:text-white">
                    {toPersianPrice(finalTotal)} تومان
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StepIndicator({
  number,
  label,
  active,
  done,
}: {
  number: number
  label: string
  active: boolean
  done: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition',
          done
            ? 'bg-green-500 text-white'
            : active
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
        )}
      >
        {done ? <CheckCircle className="h-4 w-4" /> : number}
      </div>
      <span
        className={cn(
          'text-sm font-medium',
          active || done ? 'text-gray-900 dark:text-white' : 'text-gray-400',
        )}
      >
        {label}
      </span>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
  )
}
