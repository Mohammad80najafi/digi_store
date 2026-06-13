'use client'
export default function ProductCard({
  image = '/banner/2.webp',
  category = 'Sneakers',
  title = 'Nike Air Max Pulse',
  description = 'Comfortable everyday sneakers with a lightweight design and premium finish.',
  price = '$149.00',
  rating = '4.8',
}) {
  return (
    <div className="group w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-black">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
        <img
          src={image}
          alt={title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <button
          type="button"
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition hover:scale-110 dark:bg-black dark:text-white"
          aria-label="Add to wishlist"
        >
          ♥
        </button>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-300">
            {category}
          </span>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            ⭐ {rating}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-950 dark:text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">قیمت</p>
            <p className="text-2xl font-bold text-gray-950 dark:text-white">
              {price}
            </p>
          </div>

          <button className="cursor-pointer rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            خرید
          </button>
        </div>
      </div>
    </div>
  )
}
