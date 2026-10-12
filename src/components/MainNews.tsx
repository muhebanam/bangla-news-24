import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, ChevronRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const MainNews = ({ news }: { news: NewsItem[] }) => {
  if (!news || news.length === 0) return null;

  const [firstNews, ...otherNews] = news;
  const fallbackImg =
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Featured Lead Story (Col-span 7) */}
      <div className="lg:col-span-7">
        <Link href={`/news/${firstNews.id}`} className="group block h-full">
          <div className="card h-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col">
            <figure className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0">
              <Image
                src={firstNews.imageUrl || fallbackImg}
                alt={firstNews.imageAlt || firstNews.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-red-700 text-white text-xs font-black px-3 py-1 rounded-md shadow-md uppercase tracking-wider flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  <span>শীর্ষ সংবাদ</span>
                </span>
                {firstNews.category && (
                  <span className="bg-neutral-900/80 backdrop-blur-md text-neutral-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                    {firstNews.category}
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-md group-hover:text-red-300 transition-colors">
                  {firstNews.title}
                </h2>
                {firstNews.description && (
                  <p className="text-xs sm:text-sm text-neutral-200 mt-2 line-clamp-2 drop-shadow-sm font-light">
                    {firstNews.description}
                  </p>
                )}
              </div>
            </figure>
          </div>
        </Link>
      </div>

      {/* Secondary Top Stories (Col-span 5) */}
      <div className="lg:col-span-5 flex flex-col gap-2.5">
        <div className="bg-neutral-100 dark:bg-neutral-800/60 p-2.5 px-3 rounded-xl border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-between">
          <span className="font-bold text-sm text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-600"></span>
            <span>অন্যান্য গুরুত্বপূর্ণ খবর</span>
          </span>
          <span className="text-[11px] text-neutral-500">আপডেট হচ্ছে</span>
        </div>

        <div className="grid gap-2">
          {otherNews.slice(0, 4).map((on, idx) => (
            <Link
              key={on.id}
              href={`/news/${on.id}`}
              className="group p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:border-red-400 dark:hover:border-red-600 transition-all flex gap-3 items-center"
            >
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg overflow-hidden relative shrink-0 bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src={on.imageUrl || fallbackImg}
                  alt={on.title}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-red-600 dark:text-red-400 block mb-0.5">
                  {on.category || firstNews.category || "জাতীয়"}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                  {on.title}
                </h3>
              </div>

              <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainNews;
