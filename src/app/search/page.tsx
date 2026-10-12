import NewsCard from "@/components/NewsCard";
import MostRead from "@/components/MostRead";
import Link from "next/link";
import { dataStore } from "@/lib/data-service";
import { Search, ChevronRight } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", category = "" } = await searchParams;

  const allNews = dataStore.getAllNews();
  let results = allNews;

  if (q.trim()) {
    const query = q.toLowerCase();
    results = results.filter(
      (n) =>
        n.title.toLowerCase().includes(query) ||
        (n.summary && n.summary.toLowerCase().includes(query)) ||
        (n.content && n.content.toLowerCase().includes(query)) ||
        (n.tags && n.tags.some((t) => t.toLowerCase().includes(query)))
    );
  }

  if (category.trim()) {
    results = results.filter((n) => n.category.toLowerCase() === category.toLowerCase());
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">অনুসন্ধান ফলাফল</span>
      </nav>

      {/* Search Header */}
      <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-4">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
          <Search className="h-6 w-6" />
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
            সংবাদ অনুসন্ধান
          </h1>
        </div>

        <form action="/search" method="GET" className="flex gap-2 max-w-2xl">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="কীওয়ার্ড দিয়ে সংবাদ খুঁজুন (যেমন: ব্যাংক, ক্রিকেট, এআই)..."
            className="input bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-sm rounded-xl flex-1"
          />
          <button
            type="submit"
            className="btn bg-red-700 hover:bg-red-800 text-white border-none rounded-xl px-6"
          >
            অনুসন্ধান
          </button>
        </form>

        <p className="text-xs text-neutral-500">
          {q ? (
            <>
              &ldquo;<span className="font-bold text-neutral-800 dark:text-neutral-200">{q}</span>&rdquo; এর জন্য{" "}
              <span className="font-bold text-red-700">{results.length.toLocaleString("bn-BD")}</span> টি সংবাদ পাওয়া গেছে।
            </>
          ) : (
            "সকল সর্বশেষ সংবাদ প্রদর্শিত হচ্ছে।"
          )}
        </p>
      </div>

      {/* Grid Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          {results.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8">
              <Search className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
              <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200">
                কোনো সংবাদ পাওয়া যায়নি
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                অন্য কোনো শব্দ বা সহজ কীওয়ার্ড দিয়ে পুনরায় চেষ্টা করুন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {results.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          <MostRead />
        </aside>
      </div>
    </div>
  );
}
