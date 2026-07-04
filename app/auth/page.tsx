import type { Metadata } from 'next'

import LoginCard from '@/components/login/PurpleLoginCard'

export const metadata: Metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return <LoginCard />
}
