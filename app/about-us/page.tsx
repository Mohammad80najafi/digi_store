import AboutUs from '@/components/about/AboutUs'
import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/Navbar'

export const metadata = {
  title: 'درباره ما',
}

const AboutPage = () => {
  return (
    <main className="relative">
      <div className="fixed top-4 right-0 left-0 z-50 px-4">
        <Navbar />
      </div>
      <AboutUs />
      <Footer />
    </main>
  )
}

export default AboutPage
