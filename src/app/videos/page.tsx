"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Video, Play, Eye, Clock, Share2, Sparkles, ChevronRight } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl: string;
  timeAgo: string;
  description?: string;
}

const initialVideos: VideoItem[] = [
  {
    id: "vid-1",
    title: "বুলেটিন: আজকের শীর্ষ খবর ও রাজনৈতিক পরিস্থিতি পর্যালোচনা",
    category: "সংবাদ বুলেটিন",
    duration: "০৮:৪৫",
    views: "৪৫ হাজার",
    thumbnail: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    timeAgo: "২ ঘণ্টা আগে",
    description: "প্রধান উপদেষ্টার বৈঠক, রিজার্ভের সর্বশেষ পরিস্থিতি ও শিক্ষা প্রতিষ্ঠানের সংস্কার নিয়ে আজকের পূর্ণাঙ্গ ভিডিও বুলেটিন।",
  },
  {
    id: "vid-2",
    title: "বিশেষ সাক্ষাৎকার: 'বাংলাদেশ ব্যাংক কীভাবে রিজার্ভ রক্ষা করছে' - গভর্নর",
    category: "সাক্ষাৎকার",
    duration: "১৪:২০",
    views: "২৮ হাজার",
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    timeAgo: "৪ ঘণ্টা আগে",
    description: "ব্যাংকিং সংস্কার, খেলাপি ঋণ এবং আইএমএফ ঋণ ছাড়ের বিষয়ে বিস্তারিত খোলামেলা সাক্ষাৎকার।",
  },
  {
    id: "vid-3",
    title: "অনুসন্ধানী রিপোর্ট: তিস্তা ব্যারেজ প্রকল্পের বর্তমান চিত্র ও কৃষকদের অভিমত",
    category: "অনুসন্ধান",
    duration: "১১:১০",
    views: "৬২ হাজার",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    timeAgo: "১ দিন আগে",
    description: "উত্তরাঞ্চলের কৃষকদের সেচ সংকট ও তিস্তা মহাপরিকল্পনার বাস্তব অগ্রগতি নিয়ে মাঠপর্যায়ের অনুসন্ধান।",
  },
  {
    id: "vid-4",
    title: "স্পেশাল ফিচার: ঢাকা টু কক্সবাজার নতুন ননস্টপ ট্রেন ও যাত্রী অনুভূতি",
    category: "ফিচার",
    duration: "০৬:৩০",
    views: "৫১ হাজার",
    thumbnail: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    timeAgo: "২ দিন আগে",
    description: "রেলওয়ের আধুনিকায়ন ও পর্যটন নগরীতে দ্রুত যাতায়াতের নতুন দিগন্ত।",
  },
];

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(initialVideos[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("সকল");

  const categories = ["সকল", "সংবাদ বুলেটিন", "সাক্ষাৎকার", "অনুসন্ধান", "ফিচার"];

  const filtered =
    selectedCategory === "সকল"
      ? initialVideos
      : initialVideos.filter((v) => v.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">ভিডিও প্ল্যাটফর্ম</span>
      </nav>

      {/* Main Video Cinema Player Section */}
      <div className="bg-neutral-950 text-white rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Main Player Screen (Col-span 8) */}
          <div className="lg:col-span-8 p-4 sm:p-6 space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
              <video
                key={activeVideo.videoUrl}
                src={activeVideo.videoUrl}
                controls
                autoPlay={false}
                poster={activeVideo.thumbnail}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-red-700 text-white text-xs font-bold px-2.5 py-0.5 rounded">
                  {activeVideo.category}
                </span>
                <span className="text-xs text-neutral-400">{activeVideo.timeAgo}</span>
                <span className="text-xs text-neutral-400">• {activeVideo.views} দর্শন</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {activeVideo.title}
              </h1>
              {activeVideo.description && (
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {activeVideo.description}
                </p>
              )}
            </div>
          </div>

          {/* Playlist Queue (Col-span 4) */}
          <div className="lg:col-span-4 bg-neutral-900 border-t lg:border-t-0 lg:border-l border-neutral-800 p-4 sm:p-6 space-y-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="font-bold text-sm text-neutral-200">পরবর্তী ভিডিও প্লেলিস্ট</span>
              <span className="text-xs text-red-400 font-semibold">{initialVideos.length} টি ভিডিও</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[480px] pr-1">
              {initialVideos.map((vid) => {
                const isSelected = vid.id === activeVideo.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex gap-3 items-center ${
                      isSelected
                        ? "bg-red-950/80 border border-red-700/80"
                        : "bg-neutral-800/60 hover:bg-neutral-800 border border-transparent"
                    }`}
                  >
                    <div className="relative h-16 w-24 rounded-lg overflow-hidden shrink-0 bg-black">
                      <Image
                        src={vid.thumbnail}
                        alt={vid.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white fill-white" />
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] px-1 rounded text-white">
                        {vid.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-red-400 block mb-0.5">
                        {vid.category}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                        {vid.title}
                      </h4>
                      <span className="text-[10px] text-neutral-400 mt-1 block">
                        {vid.views}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Video Categories & Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-red-700 pb-2">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-red-700" />
            <h2 className="text-xl font-black text-neutral-900 dark:text-neutral-100">
              সকল ভিডিও গ্যালারি
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "bg-red-700 text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((vid) => (
            <div
              key={vid.id}
              onClick={() => {
                setActiveVideo(vid);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group cursor-pointer bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-44 w-full bg-neutral-900 overflow-hidden">
                <Image
                  src={vid.thumbnail}
                  alt={vid.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-red-700 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="h-4 w-4 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] px-1.5 py-0.5 rounded text-white font-medium">
                  {vid.duration}
                </span>
                <span className="absolute top-2 left-2 bg-red-700 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                  {vid.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {vid.title}
                </h3>
                <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>{vid.views} দর্শন</span>
                  <span>{vid.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
