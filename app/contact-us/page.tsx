import ContactUs from '@/components/contact/ContactUs'
import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/Navbar'

export const metadata = {
  title: 'تماس با ما',
}

const ContactPage = () => {
  return (
    <main className="relative">
      <div className="fixed top-4 right-0 left-0 z-50 px-4">
        <Navbar />
      </div>
      <ContactUs />
      <Footer />
    </main>
  )
}

export default ContactPage
