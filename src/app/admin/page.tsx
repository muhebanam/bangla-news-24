import Link from "next/link";
import { dataStore } from "@/lib/data-service";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  PlusCircle,
  Sparkles,
  ArrowRight,
  Eye,
  PenTool,
} from "lucide-react";

export default function AdminDashboardPage() {
  const newsList = dataStore.getAllNews();
  const assignments = dataStore.getAssignments();
  const pendingReview = newsList.filter((n) => n.status === "pending" || n.status === "draft");
  const publishedCount = newsList.filter((n) => n.status === "published").length;
  const analytics = dataStore.getAnalytics();

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div>
          <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
            এন্টারপ্রাইজ ডিজিটাল মিডিয়া প্ল্যাটফর্ম
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100">
            নিউজরুম কমান্ড ড্যাশবোর্ড
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            আজকের সম্পাদকীয় অগ্রগতি, দর্শক সম্পৃক্ততা ও সামগ্রিক কার্যবিবরণী।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/news/create"
            className="btn btn-sm bg-red-700 hover:bg-red-800 text-white border-none rounded-xl flex items-center gap-1.5 shadow-sm px-4"
          >
            <PlusCircle className="h-4 w-4" />
            <span>নতুন সংবাদ তৈরি</span>
          </Link>
          <Link
            href="/admin/ai"
            className="btn btn-sm bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 border-none rounded-xl flex items-center gap-1.5"
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>এআই সহকারী</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Live Readers */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-bold">সক্রিয় পাঠক (রিয়েলটাইম)</span>
            <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100">
            {analytics.activeReaders.toLocaleString("bn-BD")}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>+১২% গত ঘণ্টার চেয়ে বৃদ্ধি</span>
          </span>
        </div>

        {/* Card 2: Published Articles */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-bold">মোট প্রকাশিত সংবাদ</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100">
            {publishedCount.toLocaleString("bn-BD")}
          </div>
          <span className="text-[11px] text-neutral-400">আজ প্রকাশিত: {analytics.publishedToday.toLocaleString("bn-BD")} টি</span>
        </div>

        {/* Card 3: Pending Review Queue */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-bold">পর্যালোচনার অপেক্ষায়</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">
            {pendingReview.length.toLocaleString("bn-BD")}
          </div>
          <Link href="/admin/news/review" className="text-[11px] text-red-600 font-bold hover:underline">
            রিভিউ কিউ দেখুন →
          </Link>
        </div>

        {/* Card 4: Monthly Revenue */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-bold">মাসিক মোট আয় (বিজ্ঞাপন+সাব)</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            {analytics.monthlyRevenue}
          </div>
          <span className="text-[11px] text-neutral-400">বিজ্ঞাপন: {analytics.adRevenue}</span>
        </div>
      </div>

      {/* News Management Table & Queue */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              সর্বশেষ সম্পাদকীয় প্রতিবেদন ও স্থিতি
            </h2>
            <p className="text-xs text-neutral-500">সিএমএসে সংরক্ষিত খসড়া ও প্রকাশিত সংবাদ</p>
          </div>
          <Link
            href="/admin/news"
            className="text-xs font-bold text-red-700 dark:text-red-400 hover:underline flex items-center gap-1"
          >
            <span>সকল সংবাদ তালিকা</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full text-xs">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider text-[11px]">
                <th>শিরোনাম</th>
                <th>বিভাগ</th>
                <th>প্রতিবেদক</th>
                <th>স্ট্যাটাস</th>
                <th>পাঠসংখ্যা</th>
                <th className="text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {newsList.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/60">
                  <td className="font-bold text-neutral-900 dark:text-neutral-100 max-w-xs truncate">
                    {item.title}
                  </td>
                  <td>
                    <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-[11px]">
                      {item.category}
                    </span>
                  </td>
                  <td>{item.author?.name || "নিজস্ব প্রতিবেদক"}</td>
                  <td>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        item.status === "published"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400"
                          : item.status === "pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400"
                          : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                      }`}
                    >
                      {item.status === "published" ? "প্রকাশিত" : item.status === "pending" ? "পর্যালোচনাধীন" : "খসড়া"}
                    </span>
                  </td>
                  <td>{item.views.toLocaleString("bn-BD")}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/news/${item.id}`}
                        target="_blank"
                        className="btn btn-xs btn-ghost text-neutral-500 hover:text-red-700"
                        title="দেখুন"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href={`/admin/news/edit/${item.id}`}
                        className="btn btn-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 border-none"
                      >
                        সম্পাদনা
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
