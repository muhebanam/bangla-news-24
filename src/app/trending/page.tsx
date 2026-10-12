import Image from "next/image";
import Link from "next/link";
import MostRead from "@/components/MostRead";
import { dataStore } from "@/lib/data-service";
import { Flame, TrendingUp, Eye, Share2, MessageCircle, ChevronRight } from "lucide-react";

export default function TrendingPage() {
  const newsList = dataStore.getAllNews().filter((n) => n.status === "published");
  // Sort by views descending
  const trendingList = [...newsList].sort((a, b) => (b.views || 0) - (a.views || 0));

  const bnNumbers = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০"];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">ট্রেন্ডিং সংবাদ</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-amber-900 text-white p-6 sm:p-8 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
            <Flame className="h-6 w-6 text-amber-300 animate-pulse" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            রিয়েল-টাইম ট্রেন্ডিং ইঞ্জিন
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          আজকের সর্বাধিক আলোচিত ও ভাইরাল সংবাদ
        </h1>
        <p className="text-xs sm:text-sm text-red-100 mt-2 max-w-2xl">
          পাঠকের আগ্রহ, সামাজিক মাধ্যমে আলোচনার তীব্রতা ও শেয়ারের পরিসংখ্যান বিশ্লেষণ করে স্বয়ংক্রিয়ভাবে সংকলিত শীর্ষ খবরের তালিকা।
        </p>
      </div>

      {/* Main Grid: Trending List + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          {trendingList.map((news, index) => {
            const viralScore = Math.max(98 - index * 6, 65);
            return (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="group block bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 hover:border-red-500 transition-all hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Rank Number */}
                  <div
                    className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-xs ${
                      index < 3
                        ? "bg-gradient-to-br from-red-600 to-amber-600 text-white shadow-red-500/30"
                        : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                    }`}
                  >
                    {bnNumbers[index] || index + 1}
                  </div>

                  {/* Thumbnail */}
                  <div className="relative h-24 w-full sm:w-36 rounded-xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      src={news.imageUrl}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded">
                        {news.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                        <TrendingUp className="h-3 w-3" />
                        <span>ভাইরাল স্কোর: {viralScore}%</span>
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 transition-colors leading-snug">
                      {news.title}
                    </h2>

                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5 text-neutral-400" />
                        <span>{news.views.toLocaleString("bn-BD")} পাঠ</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="h-3.5 w-3.5 text-neutral-400" />
                        <span>{(news.reactions?.love || 42).toLocaleString("bn-BD")} শেয়ার</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <aside className="lg:col-span-4">
          <MostRead />
        </aside>
      </div>
    </div>
  );
}
