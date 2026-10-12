"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Sparkles,
  Send,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  Zap,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";

export default function CreateNewsPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("জাতীয়");
  const [subCategory, setSubCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80"
  );
  const [authorName, setAuthorName] = useState("নিজস্ব প্রতিবেদক");
  const [status, setStatus] = useState<"published" | "pending" | "draft">("published");
  const [isBreaking, setIsBreaking] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI Assistant states
  const [aiHeadlines, setAiHeadlines] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  // AI Headline Generator
  const generateAiHeadlines = async () => {
    if (!title && !content) {
      toast.error("অনুগ্রহ করে কিছু খসড়া শিরোনাম বা বিষয়বস্তু লিখুন");
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "headline", headline: title, text: content }),
      });
      const data = await res.json();
      if (data.headlines) {
        setAiHeadlines(data.headlines);
        toast.success("এআই হেডলাইন সফলভাবে জেনারেট হয়েছে!");
      }
    } catch {
      toast.error("এআই কল ব্যর্থ হয়েছে");
    } finally {
      setAiLoading(false);
    }
  };

  // AI Summary Generator
  const generateAiSummary = async () => {
    if (!content) {
      toast.error("সারসংক্ষেপ তৈরি করতে সংবাদের বিস্তারিত বিষয়বস্তু প্রয়োজন");
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "summary", text: content, headline: title }),
      });
      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
        toast.success("এআই সামারি সফলভাবে যুক্ত হয়েছে!");
      }
    } catch {
      toast.error("এআই সামারি তৈরি করা যায়নি");
    } finally {
      setAiLoading(false);
    }
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("অনুগ্রহ করে শিরোনাম ও বিস্তারিত বিষয়বস্তু পূরণ করুন");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category,
          subCategory,
          summary: summary.trim(),
          content: content.trim(),
          imageUrl,
          author: { name: authorName },
          status,
          isBreaking,
          isTrending,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "সংবাদ সফলভাবে তৈরি হয়েছে!");
        router.push("/admin/news");
      } else {
        toast.error(data.error || "সংবাদ সংরক্ষণ ব্যর্থ হয়েছে");
      }
    } catch {
      toast.error("সার্ভার সমস্যা হয়েছে");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
              নতুন সংবাদ তৈরি করুন
            </h1>
            <p className="text-xs text-neutral-500">
              এআই নিউজরুম টুলসের সহায়তায় দ্রুত ও নির্ভুল প্রতিবেদন রচনা
            </p>
          </div>
        </div>
      </div>

      {/* Main Form + AI Tools Sidebar */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields (Col-span 8) */}
        <div className="lg:col-span-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              সংবাদের শিরোনাম (Headline) *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="আকর্ষণীয় ও বস্তুনিষ্ঠ শিরোনাম লিখুন..."
              className="input bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-base font-bold rounded-xl"
            />
          </div>

          {/* AI Headline Suggestions Box */}
          {aiHeadlines.length > 0 && (
            <div className="p-4 bg-amber-50 dark:bg-neutral-800 border border-amber-200 dark:border-neutral-700 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>এআই প্রস্তাবিত বিকল্প শিরোনামসমূহ (ক্লিক করে নির্বাচন করুন):</span>
              </span>
              <div className="space-y-1.5">
                {aiHeadlines.map((hl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTitle(hl);
                      toast.success("শিরোনাম পরিবর্তন করা হয়েছে!");
                    }}
                    className="w-full text-left p-2 rounded-lg bg-white dark:bg-neutral-900 hover:bg-amber-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors"
                  >
                    {hl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category & Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                প্রধান বিভাগ (Category) *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-xs font-semibold rounded-xl"
              >
                {["জাতীয়", "রাজনীতি", "অর্থনীতি", "আন্তর্জাতিক", "খেলা", "বিনোদন", "প্রযুক্তি", "মতামত", "জীবনযাপন"].map(
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
                উপবিভাগ (Subcategory - ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="যেমন: ব্যাংকিং, ক্রিকেট, নির্বাচন..."
                className="input bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-xs rounded-xl"
              />
            </div>
          </div>

          {/* Summary / Excerpt */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                সংক্ষিপ্ত সারসংক্ষেপ (Summary)
              </label>
              <button
                type="button"
                onClick={generateAiSummary}
                disabled={aiLoading}
                className="text-[11px] font-bold text-red-700 dark:text-red-400 hover:underline flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" />
                <span>এআই দিয়ে সামারি বানান</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="সংবাদের মূল ২-৩ লাইনের সারাংশ..."
              className="textarea bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-xs rounded-xl"
            />
          </div>

          {/* Content Body */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              সংবাদের বিস্তারিত বিষয়বস্তু (News Content) *
            </label>
            <textarea
              rows={10}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="এখানে পূর্ণাঙ্গ প্রতিবেদন রচনা করুন (অনুচ্ছেদ দিয়ে আলাদা করুন)..."
              className="textarea bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-sm leading-relaxed rounded-xl font-normal"
            />
          </div>

          {/* Image URL & Preview */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              ফিচার্ড ছবির ইউআরএল (Image URL)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="input bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-xs rounded-xl"
            />
            {imageUrl && (
              <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                <span className="absolute bottom-2 left-2 bg-black/70 text-[10px] text-white px-2 py-0.5 rounded">
                  ছবি প্রিভিউ
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Publishing Controls & AI Assistant (Col-span 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publish Action Card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              প্রকাশনা ও কর্মপ্রবাহ
            </h3>

            {/* Author */}
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                প্রতিবেদকের নাম
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="input input-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-xs rounded-xl"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-400 mb-1">
                স্ট্যাটাস নির্বাচন
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="select select-sm bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-xs font-bold rounded-xl"
              >
                <option value="published">সরাসরি প্রকাশ করুন (Published)</option>
                <option value="pending">পর্যালোচনার জন্য জমা দিন (Pending Review)</option>
                <option value="draft">খসড়া হিসেবে রাখুন (Draft)</option>
              </select>
            </div>

            {/* Breaking & Trending Toggles */}
            <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="checkbox checkbox-sm checkbox-error"
                />
                <span className="flex items-center gap-1 text-red-600">
                  <Zap className="h-3.5 w-3.5" />
                  <span>ব্রেকিং নিউজ টিকার</span>
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="checkbox checkbox-sm checkbox-warning"
                />
                <span className="flex items-center gap-1 text-amber-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>ট্রেন্ডিং সংবাদের তালিকায় যুক্ত করুন</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn w-full bg-red-700 hover:bg-red-800 text-white font-bold border-none rounded-xl py-2.5 text-xs shadow-md flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "সংরক্ষণ হচ্ছে..." : "সংবাদ সংরক্ষণ ও প্রকাশ"}</span>
            </button>
          </div>

          {/* AI Tools Palette Card */}
          <div className="bg-gradient-to-br from-amber-500/10 to-red-600/10 border border-amber-300/40 dark:border-amber-900/40 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
              <Sparkles className="h-4 w-4" />
              <span>এআই নিউজরুম সহকারী</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              উন্নত বাংলা প্রাকৃতিক ভাষা প্রক্রিয়াকরণের মাধ্যমে স্বয়ংক্রিয়ভাবে বিকল্প হেডলাইন ও এসইও ট্যাগ তৈরি করুন।
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={generateAiHeadlines}
                disabled={aiLoading}
                className="btn btn-sm w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold border-none rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{aiLoading ? "তৈরি হচ্ছে..." : "বিকল্প হেডলাইন সাজেস্ট করুন"}</span>
              </button>

              <button
                type="button"
                onClick={generateAiSummary}
                disabled={aiLoading}
                className="btn btn-sm w-full bg-white dark:bg-neutral-800 hover:bg-neutral-100 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <span>স্বয়ংক্রিয় ৩-পয়েন্ট সামারি</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
