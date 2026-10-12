import Image from "next/image";
import Link from "next/link";
import { Clock, Eye } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
  publishedAt?: string;
  views?: number;
}

const NewsCard = ({ news }: { news: NewsItem }) => {
  const fallbackImg =
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80";
  const imgUrl = news.imageUrl || fallbackImg;

  return (
    <Link href={`/news/${news.id}`} className="group block h-full">
      <div className="card h-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group-hover:-translate-y-1">
        <figure className="relative h-44 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0">
          <Image
            src={imgUrl}
            alt={news.imageAlt || news.title || "সংবাদ ছবি"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {news.category && (
            <span className="absolute top-2.5 left-2.5 bg-red-700/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md backdrop-blur-xs shadow-xs">
              {news.category}
            </span>
          )}
        </figure>

        <div className="card-body p-4 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="card-title text-base font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
              {news.title}
            </h2>
            {news.description && (
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                {news.description}
              </p>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>আজকের প্রতিবেদন</span>
            </span>
            {news.views && (
              <span className="flex items-center gap-1 text-neutral-400">
                <Eye className="h-3 w-3" />
                <span>{news.views.toLocaleString("bn-BD")}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
