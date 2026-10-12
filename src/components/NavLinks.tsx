import Link from "next/link";
import { Video, Radio, Flame, Sparkles, Image as ImageIcon } from "lucide-react";

interface NavItem {
  slug: string;
  title: string;
  topicId?: string | null;
  url?: string;
  scrapable?: boolean;
}

const defaultCategories: NavItem[] = [
  { slug: "national", title: "জাতীয়", scrapable: true },
  { slug: "politics", title: "রাজনীতি", scrapable: true },
  { slug: "economy", title: "অর্থনীতি", scrapable: true },
  { slug: "international", title: "আন্তর্জাতিক", scrapable: true },
  { slug: "sports", title: "খেলা", scrapable: true },
  { slug: "entertainment", title: "বিনোদন", scrapable: true },
  { slug: "technology", title: "প্রযুক্তি", scrapable: true },
  { slug: "opinion", title: "মতামত", scrapable: true },
  { slug: "lifestyle", title: "জীবনযাপন", scrapable: true },
];

const NavLinks = async () => {
  let navs: NavItem[] = defaultCategories;

  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.data && Array.isArray(data.data)) {
        const fetched = data.data.filter((n: any) => n.scrapable && n.slug !== "/bengali");
        if (fetched.length > 0) {
          navs = fetched;
        }
      }
    }
  } catch (err) {
    console.warn("Categories fetch fallback:", err);
  }

  return (
    <nav className="max-w-7xl mx-auto px-4 py-2">
      <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar whitespace-nowrap text-sm font-semibold">
        {/* Core Categories */}
        <div className="flex items-center gap-1 md:gap-2">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-red-700 dark:hover:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            মূলপাতা
          </Link>

          {navs.map((n) => (
            <Link
              key={n.slug}
              href={`/category/${n.slug}`}
              className="px-3 py-1.5 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-red-700 dark:hover:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {n.title}
            </Link>
          ))}
        </div>

        {/* Feature Badges */}
        <div className="hidden lg:flex items-center gap-2 border-l border-neutral-300 dark:border-neutral-700 pl-3 shrink-0">
          <Link
            href="/trending"
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 transition-colors"
          >
            <Flame className="h-3 w-3" />
            <span>ট্রেন্ডিং</span>
          </Link>

          <Link
            href="/videos"
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 hover:bg-red-100 transition-colors"
          >
            <Video className="h-3 w-3" />
            <span>ভিডিও</span>
          </Link>

          <Link
            href="/gallery"
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 hover:bg-purple-100 transition-colors"
          >
            <ImageIcon className="h-3 w-3" />
            <span>গ্যালারি</span>
          </Link>

          <Link
            href="/podcasts"
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 transition-colors"
          >
            <Radio className="h-3 w-3" />
            <span>পডকাস্ট</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;
