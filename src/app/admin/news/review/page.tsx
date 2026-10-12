"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, RotateCcw, Eye, ArrowLeft, MessageSquare, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface ReviewItem {
  id: string;
  title: string;
  category: string;
  author: string;
  summary: string;
  submittedAt: string;
  status: "pending" | "approved" | "revision" | "rejected";
  editorNotes?: string;
}

const initialQueue: ReviewItem[] = [
  {
    id: "rev-1",
    title: "আইসিটি খাতের যুগান্তকারী অগ্রগতি: দেশীয় সেমিকন্ডাক্টরে ৫০০ কোটি টাকার নতুন তহবিল",
    category: "প্রযুক্তি",
    author: "তানভীর হাসান (প্রযুক্তি প্রতিবেদক)",
    summary: "হাইটেক পার্ক কর্তৃপক্ষ জানিয়েছে আগামী তিন বছরে অন্তত ১০ হাজার স্থানীয় সফটওয়্যার এবং হার্ডওয়্যার ইঞ্জিনিয়ারকে প্রশিক্ষণ দেওয়া হবে।",
    submittedAt: "আজ সকাল ০৯:৩০",
    status: "pending",
  },
  {
    id: "rev-2",
    title: "রাজধানীর বায়ুমান সূচক: নতুন সিগন্যালে স্বস্তি নাকি যানজট বৃদ্ধি?",
    category: "পরিবেশ",
    author: "রাশেদুল ইসলাম (নগর প্রতিবেদক)",
    summary: "দুই সিটি কর্পোরেশনের সাম্প্রতিক পদক্ষেপ এবং বায়ুদূষণ রোধে স্থাপিত মনিটরিং স্টেশনগুলোর কার্যকারিতা নিয়ে অনুসন্ধান।",
    submittedAt: "গতকাল রাত ১১:১৫",
    status: "pending",
  },
];

export default function EditorialReviewPage() {
  const [queue, setQueue] = useState<ReviewItem[]>(initialQueue);
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(initialQueue[0] || null);
  const [feedback, setFeedback] = useState("");

  const handleAction = async (status: "approved" | "revision" | "rejected") => {
    if (!selectedItem) return;

    const statusBn =
      status === "approved"
        ? "অনুমোদিত ও প্রকাশিত"
        : status === "revision"
        ? "সংশোধন চেয়ে ফেরত পাঠানো"
        : "প্রত্যাখ্যাত";

    setQueue((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id ? { ...item, status, editorNotes: feedback } : item
      )
    );

    toast.success(`সংবাদটি ${statusBn} হয়েছে!`);
    setFeedback("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
            সম্পাদকীয় পর্যালোচনা ও অনুমোদন ডেক্স
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            বার্তা সম্পাদকের ডেস্কে পর্যালোচনার জন্য জমা থাকা খসড়া প্রতিবেদন
          </p>
        </div>
      </div>

      {/* Review Workflow Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pending Submissions Queue (Col-span 5) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-2 text-xs font-bold text-neutral-600 dark:text-neutral-400">
            <span>অপেক্ষমাণ তালিকা ({queue.length})</span>
            <span>সর্বশেষ জমা</span>
          </div>

          {queue.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all space-y-2 ${
                  isSelected
                    ? "bg-white dark:bg-neutral-800 border-red-600 shadow-md ring-2 ring-red-500/10"
                    : "bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300"
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-neutral-400">{item.submittedAt}</span>
                </div>

                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
                  <span>প্রতিবেদক: {item.author}</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      item.status === "approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.status === "revision"
                        ? "bg-amber-100 text-amber-800"
                        : item.status === "rejected"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {item.status === "approved"
                      ? "অনুমোদিত"
                      : item.status === "revision"
                      ? "সংশোধন দরকার"
                      : item.status === "rejected"
                      ? "বাতিল"
                      : "পর্যালোচনাধীন"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Article Review & Action Panel (Col-span 7) */}
        {selectedItem && (
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <span className="bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-md inline-block">
                {selectedItem.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 leading-tight">
                {selectedItem.title}
              </h2>
              <div className="text-xs text-neutral-500 flex items-center justify-between pt-1">
                <span>প্রতিবেদক: {selectedItem.author}</span>
                <span>জমাদানের সময়: {selectedItem.submittedAt}</span>
              </div>
            </div>

            {/* Article Excerpt */}
            <div className="bg-neutral-50 dark:bg-neutral-800/60 p-4 rounded-2xl text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed border border-neutral-100 dark:border-neutral-700">
              <span className="font-bold block text-neutral-900 dark:text-white mb-1">
                প্রতিবেদনের সারসংক্ষেপ:
              </span>
              {selectedItem.summary}
            </div>

            {/* Editorial Feedback Notes Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">
                সম্পাদকের মন্তব্য বা সংশোধনী নির্দেশনা (Editor Feedback):
              </label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="প্রতিবেদককে কোনো তথ্য সংযোজন বা পরিবর্তন করতে বলতে এখানে লিখুন..."
                className="textarea bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 w-full text-xs rounded-xl"
              />
            </div>

            {/* Review Decision Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleAction("approved")}
                className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl flex items-center gap-1.5 px-4 font-bold shadow-sm"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>অনুমোদন ও প্রকাশ করুন</span>
              </button>

              <button
                onClick={() => handleAction("revision")}
                className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-neutral-950 border-none rounded-xl flex items-center gap-1.5 px-4 font-bold"
              >
                <RotateCcw className="h-4 w-4" />
                <span>সংশোধন চেয়ে ফেরত পাঠান</span>
              </button>

              <button
                onClick={() => handleAction("rejected")}
                className="btn btn-sm bg-rose-600 hover:bg-rose-700 text-white border-none rounded-xl flex items-center gap-1.5 px-4 font-bold"
              >
                <XCircle className="h-4 w-4" />
                <span>বাতিল করুন</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
