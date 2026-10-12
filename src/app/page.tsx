import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import Image from "next/image";
import { dataStore } from "@/lib/data-service";
import {
  Flame,
  Radio,
  Video,
  Camera,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

const trendingTopics = [
  { tag: "#অর্থনৈতিক_নীতিমালা", href: "/search?q=অর্থনীতি" },
  { tag: "#সেমিকন্ডাক্টর_তহবিল", href: "/search?q=প্রযুক্তি" },
  { tag: "#টি২০_বিশ্বকাপ", href: "/search?q=ক্রিকেট" },
  { tag: "#নির্বাচন_কমিশন", href: "/search?q=রাজনীতি" },
  { tag: "#জলবায়ু_সম্মেলন", href: "/search?q=আন্তর্জাতিক" },
  { tag: "#কান_উৎসব", href: "/search?q=চলচ্চিত্র" },
];

export default async function Home() {
  let mainNews: any[] = [];
  let otherSections: IOtherSection[] = [];

  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
      next: { revalidate: 180 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        const sections = data.data;
        mainNews = sections[0]?.articles || [];
        otherSections = sections.slice(1);
      }
    }
  } catch (err) {
    console.warn("Homepage sections fetch fallback:", err);
  }

  // Resilient fallback using dataStore if API is unreachable or returned empty
  const storeArticles = dataStore.getAllNews().filter((n) => n.status === "published");

  if (mainNews.length === 0) {
    mainNews = storeArticles.slice(0, 5).map((n) => ({
      id: n.id,
      title: n.title,
      description: n.description || n.summary || "",
      category: n.category,
      imageUrl: n.imageUrl,
      imageAlt: n.imageAlt || n.title,
    }));
  }

  if (otherSections.length === 0) {
    const categories = ["রাজনীতি", "অর্থনীতি", "প্রযুক্তি", "খেলা", "আন্তর্জাতিক"];
    otherSections = categories.map((cat, idx) => ({
      curationId: `sec-${idx}`,
      title: cat,
      articles: storeArticles
        .filter((n) => n.category === cat)
        .slice(0, 3)
        .map((n) => ({
          id: n.id,
          title: n.title,
          description: n.description || "",
          category: n.category,
          imageUrl: n.imageUrl,
          imageAlt: n.title,
        })),
    }));
  }

  const liveUpdates = dataStore.getLiveUpdates().slice(0, 3);
  const videos = dataStore.getVideos().slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Trending Topics Ticker Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-neutral-200 dark:border-neutral-800 text-xs">
        <div className="flex items-center gap-1 font-bold text-red-700 dark:text-red-400 shrink-0">
          <TrendingUp className="h-4 w-4" />
          <span>আলোচিত বিষয়:</span>
        </div>
        <div className="flex items-center gap-2">
          {trendingTopics.map((topic) => (
            <Link
              key={topic.tag}
              href={topic.href}
              className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-neutral-700 dark:text-neutral-300 hover:text-red-700 dark:hover:text-red-400 transition-colors shrink-0"
            >
              {topic.tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Grid: Hero + Lead + Most Read Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* News Section (Col-span 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Hero & Top Stories */}
          <MainNews news={mainNews} />

          {/* Live News Spotlight Banner */}
          <div className="bg-gradient-to-r from-red-950 to-neutral-900 border border-red-800/50 rounded-2xl p-5 text-white shadow-md">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <h3 className="font-extrabold text-base text-white">লাইভ নিউজ ডেস্ক</h3>
              </div>
              <Link
                href="/live"
                className="text-xs text-red-300 hover:text-white flex items-center gap-1 hover:underline"
              >
                <span>সব লাইভ আপডেট</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {liveUpdates.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 hover:border-red-700 transition-all"
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-amber-400 font-semibold">{item.time}</span>
                    <span className="bg-red-700/60 text-white text-[10px] px-1.5 py-0.2 rounded">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold line-clamp-2 text-neutral-100">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Categorized Sections */}
          <div className="space-y-10">
            {otherSections.map((os) => (
              <div key={os.curationId} className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-red-700 pb-2">
                  <h2 className="font-extrabold text-lg sm:text-xl text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 bg-red-700 rounded-sm"></span>
                    <span>{os.title}</span>
                  </h2>
                  <Link
                    href={`/category/${os.title.toLowerCase()}`}
                    className="text-xs font-bold text-red-700 dark:text-red-400 hover:underline flex items-center gap-1"
                  >
                    <span>আরও দেখুন</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {os.articles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Video Multimedia Spotlight */}
          <div className="bg-neutral-900 text-white rounded-2xl p-6 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-red-700 text-white">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ভিডিও প্ল্যাটফর্ম ও বিশেষ বুলেটিন</h3>
                  <p className="text-xs text-neutral-400">প্রতি মুহূর্তের ভিডিও চিত্র ও সরেজমিন প্রতিবেদন</p>
                </div>
              </div>
              <Link
                href="/videos"
                className="text-xs text-red-400 hover:text-white flex items-center gap-1"
              >
                <span>সব ভিডিও</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {videos.map((vid) => (
                <Link key={vid.id} href="/videos" className="group block space-y-2">
                  <div className="relative h-36 rounded-xl overflow-hidden bg-neutral-800">
                    <Image
                      src={vid.thumbnail}
                      alt={vid.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full bg-red-700/90 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Video className="h-5 w-5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] px-1.5 py-0.5 rounded text-white">
                      {vid.duration}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-100 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                    {vid.title}
                  </h4>
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>{vid.category}</span>
                    <span>{vid.views} দর্শন</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column (Col-span 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Most Read News Component */}
          <MostRead />

          {/* Special Opinion & Columnist Box */}
          <div className="bg-amber-50/60 dark:bg-neutral-800/60 border border-amber-200 dark:border-neutral-700 rounded-2xl p-4">
            <div className="flex items-center gap-2 pb-2 mb-3 border-b border-amber-200 dark:border-neutral-700">
              <MessageSquare className="h-4 w-4 text-amber-700" />
              <h3 className="font-extrabold text-sm text-neutral-900 dark:text-neutral-100">
                মতামত ও সম্পাদকীয়
              </h3>
            </div>
            <div className="space-y-3">
              <Link href="/news/news-bd-101" className="block group">
                <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400">
                  অর্থনীতি কলাম • ড. কামাল আহমেদ
                </span>
                <h4 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-red-600 transition-colors leading-snug">
                  ব্যাংকিং খাতে আস্থার সংকট দূর করতে কী করা জরুরি
                </h4>
              </Link>
              <div className="border-t border-amber-100 dark:border-neutral-700 pt-2" />
              <Link href="/news/news-bd-102" className="block group">
                <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400">
                  টেক অভিমত • সাইফুর রহমান
                </span>
                <h4 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-red-600 transition-colors leading-snug">
                  চতুর্থ শিল্প বিপ্লব ও বাংলাদেশের তরুণদের ভবিষ্যৎ
                </h4>
              </Link>
            </div>
          </div>

          {/* Premium Subscription CTA Card */}
          <div className="bg-gradient-to-br from-red-900 to-red-950 text-white rounded-2xl p-5 shadow-lg border border-red-800 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <h3 className="font-black text-base">বাংলা নিউজ২৪ প্রিমিয়াম</h3>
            </div>
            <p className="text-xs text-red-100 leading-relaxed">
              বিজ্ঞাপনমুক্ত অভিজ্ঞতা, বিশেষ অনুসন্ধানী প্রতিবেদন এবং প্রতিদিনের ই-পেপার পড়ার সুযোগ নিন মাত্র ৯৯ টাকায়।
            </p>
            <Link
              href="/subscription"
              className="btn btn-sm w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-bold border-none rounded-xl"
            >
              প্রিমিয়াম সদস্য হোন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
