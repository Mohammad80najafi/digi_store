import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/Navbar'
import Profile from '@/components/profile/Profile'

export const metadata = {
  title: 'پروفایل',
}

const ProfilePage = () => {
  return (
    <main className="relative">
      <div className="fixed top-4 right-0 left-0 z-50 px-4">
        <Navbar />
      </div>
      <Profile />
      <Footer />
    </main>
  )
}

export default ProfilePage
