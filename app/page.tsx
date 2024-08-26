import Hero from '@/components/ui/hero/Hero';
import Banner from '@/components/ui/banner/Banner';
import Products from '@/components/ui/products/Products';
import Category from '@/components/ui/category/Category';
import Category2 from '@/components/ui/category/Category2';
import BestSale from '@/components/ui/best-sale/best-sale';
import Services from '@/components/ui/services/services';
import Blog from '@/components/ui/blog/blog';
import Partners from '@/components/ui/partners/partners';
import Footer from '@/components/ui/footer/Footer';
export default function Home() {
  return (
    <div className='overflow-hidden bg-white duration-200 dark:bg-gray-900 dark:text-gray-300'>
      <Hero />
      <Banner />
      {/* <Category /> */}
      <Category2 />
      <Services />
      <Products />
      {/* <BestSale /> */}
      <Blog />
      <Partners />
      <Footer />
    </div>
  );
}
