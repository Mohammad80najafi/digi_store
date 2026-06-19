'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/footer'
import ProductDetail from '@/components/products/ProductDetail'

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

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/products?id=${id}`)
      .then((res) => {
        if (!res.ok) return null
        return res.json()
      })
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <>
        <div className="fixed top-4 right-0 left-0 z-50 px-4">
          <Navbar />
        </div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />
        </div>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <div className="fixed top-4 right-0 left-0 z-50 px-4">
          <Navbar />
        </div>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">محصول پیدا نشد.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="fixed top-4 right-0 left-0 z-50 px-4">
        <Navbar />
      </div>
      <ProductDetail product={product} />
      <Footer />
    </>
  )
}
