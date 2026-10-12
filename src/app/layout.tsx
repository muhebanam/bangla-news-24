import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { Toaster } from "react-hot-toast";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "বাংলা নিউজ২৪ | নির্ভীক ও বস্তুনিষ্ঠ সার্বক্ষণিক ডিজিটাল সংবাদ",
  description:
    "Bangla News 24 - রাজনীতি, অর্থনীতি, খেলাধুলা, আন্তর্জাতিক ও তথ্যপ্রযুক্তির সর্বশেষ ও নির্ভরযোগ্য সংবাদ পোর্টাল।",
  keywords: [
    "বাংলা সংবাদ",
    "বাংলাদেশ খবর",
    "Bangla News 24",
    "ব্রেকিং নিউজ",
    "রাজনীতি",
    "অর্থনীতি",
    "আন্তর্জাতিক",
  ],
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#dc2626",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors pb-14 md:pb-0">
        <Header />
        <Marquee />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
        <MobileNav />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
