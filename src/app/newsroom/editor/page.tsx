import Link from "next/link";
import { CheckCircle2, ListTodo, Sparkles, ArrowRight, Newspaper } from "lucide-react";

export default function EditorPanelPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-red-600" />
            <span>বার্তা সম্পাদকীয় প্যানেল (Editor Panel)</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            খসড়া অনুমোদন, রিপোর্ট যাচাই ও হেডলাইন ফাইনাল করার বিশেষ প্যানেল
          </p>
        </div>

        <Link href="/admin" className="btn btn-sm bg-neutral-900 text-white rounded-xl text-xs">
          অ্যাডমিন ড্যাশবোর্ড
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/news/review"
          className="group p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl hover:border-red-600 transition-all shadow-xs space-y-3"
        >
          <div className="h-12 w-12 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 transition-colors">
            খসড়া পর্যালোচনা কিউ
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed">
            রিপোর্টারদের জমা দেওয়া প্রতিবেদন পড়ুন, সংশোধন দিন বা এক ক্লিকে প্রকাশ করুন।
          </p>
          <div className="text-xs font-bold text-red-600 flex items-center gap-1 pt-1">
            <span>রিভিউতে প্রবেশ করুন</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>

        <Link
          href="/admin/assignments"
          className="group p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl hover:border-amber-600 transition-all shadow-xs space-y-3"
        >
          <div className="h-12 w-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 flex items-center justify-center font-bold">
            <ListTodo className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 transition-colors">
            অ্যাসাইনমেন্ট ডেস্ক
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed">
            মাঠের সাংবাদিকদের দায়িত্ব বণ্টন করুন এবং ডেডলাইন পর্যবেক্ষণ করুন।
          </p>
          <div className="text-xs font-bold text-amber-600 flex items-center gap-1 pt-1">
            <span>অ্যাসাইনমেন্ট দিন</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>

        <Link
          href="/admin/ai"
          className="group p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl hover:border-blue-600 transition-all shadow-xs space-y-3"
        >
          <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 flex items-center justify-center font-bold">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
            এআই হেডলাইন ও এসইও
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed">
            রিপোর্টের আকর্ষণীয় বিকল্প হেডলাইন ও মেটা ডেসক্রিপশন তৈরি করুন।
          </p>
          <div className="text-xs font-bold text-blue-600 flex items-center gap-1 pt-1">
            <span>এআই সহকারী খুলুন</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
