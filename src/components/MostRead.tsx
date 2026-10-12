import Link from "next/link";
import Image from "next/image";
import { TrendingUp, Flame } from "lucide-react";
import { dataStore } from "@/lib/data-service";

interface MostReadNews {
  id: string;
  title: string;
}

const fallbackMostRead: MostReadNews[] = [
  { id: "news-bd-103", title: "টি-টোয়েন্টি বিশ্বকাপ প্রস্তুতি: নাটকীয় জয়ে সিরিজ নিশ্চিত করল বাংলাদেশ" },
  { id: "news-bd-101", title: "বাংলাদেশ ব্যাংকের নতুন আর্থিক নীতিমালা: রিজার্ভ বৃদ্ধি ও মূল্যস্ফীতি নিয়ন্ত্রণে কঠোর নির্দেশনা" },
  { id: "news-bd-105", title: "নির্বাচন কমিশনের রোডম্যাপ: স্বচ্ছ ভোটার তালিকা প্রণয়ন ও সীমানা পুনর্নির্ধারণ কার্যক্রম শুরু" },
  { id: "news-bd-102", title: "আইসিটি খাতের যুগান্তকারী অগ্রগতি: দেশীয় সেমিকন্ডাক্টরে ৫০০ কোটি টাকার নতুন তহবিল" },
  { id: "news-bd-106", title: "কান চলচ্চিত্র উৎসবে প্রশংসিত বাংলাদেশি চলচ্চিত্র: লাল গালিচায় দেশের পতাকা" },
];

const MostRead = async () => {
  let news: MostReadNews[] = [];

  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read", {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.data && Array.isArray(data.data)) {
        news = data.data;
      }
    }
  } catch (err) {
    console.warn("Most read fetch fallback:", err);
  }

  if (news.length === 0) {
    news = fallbackMostRead;
  }

  const bnNumbers = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০"];
  const ad = dataStore.getAdByPlacement("sidebar_box");

  return (
    <div className="space-y-6">
      {/* Most Read Card */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-red-700">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-600 animate-pulse" />
            <h2 className="font-extrabold text-base text-neutral-900 dark:text-neutral-100">
              সর্বাধিক পঠিত
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-full">
            ২৪ ঘণ্টা
          </span>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-700/60">
          {news.slice(0, 7).map((n, i) => (
            <Link
              key={n.id}
              href={`/news/${n.id}`}
              className="group py-3 flex gap-3 items-start first:pt-0 last:pb-0 transition-colors"
            >
              <div
                className={`h-7 w-7 rounded-lg flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
                  i < 3
                    ? "bg-red-700 text-white shadow-red-700/30"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                }`}
              >
                {bnNumbers[i] || i + 1}
              </div>

              <h3 className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-2">
                {n.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Sidebar Ad Placement */}
      {ad && (
        <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-3 text-center">
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest block mb-1.5">
            — বিজ্ঞাপন —
          </span>
          <a href={ad.targetUrl} target="_blank" rel="noreferrer" className="block relative h-56 rounded-xl overflow-hidden group">
            <Image
              src={ad.imageUrl}
              alt={ad.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
              <span className="text-xs font-bold text-white text-left drop-shadow-md">
                {ad.title}
              </span>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default MostRead;
