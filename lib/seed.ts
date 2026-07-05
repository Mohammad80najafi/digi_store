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
    description:
      'کفش نایکی ایر مکس با طراحی مدرن و راحتی بی‌نظیر، انتخابی ایده‌آل برای استفاده روزمره و ورزشی است.',
    specs: [
      { label: 'برند', value: 'Nike' },
      { label: 'جنس رویه', value: 'مش و چرم مصنوعی' },
      { label: 'جنس زیره', value: 'foam + Air Max' },
      { label: 'مناسب برای', value: 'استفاده روزمره و ورزشی' },
      { label: 'رنگ', value: 'مشکی/سفید' },
    ],
    gallery: [
      '/images/products/laptops/1.webp',
      '/images/products/laptops/2.webp',
      '/images/products/laptops/3.webp',
    ],
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
    email: 'najafimohammad2808@gmail.com',
    workingHours: 'شنبه تا پنجشنبه ۹ صبح الی ۹ شب',
    siteName: 'دیجی‌استور',
    siteDescription: 'فروشگاه آنلاین محصولات دیجیتال و لوازم جانبی',
    aboutUs:
      'دیجی‌استور با بیش از ۱۰ سال تجربه در زمینه فروش محصولات دیجیتال، همواره تلاش کرده تا بهترین محصولات با کیفیت و قیمت مناسب را در اختیار مشتریان خود قرار دهد. ما با تیمی حرفه‌ای و متخصص، انتخاب و خرید آنلاین را برای شما آسان می‌کنیم.',
    mission:
      'ارائه بهترین تجربه خرید آنلاین با تمرکز بر کیفیت، قیمت مناسب و رضایت مشتری.',
    values: ['کیفیت', 'اعتماد', 'نوآوری', 'رضایت مشتری'],
    team: [
      {
        name: 'محمد نجفی',
        role: 'Frontend Developer',
        image: '/images/team/1.webp',
      },
    ],
  },
}

const users = [
  {
    email: 'admin@gmail.com',
    password: 'admin1234',
    role: 'admin',
  },
  {
    email: 'user@gmail.com',
    password: 'user123',
    role: 'user',
  },
]

async function seed() {
  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db(MONGODB_DB)

  await db.collection('products').deleteMany({})
  await db.collection('banners').deleteMany({})
  await db.collection('brands').deleteMany({})
  await db.collection('settings').deleteMany({})
  await db.collection('users').deleteMany({})

  await db.collection('products').insertMany(products)
  await db.collection('banners').insertMany(banners)
  await db.collection('brands').insertMany(brands)
  await db.collection('settings').insertOne(siteSettings)
  await db.collection('users').insertMany(users)

  console.log('Database seeded successfully!')
  await client.close()
}

seed().catch(console.error)
