"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Search, Trash2, Edit, Eye, Filter, CheckCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  author: { name: string };
  status: string;
  views: number;
  publishedAt: string;
}

export default function AdminNewsListPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [filterStatus]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const url = filterStatus === "all" ? "/api/news?limit=100&status=all" : `/api/news?limit=100&status=${filterStatus}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setArticles(data.data);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই সংবাদটি মুছে ফেলতে চান?")) return;

    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setArticles((prev) => prev.filter((a) => a.id !== id));
      } else {
        toast.error("মুছে ফেলা সম্ভব হয়নি");
      }
    } catch {
      toast.error("সার্ভার ত্রুটি");
    }
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
            সংবাদ ও খসড়া ব্যবস্থাপনা
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            সিএমএসে সংরক্ষিত মোট {articles.length.toLocaleString("bn-BD")} টি সংবাদ
          </p>
        </div>

        <Link
          href="/admin/news/create"
          className="btn btn-sm bg-red-700 hover:bg-red-800 text-white border-none rounded-xl flex items-center gap-1.5 px-4"
        >
          <PlusCircle className="h-4 w-4" />
          <span>নতুন সংবাদ যোগ করুন</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 text-xs overflow-x-auto w-full sm:w-auto">
          {[
            { id: "all", label: "সকল সংবাদ" },
            { id: "published", label: "প্রকাশিত" },
            { id: "pending", label: "পর্যালোচনার অপেক্ষায়" },
            { id: "draft", label: "খসড়া" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                filterStatus === tab.id
                  ? "bg-red-700 text-white shadow-xs"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="শিরোনাম খুঁজুন..."
            className="input input-sm w-full pl-9 bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="table w-full text-xs">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider text-[11px] bg-neutral-50/50 dark:bg-neutral-800/40">
                <th>শিরোনাম</th>
                <th>বিভাগ</th>
                <th>প্রতিবেদক</th>
                <th>স্ট্যাটাস</th>
                <th>পাঠসংখ্যা</th>
                <th className="text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/60">
                  <td className="font-bold text-neutral-900 dark:text-neutral-100 max-w-sm">
                    {item.title}
                  </td>
                  <td>
                    <span className="bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded text-[11px]">
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
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/news/${item.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-red-700"
                        title="দেখুন"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-neutral-500 hover:text-red-600"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
