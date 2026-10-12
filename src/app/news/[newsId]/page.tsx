import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dataStore } from "@/lib/data-service";
import ArticleActions from "@/components/ArticleActions";
import CommentsSection from "@/components/CommentsSection";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import {
  Clock,
  User,
  Calendar,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Tag,
} from "lucide-react";

interface NewsDetailsProps {
  params: Promise<{ newsId: string }>;
}

export default async function NewsDetails({ params }: NewsDetailsProps) {
  const { newsId } = await params;

  let news: any = null;

  // 1. Check local data store first if it matches local ID pattern
  const localArticle = dataStore.getNewsById(newsId);
  if (localArticle) {
    news = localArticle;
  } else {
    // 2. Fetch from remote BBC API
    try {
      const res = await fetch(`https://news-api-v2.vercel.app/api/article/${newsId}`, {
        next: { revalidate: 300 },
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.data) {
          news = data.data;
        }
      }
    } catch (err) {
      console.warn("Remote article fetch failed, falling back to local news:", err);
    }
  }

  // Fallback to first available local article if still not found
  if (!news) {
    news = dataStore.getAllNews()[0];
  }

  if (!news) {
    notFound();
  }

  // Normalize article text/content
  let articleText = news.content || news.text || "";
  if (!articleText && news.description) {
    articleText = typeof news.description === "string" ? news.description : "";
  }

  const categoryTitle =
    typeof news.category === "string"
      ? news.category
      : news.topics?.[0]?.name || "জাতীয়";

  const authorName =
    news.author?.name || news.byline || "বিশেষ প্রতিনিধি, বাংলা নিউজ২৪";

  const publishDate = news.firstPublished || news.publishedAt || new Date().toISOString();
  const formattedDate = new Date(publishDate).toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const featuredImg =
    news.imageUrl ||
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80";

  // Related news
  const relatedNews = dataStore
    .getAllNews()
    .filter((n) => n.id !== newsId)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/category/${encodeURIComponent(categoryTitle.toLowerCase())}`} className="hover:text-red-700">
          {categoryTitle}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-800 dark:text-neutral-300 font-medium truncate max-w-xs sm:max-w-md">
          {news.title}
        </span>
      </nav>

      {/* Main Grid: Article Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Article Body (Col-span 8) */}
        <article className="lg:col-span-8 space-y-6">
          {/* Header & Meta */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-md">
                {categoryTitle}
              </span>
              {news.isBreaking && (
                <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-md animate-pulse">
                  ব্রেকিং নিউজ
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 dark:text-neutral-100 leading-tight">
              {news.title}
            </h1>

            {/* Author Byline & Published Date */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-red-100 dark:bg-neutral-800 text-red-700 flex items-center justify-center font-bold">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100 block">
                    {authorName}
                  </span>
                  <span className="text-[11px] text-neutral-500">বাংলা নিউজ২৪ নিউজরুম</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                  <span>প্রকাশ: {formattedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-neutral-400" />
                  <span>৩ মিনিট পাঠ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <Image
                src={featuredImg}
                alt={news.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
            <p className="text-xs text-neutral-500 italic text-center">
              {news.imageCaption || news.imageAlt || `ছবি: সংগৃহীত • বাংলা নিউজ২৪`}
            </p>
          </div>

          {/* Interactive Tools: Audio Reader, Font Adjuster, Share, Reactions */}
          <ArticleActions
            articleId={news.id || newsId}
            title={news.title}
            textToRead={articleText}
            initialReactions={news.reactions}
          />

          {/* AI Executive Summary Card */}
          <div className="bg-gradient-to-r from-red-50 to-amber-50 dark:from-neutral-900 dark:to-neutral-850 p-5 rounded-2xl border-l-4 border-red-700 shadow-xs space-y-2">
            <div className="flex items-center gap-1.5 text-red-700 dark:text-red-400 font-bold text-sm">
              <Sparkles className="h-4 w-4" />
              <span>এআই নিউজরুম সামারি • সংক্ষেপে খবর</span>
            </div>
            <ul className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>{news.summary || news.title} সংক্রান্ত সর্বশেষ তথ্য ও সার্বিক পর্যালোচনা।</li>
              <li>সংশ্লিষ্ট দপ্তর ও বিশেষজ্ঞদের প্রতিক্রিয়া এবং নীতিগত সিদ্ধান্তের প্রভাব।</li>
              <li>সার্বক্ষণিক আপডেটের জন্য চোখ রাখুন বাংলা নিউজ২৪ পোর্টালে।</li>
            </ul>
          </div>

          {/* Main Article Body */}
          <div className="prose dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200 text-base sm:text-lg leading-relaxed space-y-4">
            {articleText ? (
              articleText.split("\n\n").map((para: string, pIdx: number) => (
                <p key={pIdx} className="leading-relaxed">
                  {para}
                </p>
              ))
            ) : (
              <p>
                দেশের অর্থনৈতিক ও সার্বিক পরিস্থিতি পর্যালোচনা করে সংশ্লিষ্ট দায়িত্বশীল প্রতিনিধিরা প্রয়োজনীয় নীতিমালা প্রণয়ন করেছেন। এ বিষয়ে অংশীজনদের সাথে নিয়মিত মতবিনিময় করা হচ্ছে এবং পরবর্তী পদক্ষেপের অগ্রগতি জানানো হবে।
              </p>
            )}
          </div>

          {/* Article Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-neutral-500 flex items-center gap-1">
              <Tag className="h-3.5 w-3.5" />
              <span>টপিক:</span>
            </span>
            {(news.tags || [categoryTitle, "বাংলাদেশ", "সংবাদ"]).map((tag: string, tIdx: number) => (
              <Link
                key={tIdx}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-neutral-700 dark:text-neutral-300 hover:text-red-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Interactive Comments Component */}
          <CommentsSection newsId={news.id || newsId} />

          {/* Related News Section */}
          <div className="space-y-4 pt-8">
            <div className="flex items-center justify-between border-b-2 border-red-700 pb-2">
              <h3 className="font-extrabold text-lg text-neutral-900 dark:text-neutral-100">
                এই বিভাগের আরও খবর
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedNews.map((rn) => (
                <NewsCard key={rn.id} news={rn} />
              ))}
            </div>
          </div>
        </article>

        {/* Right Column: Sidebar (Col-span 4) */}
        <aside className="lg:col-span-4 space-y-6">
          <MostRead />
        </aside>
      </div>
    </div>
  );
}