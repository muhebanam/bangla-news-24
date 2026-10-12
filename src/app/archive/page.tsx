import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { dataStore } from "@/lib/data-service";
import { Archive, Calendar, ChevronRight } from "lucide-react";

export default function ArchivePage() {
  const allNews = dataStore.getAllNews().filter((n) => n.status === "published");

  const years = ["২০২৬", "২০২৫", "২০২৪"];
  const months = ["অক্টোবর", "সেপ্টেম্বর", "আগস্ট", "জুলাই", "জুন", "মে", "এপ্রিল", "মার্চ", "ফেব্রুয়ারি", "জানুয়ারি"];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">সংবাদ আর্কাইভ</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-red-950 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-2">
        <div className="flex items-center gap-2 text-red-400">
          <Archive className="h-6 w-6" />
          <span className="text-xs font-bold uppercase tracking-widest">জ্ঞানভাণ্ডার ও ঐতিহাসিক রেকর্ড</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">বাংলা নিউজ২৪ ঐতিহাসিক সংবাদ সংগ্রহশালা</h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
          তারিখ ও বছর অনুযায়ী পুরনো সব প্রতিবেদন ও বিশ্লেষণের ডিজিটাল আর্কাইভ।
        </p>
      </div>

      {/* Filters Strip */}
      <div className="bg-white dark:bg-neutral-800 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
          <Calendar className="h-4 w-4 text-red-600" />
          <span>বছর নির্বাচন:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {years.map((y, idx) => (
            <button
              key={y}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                idx === 0
                  ? "bg-red-700 text-white shadow-xs"
                  : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700/60 flex flex-wrap gap-1.5">
          {months.map((m, idx) => (
            <button
              key={m}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                idx === 0
                  ? "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-900"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Archived Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {allNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
}
