import Link from "next/link";
import { BarChart3, TrendingUp, DollarSign, Database, ChevronRight, Activity } from "lucide-react";

export default function DataStoriesPage() {
  const reserveData = [
    { month: "জানুয়ারি", amount: 20.2 },
    { month: "মার্চ", amount: 21.5 },
    { month: "জুন", amount: 22.8 },
    { month: "সেপ্টেম্বর", amount: 24.6 },
    { month: "অক্টোবর ২০২৬", amount: 25.8 },
  ];

  const exportGrowth = [
    { sector: "তৈরি পোশাক", percent: "৭৮%", value: "$৩৮.৪ বিলিয়ন", color: "bg-red-600" },
    { sector: "তথ্যপ্রযুক্তি ও সফটওয়্যার", percent: "১২%", value: "$২.১ বিলিয়ন", color: "bg-blue-600" },
    { sector: "চামড়াজাত পণ্য", percent: "৫%", value: "$১.৩ বিলিয়ন", color: "bg-amber-600" },
    { sector: "কৃষিজাত খাদ্য", percent: "৫%", value: "$১.১ বিলিয়ন", color: "bg-emerald-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">ডাটা জার্নালিজম প্ল্যাটফর্ম</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 to-neutral-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-2">
        <div className="flex items-center gap-2 text-emerald-400">
          <BarChart3 className="h-6 w-6" />
          <span className="text-xs font-bold uppercase tracking-widest">উপাত্ত ও পরিসংখ্যান ভিত্তিক অনুসন্ধান</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">তথ্যচিত্রে বাংলাদেশের অর্থনীতি ও সমাজ</h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
          জটিল পরিসংখ্যানকে সহজ ভিজ্যুয়াল চার্ট ও ইন্টারঅ্যাক্টিভ গ্রাফের মাধ্যমে বিশ্লেষণ।
        </p>
      </div>

      {/* Visual Chart 1: Forex Reserves Growth */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-700">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span>বৈদেশিক মুদ্রার রিজার্ভ গতিপ্রকৃতি (বিলিয়ন মার্কিন ডলার)</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">সূত্র: বাংলাদেশ ব্যাংক মাসিক অর্থনৈতিক প্রতিবেদন</p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
            +২৭% বাৎসরিক প্রবৃদ্ধি
          </span>
        </div>

        {/* Bar Visualization */}
        <div className="space-y-4 pt-2">
          {reserveData.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-neutral-700 dark:text-neutral-300">{item.month}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">${item.amount} বিলিয়ন</span>
              </div>
              <div className="w-full bg-neutral-100 dark:bg-neutral-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                  style={{ width: `${(item.amount / 30) * 100}%` }}
                >
                  ${item.amount}B
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Chart 2: Export Composition */}
      <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-700">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>রপ্তানি আয়ের খাতভিত্তিক বিভাজন ও সম্ভাবনা</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">সূত্র: রপ্তানি উন্নয়ন ব্যুরো (ইপিবি)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exportGrowth.map((sec, idx) => (
            <div key={idx} className="bg-neutral-50 dark:bg-neutral-900/60 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">{sec.sector}</span>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{sec.percent}</span>
              </div>
              <div className="text-xl font-black text-neutral-900 dark:text-neutral-100">{sec.value}</div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                <div className={`${sec.color} h-full rounded-full`} style={{ width: sec.percent }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
