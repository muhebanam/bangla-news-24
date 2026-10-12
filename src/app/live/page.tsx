import Link from "next/link";
import { dataStore } from "@/lib/data-service";
import MostRead from "@/components/MostRead";
import { Radio, Clock, ShieldCheck, ChevronRight, RefreshCw, Zap } from "lucide-react";

export default function LivePage() {
  const updates = dataStore.getLiveUpdates();

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">লাইভ নিউজ ডেস্ক</span>
      </nav>

      {/* Live Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-neutral-900 to-black text-white p-6 sm:p-8 rounded-2xl border border-red-800/60 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-red-400">
                সরাসরি সম্প্রচার • মিনিট বাই মিনিট
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              জাতীয় ও আন্তর্জাতিক গুরুত্বপূর্ণ ঘটনাবলীর লাইভ আপডেট
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl">
              প্রতি মুহূর্তের টাটকা তথ্য, মাঠের খবর, প্রেস ব্রিফিং ও সরকারি নির্দেশনার সরাসরি কভারেজ।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-neutral-800/80 px-3 py-2 rounded-xl border border-neutral-700 text-xs shrink-0">
            <RefreshCw className="h-4 w-4 text-emerald-400 animate-spin" />
            <span>স্বয়ংক্রিয় লাইভ ফিড সচল</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Timeline + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Key Takeaways Card */}
          <div className="bg-amber-50 dark:bg-neutral-800/60 border-l-4 border-amber-600 p-4 rounded-xl text-xs space-y-1.5">
            <span className="font-bold text-amber-800 dark:text-amber-400 block text-sm">
              সংক্ষেপে মূল পয়েন্ট:
            </span>
            <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <li>প্রধান উপদেষ্টার প্রেস ব্রিফিং থেকে নতুন সংস্কার কমিশনের ঘোষণা।</li>
              <li>সারাদেশের জাতীয় বিদ্যুৎ গ্রিড পুনর্স্থাপন ও লোড ভারসাম্য স্বাভাবিক।</li>
              <li>ডিএসইতে বিনিয়োগকারীদের সক্রিয় অংশগ্রহণে শেয়ারবাজারে বড় উত্থান।</li>
            </ul>
          </div>

          {/* Timeline Feed */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-red-700 space-y-8 my-4">
            {updates.map((item) => (
              <div key={item.id} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-red-700 border-4 border-white dark:border-neutral-900 shadow-md group-hover:scale-125 transition-transform" />

                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-red-700 dark:text-red-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{item.time}</span>
                    </span>
                    <span className="bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 px-2 py-0.5 rounded text-[11px] font-bold">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {item.content}
                  </p>

                  <div className="pt-2 text-[11px] text-neutral-400 flex items-center justify-between">
                    <span>যাচাইকৃত তথ্য • বাংলা নিউজ২৪ সেন্ট্রাল ডেস্ক</span>
                    <span className="flex items-center gap-1 text-emerald-600">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>ভেরিফাইড আপডেট</span>
                    </span>
                  </div>
                </div>
              </div>
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
