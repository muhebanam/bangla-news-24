"use client";

import { useState } from "react";
import { Sparkles, Send, Copy, Check, FileText, Globe, ShieldAlert, Tag } from "lucide-react";
import toast from "react-hot-toast";

export default function AiNewsroomPage() {
  const [activeTab, setActiveTab] = useState<"headline" | "summary" | "seo" | "translate" | "moderate">("headline");

  // States
  const [inputHeadline, setInputHeadline] = useState("বাংলাদেশ ব্যাংকের রিজার্ভ ও অর্থনীতি");
  const [generatedHeadlines, setGeneratedHeadlines] = useState<string[]>([]);

  const [inputSummaryText, setInputSummaryText] = useState(
    "দেশের সামগ্রিক অর্থনৈতিক স্থিতিশীলতা বজায় রাখতে এবং বৈদেশিক মুদ্রার রিজার্ভ শক্তিশালী করতে নতুন দিকনির্দেশনা ঘোষণা করেছে বাংলাদেশ ব্যাংক। বাণিজ্যিক ব্যাংকগুলোতে খেলাপি ঋণ নিয়ন্ত্রণ ও রেমিট্যান্স প্রবাহ ত্বরান্বিত করার ওপর বিশেষ জোর দেওয়া হয়েছে।"
  );
  const [generatedSummary, setGeneratedSummary] = useState<string[]>([]);

  const [inputSeoHeadline, setInputSeoHeadline] = useState("টি-টোয়েন্টি বিশ্বকাপ প্রস্তুতিতে বাংলাদেশের জয়");
  const [generatedSeo, setGeneratedSeo] = useState<any>(null);

  const [inputEngText, setInputEngText] = useState(
    "The Central Bank announced a new fiscal policy framework today aimed at curb inflation and stabilize foreign currency reserves."
  );
  const [translatedText, setTranslatedText] = useState("");

  const [inputComment, setInputComment] = useState("খুবই চমৎকার সিদ্ধান্ত হয়েছে। সাধুবাদ জানাই।");
  const [moderationResult, setModerationResult] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("ক্লিপবোর্ডে কপি করা হয়েছে!");
  };

  // Run AI actions
  const handleHeadlineGen = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "headline", headline: inputHeadline }),
      });
      const data = await res.json();
      if (data.headlines) setGeneratedHeadlines(data.headlines);
    } catch {
      toast.error("ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSummaryGen = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "summary", text: inputSummaryText }),
      });
      const data = await res.json();
      if (data.bulletPoints) setGeneratedSummary(data.bulletPoints);
    } catch {
      toast.error("ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSeoGen = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "seo", headline: inputSeoHeadline }),
      });
      const data = await res.json();
      if (data.seo) setGeneratedSeo(data.seo);
    } catch {
      toast.error("ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "translate", text: inputEngText }),
      });
      const data = await res.json();
      if (data.translatedText) setTranslatedText(data.translatedText);
    } catch {
      toast.error("ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "moderate", text: inputComment }),
      });
      const data = await res.json();
      setModerationResult(data);
    } catch {
      toast.error("ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <span>এআই নিউজরুম ফ্রেমওয়ার্ক ও টুলস হাব</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            সাংবাদিক ও বার্তা সম্পাদকদের জন্য উন্নত বাংলা কৃত্রিম বুদ্ধিমত্তা সহকারী
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 text-xs font-bold">
        {[
          { id: "headline", label: "হেডলাইন সহকারী" },
          { id: "summary", label: "৩-পয়েন্ট সামারি" },
          { id: "seo", label: "এসইও ও মেটা সহকারী" },
          { id: "translate", label: "ইংরেজি থেকে বাংলা অনুবাদ" },
          { id: "moderate", label: "কমেন্ট মডারেশন ফিল্টার" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === tab.id
                ? "bg-red-700 text-white shadow-xs"
                : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 border border-neutral-200 dark:border-neutral-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Headline Assistant */}
      {activeTab === "headline" && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              এআই হেডলাইন অপ্টিমাইজার (Bengali Headline Assistant)
            </h2>
            <p className="text-xs text-neutral-500">
              আপনার খসড়া ধারণা বা মূল কীওয়ার্ড লিখলে আকর্ষণীয় ও নির্ভরযোগ্য ৪টি বিকল্প শিরোনাম তৈরি করে দেবে।
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputHeadline}
              onChange={(e) => setInputHeadline(e.target.value)}
              className="input bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs flex-1"
            />
            <button
              onClick={handleHeadlineGen}
              disabled={loading}
              className="btn bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs px-6"
            >
              {loading ? "জেনারেট হচ্ছে..." : "হেডলাইন বানান"}
            </button>
          </div>

          {generatedHeadlines.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                প্রস্তাবিত শিরোনামসমূহ:
              </span>
              <div className="grid gap-2">
                {generatedHeadlines.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl flex items-center justify-between gap-4 border border-neutral-100 dark:border-neutral-700"
                  >
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {hl}
                    </span>
                    <button
                      onClick={() => copyToClipboard(hl)}
                      className="btn btn-xs btn-ghost text-red-600"
                      title="কপি করুন"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Summary Assistant */}
      {activeTab === "summary" && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              সংবাদ সারসংক্ষেপ সহকারী (AI 3-Bullet Summarizer)
            </h2>
            <p className="text-xs text-neutral-500">
              দীর্ঘ প্রতিবেদন থেকে পাঠকদের জন্য ৩ পয়েন্টের বুলেট সামারি স্বয়ংক্রিয়ভাবে সংক্ষেপ করুন।
            </p>
          </div>

          <textarea
            rows={5}
            value={inputSummaryText}
            onChange={(e) => setInputSummaryText(e.target.value)}
            className="textarea bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs w-full"
          />

          <button
            onClick={handleSummaryGen}
            disabled={loading}
            className="btn bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs px-6"
          >
            {loading ? "সংক্ষেপ করা হচ্ছে..." : "সারসংক্ষেপ তৈরি করুন"}
          </button>

          {generatedSummary.length > 0 && (
            <div className="p-5 bg-amber-50 dark:bg-neutral-800 rounded-2xl border border-amber-200 dark:border-neutral-700 space-y-2">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-400 block">
                সংক্ষেপে মূল ৩টি পয়েন্ট:
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                {generatedSummary.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: SEO Assistant */}
      {activeTab === "seo" && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              এসইও ও মেটা সহকারী (AI Search Engine Optimization)
            </h2>
            <p className="text-xs text-neutral-500">
              গুগল সার্চ ও সামাজিক মাধ্যমে বেশি ভিউ পেতে স্বয়ংক্রিয় মেটা টাইটেল, ডেসক্রিপশন ও কীওয়ার্ড তৈরি।
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputSeoHeadline}
              onChange={(e) => setInputSeoHeadline(e.target.value)}
              className="input bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs flex-1"
            />
            <button
              onClick={handleSeoGen}
              disabled={loading}
              className="btn bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs px-6"
            >
              {loading ? "জেনারেট হচ্ছে..." : "এসইও মেটা তৈরি"}
            </button>
          </div>

          {generatedSeo && (
            <div className="p-5 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-4 text-xs">
              <div>
                <span className="font-bold text-neutral-500 block mb-1">মেটা টাইটেল:</span>
                <p className="font-bold text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  {generatedSeo.metaTitle}
                </p>
              </div>

              <div>
                <span className="font-bold text-neutral-500 block mb-1">মেটা ডেসক্রিপশন:</span>
                <p className="text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 leading-relaxed">
                  {generatedSeo.metaDescription}
                </p>
              </div>

              <div>
                <span className="font-bold text-neutral-500 block mb-1">কীওয়ার্ডস:</span>
                <div className="flex flex-wrap gap-1.5">
                  {generatedSeo.keywords.map((kw: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-semibold px-2.5 py-1 rounded-lg"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Translation */}
      {activeTab === "translate" && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              ইংরেজি ওয়্যার অনুবাদক (English-to-Bengali News Translator)
            </h2>
            <p className="text-xs text-neutral-500">
              রয়টার্স, এএফপি বা আন্তর্জাতিক প্রেস রিলিজকে সহজ ও সাবলীল প্রমিত বাংলায় ভাষান্তর।
            </p>
          </div>

          <textarea
            rows={4}
            value={inputEngText}
            onChange={(e) => setInputEngText(e.target.value)}
            className="textarea bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs w-full"
          />

          <button
            onClick={handleTranslate}
            disabled={loading}
            className="btn bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs px-6"
          >
            {loading ? "অনুবাদ হচ্ছে..." : "বাংলায় অনুবাদ করুন"}
          </button>

          {translatedText && (
            <div className="p-4 bg-emerald-50 dark:bg-neutral-800 rounded-2xl border border-emerald-200 dark:border-neutral-700 space-y-2 text-xs">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 block">
                অনূদিত বাংলা প্রতিবেদন:
              </span>
              <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                {translatedText}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Moderation */}
      {activeTab === "moderate" && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              এআই কনটেন্ট ও কমেন্ট মডারেশন ফিল্টার
            </h2>
            <p className="text-xs text-neutral-500">
              অনাকাঙ্ক্ষিত, কুরুচিপূর্ণ বা উসকানিমূলক মন্তব্য স্বয়ংক্রিয়ভাবে শনাক্ত ও ফ্ল্যাগ করার প্রযুক্তি।
            </p>
          </div>

          <input
            type="text"
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
            className="input bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs w-full"
          />

          <button
            onClick={handleModerate}
            disabled={loading}
            className="btn bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs px-6"
          >
            {loading ? "যাচাই হচ্ছে..." : "মন্তব্য মডারেশন স্ক্যান"}
          </button>

          {moderationResult && (
            <div
              className={`p-4 rounded-2xl border text-xs font-bold ${
                moderationResult.isSafe
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : "bg-rose-50 border-rose-300 text-rose-800"
              }`}
            >
              <span>স্ট্যাটাস: {moderationResult.flag}</span>
              <span className="block mt-1 font-normal text-neutral-600">
                কনফিডেন্স স্কোর: {(moderationResult.confidence * 100).toFixed(0)}%
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
