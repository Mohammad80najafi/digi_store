import PromoBanners from '@/components/advertise/ProBanner'
import LaptopsSlider from '@/components/category/laptops/LaptopCategory'
import ProductSlider from '@/components/category/phones/PhonesCategory'
import Footer from '@/components/footer/footer'
import HeroSection from '@/components/hero/Hero'
import Navbar from '@/components/navbar/Navbar'
import SelectedBrands from '@/components/topBrands/TopBrands'

const HomePage = () => {
  return (
    <>
      <main className="relative">
        <div className="fixed top-4 right-0 left-0 z-50 px-4">
          <Navbar />
        </div>

        <HeroSection />
        <ProductSlider />
        <PromoBanners />
        <LaptopsSlider />
        <SelectedBrands />
        <Footer />
      </main>
    </>
  )
}

export default HomePage
