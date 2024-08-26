import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/ui/navbar/Navbar';
import ReduxProvider from '@/redux/Provider';
import { Toaster } from 'react-hot-toast';

const vazir = Vazirmatn({ subsets: ['arabic'] });

export const metadata: Metadata = {
  title: 'Digi Shop',
  description: 'a simple shopping app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <ReduxProvider>
        <html lang='fa-IR' dir='rtl'>
          <body className={vazir.className}>
            <div>
              <Navbar />
              <Toaster position='top-center' reverseOrder={false} />
              {children}
            </div>
          </body>
        </html>
      </ReduxProvider>
    </SessionProvider>
  );
}
