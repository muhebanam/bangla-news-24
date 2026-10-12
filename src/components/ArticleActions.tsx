"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Printer,
  Copy,
  MessageCircle,
  ThumbsUp,
  Heart,
  Frown,
  AlertCircle,
  Smile,
} from "lucide-react";

interface ArticleActionsProps {
  articleId: string;
  title: string;
  textToRead?: string;
  initialReactions?: {
    like: number;
    love: number;
    sad: number;
    angry: number;
    wow: number;
  };
}

export default function ArticleActions({
  articleId,
  title,
  textToRead = "",
  initialReactions = { like: 24, love: 12, sad: 2, angry: 1, wow: 8 },
}: ArticleActionsProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reactions, setReactions] = useState(initialReactions);
  const [userReacted, setUserReacted] = useState<string | null>(null);

  // Bengali Text-to-Speech using browser SpeechSynthesis
  const toggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast.error("আপনার ব্রাউজারে অডিও স্পিচ ফিচার সমর্থিত নয়");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      toast("অডিও বন্ধ করা হয়েছে");
    } else {
      const utterance = new SpeechSynthesisUtterance(`${title}. ${textToRead.slice(0, 400)}`);
      utterance.lang = "bn-BD";
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      toast.success("অডিও সংবাদ শুরু হয়েছে");
    }
  };

  const handleShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("লিংক কপি করা হয়েছে!");
      return;
    }
    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    }
    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank");
    }
    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`, "_blank");
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "বুকমার্ক সরানো হয়েছে" : "সংবাদটি সেভ করা হয়েছে!");
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleReaction = async (type: "like" | "love" | "sad" | "angry" | "wow") => {
    if (userReacted === type) return;

    setReactions((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));
    setUserReacted(type);
    toast.success("আপনার প্রতিক্রিয়া গ্রহণ করা হয়েছে!");

    try {
      await fetch(`/api/news/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reaction", reactionType: type }),
      });
    } catch (e) {
      console.warn("Reaction update error:", e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-neutral-200 dark:border-neutral-800 text-xs">
        {/* Left: Audio & Font Size */}
        <div className="flex items-center gap-2">
          {/* AI Speech Reader */}
          <button
            onClick={toggleSpeech}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold border transition-all ${
              isPlayingAudio
                ? "bg-red-700 text-white border-red-700 animate-pulse"
                : "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/60 hover:bg-red-100"
            }`}
          >
            {isPlayingAudio ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span>{isPlayingAudio ? "অডিও থামান" : "সংবাদটি শুনুন"}</span>
          </button>

          {/* Text Size Control */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-0.5 border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => {
                setFontSize("sm");
                document.documentElement.style.setProperty("--article-font-size", "15px");
              }}
              className={`px-2 py-1 rounded text-xs font-semibold ${fontSize === "sm" ? "bg-white dark:bg-neutral-700 shadow-xs" : ""}`}
              title="ছোট ফন্ট"
            >
              A-
            </button>
            <button
              onClick={() => {
                setFontSize("md");
                document.documentElement.style.setProperty("--article-font-size", "17px");
              }}
              className={`px-2 py-1 rounded text-xs font-semibold ${fontSize === "md" ? "bg-white dark:bg-neutral-700 shadow-xs" : ""}`}
              title="সাধারণ ফন্ট"
            >
              A
            </button>
            <button
              onClick={() => {
                setFontSize("lg");
                document.documentElement.style.setProperty("--article-font-size", "20px");
              }}
              className={`px-2 py-1 rounded text-xs font-semibold ${fontSize === "lg" ? "bg-white dark:bg-neutral-700 shadow-xs" : ""}`}
              title="বড় ফন্ট"
            >
              A+
            </button>
          </div>
        </div>

        {/* Right: Social Share, Print, Bookmark */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleShare("facebook")}
            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 transition-colors"
            title="ফেসবুকে শেয়ার"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="p-2 rounded-lg bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-600 transition-colors"
            title="এক্সে শেয়ার"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          <button
            onClick={() => handleShare("whatsapp")}
            className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 transition-colors"
            title="হোয়াটসঅ্যাপে পাঠান"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleShare("copy")}
            className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 transition-colors"
            title="লিংক কপি করুন"
          >
            <Copy className="h-4 w-4" />
          </button>

          <span className="h-4 w-px bg-neutral-200 dark:bg-neutral-700 mx-1" />

          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked
                ? "bg-red-700 text-white"
                : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
            }`}
            title="সংরক্ষণ করুন"
          >
            <Bookmark className="h-4 w-4" />
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 transition-colors hidden sm:flex"
            title="প্রিন্ট করুন"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Reader Reactions Bar */}
      <div className="bg-neutral-50 dark:bg-neutral-800/60 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700">
        <span className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-3 text-center">
          এই সংবাদের ব্যাপারে আপনার অনুভূতি কী?
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => handleReaction("like")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
              userReacted === "like"
                ? "bg-blue-600 text-white border-blue-600 scale-105"
                : "bg-white dark:bg-neutral-800 hover:bg-blue-50 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700"
            }`}
          >
            <ThumbsUp className="h-3.5 w-3.5 text-blue-500" />
            <span>ভালো ({reactions.like})</span>
          </button>

          <button
            onClick={() => handleReaction("love")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
              userReacted === "love"
                ? "bg-red-600 text-white border-red-600 scale-105"
                : "bg-white dark:bg-neutral-800 hover:bg-red-50 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700"
            }`}
          >
            <Heart className="h-3.5 w-3.5 text-red-500" />
            <span>ভালোবাসা ({reactions.love})</span>
          </button>

          <button
            onClick={() => handleReaction("wow")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
              userReacted === "wow"
                ? "bg-amber-600 text-white border-amber-600 scale-105"
                : "bg-white dark:bg-neutral-800 hover:bg-amber-50 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700"
            }`}
          >
            <Smile className="h-3.5 w-3.5 text-amber-500" />
            <span>বিস্ময় ({reactions.wow})</span>
          </button>

          <button
            onClick={() => handleReaction("sad")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
              userReacted === "sad"
                ? "bg-purple-600 text-white border-purple-600 scale-105"
                : "bg-white dark:bg-neutral-800 hover:bg-purple-50 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700"
            }`}
          >
            <Frown className="h-3.5 w-3.5 text-purple-500" />
            <span>দুঃখ ({reactions.sad})</span>
          </button>

          <button
            onClick={() => handleReaction("angry")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
              userReacted === "angry"
                ? "bg-rose-700 text-white border-rose-700 scale-105"
                : "bg-white dark:bg-neutral-800 hover:bg-rose-50 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700"
            }`}
          >
            <AlertCircle className="h-3.5 w-3.5 text-rose-600" />
            <span>ক্ষোভ ({reactions.angry})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
