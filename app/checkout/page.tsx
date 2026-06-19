import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/Navbar'
import Checkout from '@/components/checkout/Checkout'

export const metadata = {
  title: 'تکمیل خرید',
}

const CheckoutPage = () => {
  return (
    <main className="relative">
      <div className="fixed top-4 right-0 left-0 z-50 px-4">
        <Navbar />
      </div>
      <Checkout />
      <Footer />
    </main>
  )
}

export default CheckoutPage
