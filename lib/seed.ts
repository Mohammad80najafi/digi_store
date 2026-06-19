import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'digistore'

const products = [
  {
    title: 'کفش نایکی ایر مکس',
    category: 'کفش',
    price: 149,
    rating: 4.8,
    image: '/images/products/laptops/1.webp',
    description: 'کفش نایکی ایر مکس با طراحی مدرن و راحتی بی‌نظیر، انتخابی ایده‌آل برای استفاده روزمره و ورزشی است.',
    specs: [
      { label: 'برند', value: 'Nike' },
      { label: 'جنس رویه', value: 'مش و چرم مصنوعی' },
      { label: 'جنس زیره', value: 'foam + Air Max' },
      { label: 'مناسب برای', value: 'استفاده روزمره و ورزشی' },
      { label: 'رنگ', value: 'مشکی/سفید' },
    ],
    gallery: ['/images/products/laptops/1.webp', '/images/products/laptops/2.webp', '/images/products/laptops/3.webp'],
  },
  {
    title: 'کفش اسپرت آدیداس',
    category: 'کفش',
    price: 120,
    rating: 4.6,
    image: '/images/products/laptops/2.webp',
    description: 'کفش اسپرت آدیداس با طراحی اسپرت و راحتی بالا، مناسب برای ورزش و پیاده‌روی روزانه است.',
    specs: [
      { label: 'برند', value: 'Adidas' },
      { label: 'جنس رویه', value: 'مش' },
      { label: 'جنس زیره', value: 'لاستیک' },
      { label: 'رنگ', value: 'سرمه‌ای' },
    ],
    gallery: ['/images/products/laptops/2.webp', '/images/products/laptops/1.webp'],
  },
  {
    title: 'ساعت کلاسیک مشکی',
    category: 'اکسسوری',
    price: 89,
    rating: 4.7,
    image: '/images/products/laptops/3.webp',
    description: 'ساعت کلاسیک مشکی با طراحی ظریف و شیک، مناسب برای ست کردن با انواع لباس‌های رسمی و اسپرت.',
    specs: [
      { label: 'برند', value: 'Classic' },
      { label: 'نوع مکانیزم', value: 'کوارتز' },
      { label: 'بند', value: 'چرم مشکی' },
      { label: 'مقاومت در برابر آب', value: '3ATM' },
    ],
    gallery: ['/images/products/laptops/3.webp', '/images/products/laptops/4.webp'],
  },
  {
    title: 'کیف سفید مینیمال',
    category: 'کیف',
    price: 99,
    rating: 4.5,
    image: '/images/products/laptops/4.webp',
    description: 'کیف سفید مینیمال با طراحی ساده و شیک، فضای کافی برای حمل لوازم ضروری روزانه فراهم می‌کند.',
    specs: [
      { label: 'جنس', value: 'چرم مصنوعی' },
      { label: 'ابعاد', value: '30 × 25 × 10 سانتی‌متر' },
      { label: 'تعداد جیب', value: '3' },
      { label: 'رنگ', value: 'سفید' },
    ],
    gallery: ['/images/products/laptops/4.webp', '/images/products/laptops/5.webp'],
  },
  {
    title: 'هودی اسپرت',
    category: 'پوشاک',
    price: 75,
    rating: 4.4,
    image: '/images/products/laptops/5.webp',
    description: 'هودی اسپرت با پارچه نرم و راحت، مناسب برای استفاده در روزهای سرد و فصول پاییز و زمستان.',
    specs: [
      { label: 'جنس', value: 'نخ و پلی‌استر' },
      { label: 'سایز', value: 'M / L / XL' },
      { label: 'رنگ', value: 'طوسی' },
      { label: 'قابلیت شستشو', value: 'ماشینی' },
    ],
    gallery: ['/images/products/laptops/5.webp', '/images/products/laptops/6.webp'],
  },
  {
    title: 'عینک آفتابی پریمیوم',
    category: 'اکسسوری',
    price: 60,
    rating: 4.3,
    image: '/images/products/laptops/6.webp',
    description: 'عینک آفتابی پریمیوم با لنز UV400 و فریم فلزی سبک، محافظت کامل از چشم‌ها در برابر اشعه مضر آفتاب.',
    specs: [
      { label: 'نوع لنز', value: 'UV400' },
      { label: 'جنس فریم', value: 'فلزی' },
      { label: 'رنگ لنز', value: 'مشکی' },
      { label: 'وزن', value: '28 گرم' },
    ],
    gallery: ['/images/products/laptops/6.webp', '/images/products/laptops/1.webp'],
  },
]

const banners = [
  {
    image: '/images/banner/1.webp',
    title: 'ژوپیتر',
    subtitle: 'انتخابی اقتصادی بر مدار نیازهای تو!',
    brand: 'J U P I T E R',
    button: 'خرید',
  },
  {
    image: '/images/banner/2.webp',
    title: 'تابستون تو راهه!',
    subtitle: 'خرید کتاب به راهه!',
    button: 'شروع خرید',
  },
  {
    image: '/images/banner/4.webp',
    title: 'تابستون تو راهه!',
    subtitle: 'خرید هارد و فلش به راهه!',
    button: 'شروع خرید',
  },
]

const brands = [
  { name: 'Huawei', logo: '/images/brands/huawei.webp' },
  { name: 'JBL', logo: '/images/brands/adata.webp' },
  { name: 'Nokia', logo: '/images/brands/nokia.webp' },
  { name: 'Asus', logo: '/images/brands/asus.webp' },
  { name: 'Apple', logo: '/images/brands/apple.webp' },
  { name: 'Xiaomi', logo: '/images/brands/xiaomi.webp' },
  { name: 'Samsung', logo: '/images/brands/samsung.webp' },
]

const siteSettings = {
  key: 'site-settings',
  data: {
    address: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۳، طبقه سوم',
    phone: '021-88776655',
    email: 'info@digistore.ir',
    workingHours: 'شنبه تا پنجشنبه ۹ صبح الی ۹ شب',
    siteName: 'دیجی‌استور',
    siteDescription: 'فروشگاه آنلاین محصولات دیجیتال و لوازم جانبی',
    aboutUs: 'دیجی‌استور با بیش از ۱۰ سال تجربه در زمینه فروش محصولات دیجیتال، همواره تلاش کرده تا بهترین محصولات با کیفیت و قیمت مناسب را در اختیار مشتریان خود قرار دهد. ما با تیمی حرفه‌ای و متخصص، انتخاب و خرید آنلاین را برای شما آسان می‌کنیم.',
    mission: 'ارائه بهترین تجربه خرید آنلاین با تمرکز بر کیفیت، قیمت مناسب و رضایت مشتری.',
    values: ['کیفیت', 'اعتماد', 'نوآوری', 'رضایت مشتری'],
    team: [
      { name: 'علی محمدی', role: 'مدیرعامل', image: '/images/team/1.webp' },
      { name: 'سارا احمدی', role: 'مدیر فروش', image: '/images/team/2.webp' },
      { name: 'رضا کریمی', role: 'مدیر فنی', image: '/images/team/3.webp' },
    ],
  },
}

async function seed() {
  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db(MONGODB_DB)

  await db.collection('products').deleteMany({})
  await db.collection('banners').deleteMany({})
  await db.collection('brands').deleteMany({})
  await db.collection('settings').deleteMany({})

  await db.collection('products').insertMany(products)
  await db.collection('banners').insertMany(banners)
  await db.collection('brands').insertMany(brands)
  await db.collection('settings').insertOne(siteSettings)

  console.log('Database seeded successfully!')
  await client.close()
}

seed().catch(console.error)
