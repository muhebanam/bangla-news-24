"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MessageSquare, Send, ShieldCheck, Heart, Reply } from "lucide-react";

interface CommentItem {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: number;
  status: string;
  createdAt: string;
  replies?: {
    userName: string;
    content: string;
    createdAt: string;
  }[];
}

export default function CommentsSection({ newsId }: { newsId: string }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [newsId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?newsId=${newsId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setComments(data.data);
        }
      }
    } catch (e) {
      console.warn("Comments fetch:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম ও মন্তব্য লিখুন");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newsId,
          userName: name.trim(),
          content: content.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "মন্তব্য সফলভাবে জমা হয়েছে!");
        setContent("");
        fetchComments();
      } else {
        toast.error(data.error || "মন্তব্য জমা দেওয়া যায়নি");
      }
    } catch {
      toast.error("সার্ভার ত্রুটি হয়েছে");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-red-600" />
          <h3 className="font-extrabold text-lg text-neutral-900 dark:text-neutral-100">
            মন্তব্যসমূহ ({comments.length})
          </h3>
        </div>
        <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>এআই মডারেটেড ও সুরক্ষিত</span>
        </span>
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmit} className="bg-neutral-50 dark:bg-neutral-800/60 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম লিখুন..."
            className="input input-sm bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-sm rounded-lg"
          />
        </div>
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="আপনার সুচিন্তিত মতামত লিখুন (উসকানিমূলক বা কুরুচিপূর্ণ মন্তব্য এড়িয়ে চলুন)..."
          className="textarea textarea-sm w-full bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-sm rounded-lg"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-sm bg-red-700 hover:bg-red-800 text-white border-none rounded-lg flex items-center gap-1.5 px-4"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isSubmitting ? "পাঠানো হচ্ছে..." : "মন্তব্য প্রকাশ করুন"}</span>
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-xs text-neutral-500 text-center py-4">
            এখনও কোনো মন্তব্য করা হয়নি। আপনার মতামত দিয়ে প্রথম অংশগ্রহণকারী হোন!
          </p>
        ) : (
          comments.map((comm) => (
            <div
              key={comm.id}
              className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-2 text-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-xs flex items-center justify-center">
                    {comm.userName[0]}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100 block">
                      {comm.userName}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {new Date(comm.createdAt).toLocaleDateString("bn-BD")}
                    </span>
                  </div>
                </div>

                {comm.status === "flagged" && (
                  <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-semibold">
                    পর্যালোচনাধীন
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {comm.content}
              </p>

              {comm.replies && comm.replies.length > 0 && (
                <div className="mt-2 pl-4 border-l-2 border-red-300 dark:border-red-900 space-y-2 pt-1">
                  {comm.replies.map((reply, rIdx) => (
                    <div key={rIdx} className="bg-neutral-50 dark:bg-neutral-900/60 p-2.5 rounded-lg text-xs">
                      <span className="font-bold text-red-700 dark:text-red-400 block mb-0.5">
                        {reply.userName}
                      </span>
                      <p className="text-neutral-600 dark:text-neutral-300">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
