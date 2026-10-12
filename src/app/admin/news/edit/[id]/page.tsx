"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Send, Sparkles, Zap, TrendingUp, Save } from "lucide-react";
import toast from "react-hot-toast";

interface EditNewsPageProps {
  params: Promise<{ id: string }>;
}

export default function EditNewsPage({ params }: EditNewsPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("জাতীয়");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"published" | "pending" | "draft">("published");
  const [isBreaking, setIsBreaking] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const res = await fetch(`/api/news/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          const item = data.data;
          setTitle(item.title || "");
          setCategory(item.category || "জাতীয়");
          setSummary(item.summary || item.description || "");
          setContent(item.content || item.text || "");
          setImageUrl(item.imageUrl || "");
          setStatus(item.status || "published");
          setIsBreaking(!!item.isBreaking);
          setIsTrending(!!item.isTrending);
        }
      }
    } catch (e) {
      console.warn("Fetch article error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          summary,
          content,
          imageUrl,
          status,
          isBreaking,
          isTrending,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "সংবাদ সফলভাবে আপডেট হয়েছে!");
        router.push("/admin/news");
      } else {
        toast.error("আপডেট ব্যর্থ হয়েছে");
      }
    } catch {
      toast.error("সার্ভার ত্রুটি");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-neutral-500">
        তথ্য লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
              সংবাদ সম্পাদনা করুন
            </h1>
            <p className="text-xs text-neutral-500">প্রতিবেদন পরিমার্জন ও আপডেট</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              সংবাদের শিরোনাম *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-base font-bold rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              বিভাগ *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-xs font-semibold rounded-xl"
            >
              {["জাতীয়", "রাজনীতি", "অর্থনীতি", "আন্তর্জাতিক", "খেলা", "বিনোদন", "প্রযুক্তি", "মতামত"].map(
                (c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              সারসংক্ষেপ
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="textarea bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-xs rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              মূল বিষয়বস্তু *
            </label>
            <textarea
              rows={10}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-sm leading-relaxed rounded-xl font-normal"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              ছবির লিংক
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="input bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-xs rounded-xl"
            />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              আপডেট অপশন
            </h3>

            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                স্ট্যাটাস
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="select select-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-xs font-bold rounded-xl"
              >
                <option value="published">প্রকাশিত (Published)</option>
                <option value="pending">পর্যালোচনাধীন (Pending)</option>
                <option value="draft">খসড়া (Draft)</option>
              </select>
            </div>

            <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="checkbox checkbox-sm checkbox-error"
                />
                <span className="text-red-600">ব্রেকিং নিউজ</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="checkbox checkbox-sm checkbox-warning"
                />
                <span className="text-amber-600">ট্রেন্ডিং নিউজ</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn w-full bg-red-700 hover:bg-red-800 text-white font-bold border-none rounded-xl py-2.5 text-xs shadow-md flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? "আপডেট হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
