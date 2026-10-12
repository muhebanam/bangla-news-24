"use client";

import { useState } from "react";
import Link from "next/link";
import { PenTool, Send, Clock, CheckCircle2, RotateCcw, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function ReporterPortalPage() {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [beat, setBeat] = useState("জাতীয়");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const myAssignments = [
    { id: "a1", title: "জাতীয় বাজেট ২০২৬-২৭: খাতভিত্তিক বরাদ্দ", deadline: "১৪ অক্টোবর", status: "চলমান" },
    { id: "a2", title: "রাজধানীর বায়ুমান সূচক রিপোর্ট", deadline: "১৬ অক্টোবর", status: "বরাদ্দকৃত" },
  ];

  const handleSubmitDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle || !draftContent) {
      toast.error("শিরোনাম ও বিস্তারিত লিখুন");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: draftTitle,
          category: beat,
          content: draftContent,
          status: "pending",
          author: { name: "নিজস্ব প্রতিবেদক", designation: "ফিল্ড রিপোর্টার" },
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("প্রতিবেদনটি বার্তা সম্পাদকের টেবিলে সফলভাবে জমা হয়েছে!");
        setDraftTitle("");
        setDraftContent("");
      }
    } catch {
      toast.error("জমা দেওয়া যায়নি");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <PenTool className="h-6 w-6 text-red-600" />
            <span>রিপোর্টার সিএমএস ও ফিল্ড ডেস্ক</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            অ্যাসাইনমেন্ট চেক, খসড়া রচনা ও সম্পাদকের পর্যালোচনার জন্য প্রতিবেদন জমাদান
          </p>
        </div>

        <Link href="/admin" className="btn btn-sm btn-ghost rounded-xl text-xs">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>ড্যাশবোর্ড</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Compose Draft Form (Col-span 8) */}
        <div className="lg:col-span-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800">
            খসড়া প্রতিবেদন রচনা করুন
          </h2>

          <form onSubmit={handleSubmitDraft} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                সংবাদের শিরোনাম *
              </label>
              <input
                type="text"
                required
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="মাঠপর্যায়ের সঠিক তথ্য সম্বলিত শিরোনাম..."
                className="input input-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                বিট / বিভাগ
              </label>
              <select
                value={beat}
                onChange={(e) => setBeat(e.target.value)}
                className="select select-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs font-semibold"
              >
                <option value="জাতীয়">জাতীয়</option>
                <option value="রাজনীতি">রাজনীতি</option>
                <option value="অর্থনীতি">অর্থনীতি</option>
                <option value="খেলা">খেলা</option>
                <option value="প্রযুক্তি">প্রযুক্তি</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                প্রতিবেদনের বিস্তারিত বক্তব্য *
              </label>
              <textarea
                rows={8}
                required
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                placeholder="এখানে আপনার সম্পূর্ণ রিপোর্ট লিখুন..."
                className="textarea textarea-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn w-full bg-red-700 hover:bg-red-800 text-white font-bold border-none rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "জমা হচ্ছে..." : "বার্তা সম্পাদকের অনুমোদনের জন্য জমা দিন"}</span>
            </button>
          </form>
        </div>

        {/* Right: My Assignments (Col-span 4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>আমার বরাদ্দকৃত বিট ও অ্যাসাইনমেন্ট</span>
            </h3>

            <div className="space-y-2.5">
              {myAssignments.map((a) => (
                <div key={a.id} className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl space-y-1 text-xs">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100 block">
                    {a.title}
                  </span>
                  <div className="flex justify-between text-neutral-400 text-[11px]">
                    <span>ডেডলাইন: {a.deadline}</span>
                    <span className="font-bold text-amber-600">{a.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
