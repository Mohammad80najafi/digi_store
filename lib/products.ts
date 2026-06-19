export type Product = {
  _id?: string
  id?: number
  title: string
  category: string
  price: number
  rating: number
  image: string
  description?: string
  specs?: { label: string; value: string }[]
  gallery?: string[]
}

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category ? `/api/products?category=${encodeURIComponent(category)}` : '/api/products'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const res = await fetch(`/api/products?id=${id}`)
  if (!res.ok) return null
  return res.json()
}

export function getRelatedProducts(products: Product[], currentProduct: Product): Product[] {
  return products.filter(
    (p) => p.category === currentProduct.category && p._id !== currentProduct._id,
  )
}
