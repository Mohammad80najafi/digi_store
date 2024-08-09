import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/ui/navbar/Navbar";

const vazir = Vazirmatn({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Digi Shop",
  description: "a simple shopping app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="fa-IR" dir="rtl">
        <body className={vazir.className}>
          <div>
            <Navbar />
            {children}
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
