import { dataStore } from "@/lib/data-service";
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  Smartphone,
  Globe,
  TrendingUp,
  Share2,
} from "lucide-react";

export default function AnalyticsDashboardPage() {
  const analytics = dataStore.getAnalytics();
  const topArticles = dataStore.getAllNews().slice(0, 5);

  const trafficSources = [
    { source: "সোশ্যাল মিডিয়া (Facebook, WhatsApp)", percent: 48, color: "bg-blue-600" },
    { source: "সরাসরি ভিজিট (Direct Readers)", percent: 29, color: "bg-red-600" },
    { source: "গুগল সার্চ (Organic Search)", percent: 23, color: "bg-emerald-600" },
  ];

  const devices = [
    { name: "মোবাইল ফোন (Mobile)", share: "৭৪%", icon: Smartphone },
    { name: "কম্পিউটার (Desktop)", share: "২২%", icon: Globe },
    { name: "ট্যাবলেট (Tablet)", share: "৪%", icon: Smartphone },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-red-600" />
            <span>অ্যানালিটিক্স ও পাঠক ইন্টেলিজেন্স</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            রিয়েল-টাইম অডিয়েন্স ট্র্যাকিং, রিডারশিপ প্যাটার্ন ও ভাইরাল কনটেন্ট অ্যানালাইসিস
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-3xl space-y-1 shadow-xs">
          <span className="text-xs font-bold text-neutral-500">বর্তমানে সাইটে উপস্থিত</span>
          <div className="text-3xl font-black text-red-700 flex items-center gap-2">
            <span>{analytics.activeReaders.toLocaleString("bn-BD")}</span>
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">+১৫% পিক আওয়ার বৃদ্ধি</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-3xl space-y-1 shadow-xs">
          <span className="text-xs font-bold text-neutral-500">আজকের মোট পেজভিউ</span>
          <div className="text-3xl font-black text-neutral-900 dark:text-neutral-100">
            {analytics.totalViews.toLocaleString("bn-BD")}
          </div>
          <span className="text-[11px] text-neutral-400">প্রতি মিনিটে গড়ে ২২টি রিড</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-3xl space-y-1 shadow-xs">
          <span className="text-xs font-bold text-neutral-500">গড় পাঠকাল (Avg Time)</span>
          <div className="text-3xl font-black text-neutral-900 dark:text-neutral-100">
            ৩ মি. ৪২ সে.
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">+১৮ সেকেন্ড স্থায়িত্ব বৃদ্ধি</span>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-3xl space-y-1 shadow-xs">
          <span className="text-xs font-bold text-neutral-500">বাউন্স রেট (Bounce Rate)</span>
          <div className="text-3xl font-black text-neutral-900 dark:text-neutral-100">
            ৩১.৫%
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">স্বাস্থ্যকর মিডিয়া বেঞ্চমার্ক</span>
        </div>
      </div>

      {/* Traffic & Device Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800">
            পাঠক আসার উৎস (Traffic Sources)
          </h2>
          <div className="space-y-4">
            {trafficSources.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-neutral-700 dark:text-neutral-300">{item.source}</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{item.percent}%</span>
                </div>
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800">
            ডিভাইস ভিত্তিক পাঠক বিভাজন
          </h2>
          <div className="grid grid-cols-3 gap-3 pt-2">
            {devices.map((d, idx) => {
              const Icon = d.icon;
              return (
                <div key={idx} className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-2xl text-center space-y-1">
                  <Icon className="h-6 w-6 text-red-600 mx-auto mb-1" />
                  <span className="text-[11px] text-neutral-500 block truncate">{d.name}</span>
                  <span className="text-xl font-black text-neutral-900 dark:text-white block">{d.share}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top 5 Performing Articles */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800">
          আজকের সেরা ৫ পারফর্মিং সংবাদ
        </h2>
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {topArticles.map((article, index) => (
            <div key={article.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-6 w-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 font-black text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 truncate">
                  {article.title}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs shrink-0">
                <span className="text-neutral-500 font-semibold">{article.views.toLocaleString("bn-BD")} ভিউ</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full text-[10px]">
                  হাই রিটেনশন
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
