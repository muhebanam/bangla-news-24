import NewsCard from "@/components/NewsCard";
import MostRead from "@/components/MostRead";
import Link from "next/link";
import { dataStore } from "@/lib/data-service";
import { ChevronRight, Filter, Flame } from "lucide-react";

interface CategoryNewsProps {
  params: Promise<{ categoryId: string }>;
}

const categoryNameMap: Record<string, string> = {
  national: "জাতীয়",
  politics: "রাজনীতি",
  economy: "অর্থনীতি",
  international: "আন্তর্জাতিক",
  sports: "খেলা",
  entertainment: "বিনোদন",
  technology: "প্রযুক্তি",
  opinion: "মতামত",
  lifestyle: "জীবনযাপন",
};

export default async function CategoryNews({ params }: CategoryNewsProps) {
  const { categoryId } = await params;

  let categoryNews: any[] = [];
  let categoryTitle = categoryNameMap[categoryId.toLowerCase()] || categoryId;

  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/category/${categoryId}`,
      { next: { revalidate: 180 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data?.data && Array.isArray(data.data)) {
        categoryNews = data.data;
        if (data.title) categoryTitle = data.title;
      }
    }
  } catch (err) {
    console.warn("Category fetch fallback:", err);
  }

  // Fallback to dataStore if empty
  if (categoryNews.length === 0) {
    const all = dataStore.getAllNews();
    categoryNews = all.filter(
      (n) =>
        n.category.toLowerCase() === categoryTitle.toLowerCase() ||
        n.category.toLowerCase() === categoryId.toLowerCase()
    );
    if (categoryNews.length === 0) {
      categoryNews = all.slice(0, 6);
    }
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">{categoryTitle}</span>
      </nav>

      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-red-700">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span className="h-4 w-4 bg-red-700 rounded-sm inline-block"></span>
            <span>{categoryTitle}</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            মোট {categoryNews.length.toLocaleString("bn-BD")} টি সংবাদ পাওয়া গেছে
          </p>
        </div>

        {/* Filter / Sort Pill */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-neutral-500">বাছাই:</span>
          <button className="px-3 py-1 bg-red-700 text-white rounded-full font-bold">
            সর্বশেষ
          </button>
          <button className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 rounded-full">
            জনপ্রিয়
          </button>
        </div>
      </div>

      {/* Grid Layout: News Cards + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {categoryNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4">
          <MostRead />
        </aside>
      </div>
    </div>
  );
}
