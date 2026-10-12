"use client";

import { useState } from "react";
import Link from "next/link";
import { Radio, Play, Pause, Download, Volume2, Clock, Calendar, ChevronRight, Headphones } from "lucide-react";

interface PodcastItem {
  id: string;
  episode: string;
  title: string;
  duration: string;
  date: string;
  audioUrl: string;
  description: string;
  host: string;
}

const episodes: PodcastItem[] = [
  {
    id: "pod-1",
    episode: "পর্ব ৪২",
    title: "অর্থনীতির হালচাল: ডলার সংকট কি কাটছে ও রিজার্ভ রক্ষার উপায়",
    duration: "২২ মিনিট",
    date: "১২ অক্টোবর ২০২৬",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    description: "দেশের শীর্ষ অর্থনৈতিক বিশ্লেষকদের সাথে নিয়ে বাংলাদেশ ব্যাংকের নতুন মুদ্রা নীতি ও রেমিট্যান্স গতিপ্রকৃতি বিশ্লেষণ।",
    host: "মাহমুদুর রহমান (অর্থনীতি সম্পাদক)",
  },
  {
    id: "pod-2",
    episode: "পর্ব ৪১",
    title: "টেকটক বাংলা: এআই যুগে সাংবাদিকতা ও চিপ শিল্পের রূপান্তর",
    duration: "১৮ মিনিট",
    date: "১০ অক্টোবর ২০২৬",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    description: "কৃত্রিম বুদ্ধিমত্তা কীভাবে সংবাদ পরিবেশন ও ফ্যাক্ট-চেকিং পরিবর্তন করছে, তা নিয়ে বিশেষ কথিকা।",
    host: "তানভীর হাসান (প্রযুক্তি প্রতিবেদক)",
  },
  {
    id: "pod-3",
    episode: "পর্ব ৪০",
    title: "আন্তর্জাতিক ডায়েরি: মধ্যপ্রাচ্যের ভূ-রাজনীতি ও প্রবাসী বাংলাদেশিরা",
    duration: "২৫ মিনিট",
    date: "০৭ অক্টোবর ২০২৬",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    description: "লোহিত সাগরে চলমান সংঘাত ও প্রবাসী রেমিট্যান্স যোদ্ধাদের নিরাপত্তা পরিস্থিতি নিয়ে বিশেষ আলোচনা।",
    host: "ফারহানা আফরোজ (কূটনৈতিক বিশ্লেষক)",
  },
];

export default function PodcastsPage() {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastItem>(episodes[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlay = (ep: PodcastItem) => {
    if (currentEpisode.id === ep.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentEpisode(ep);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">পডকাস্ট অডিও প্ল্যাটফর্ম</span>
      </nav>

      {/* Featured Podcast Hero Player */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-red-950 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          {/* Album Vinyl Art */}
          <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-2xl overflow-hidden bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center shadow-xl shrink-0">
            <Radio className="h-20 w-20 text-white/90 animate-pulse" />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300">
              {currentEpisode.episode}
            </div>
          </div>

          {/* Details & Audio Controls */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                বাংলা নিউজ২৪ অডিও
              </span>
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{currentEpisode.duration}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {currentEpisode.title}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              {currentEpisode.description}
            </p>

            <span className="text-xs text-amber-400 block font-semibold">
              উপস্থাপনায়: {currentEpisode.host}
            </span>

            {/* Audio Element & Controls */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => togglePlay(currentEpisode)}
                className="btn btn-lg bg-red-600 hover:bg-red-700 text-white border-none rounded-2xl px-8 flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}
                <span className="font-bold">{isPlaying ? "পজ করুন" : "শুনুন"}</span>
              </button>

              <audio
                controls
                src={currentEpisode.audioUrl}
                className="w-full sm:w-72 h-10 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Episode Catalog */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-red-700 pb-2">
          <Headphones className="h-5 w-5 text-red-700" />
          <h2 className="text-xl font-black text-neutral-900 dark:text-neutral-100">
            সকল পডকাস্ট পর্বসমূহ
          </h2>
        </div>

        <div className="grid gap-4">
          {episodes.map((ep) => {
            const isCurrent = currentEpisode.id === ep.id;
            return (
              <div
                key={ep.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? "bg-red-50/60 dark:bg-neutral-800 border-red-400 dark:border-red-800 shadow-sm"
                    : "bg-white dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300"
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <button
                    onClick={() => togglePlay(ep)}
                    className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-transform hover:scale-105 ${
                      isCurrent && isPlaying
                        ? "bg-red-700 text-white animate-pulse"
                        : "bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-red-700 hover:text-white"
                    }`}
                  >
                    {isCurrent && isPlaying ? (
                      <Pause className="h-5 w-5 fill-current" />
                    ) : (
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="font-bold text-red-600 dark:text-red-400">{ep.episode}</span>
                      <span className="text-neutral-400">• {ep.date}</span>
                      <span className="text-neutral-400">• {ep.duration}</span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                      {ep.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                      {ep.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <a
                    href={ep.audioUrl}
                    download
                    className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors"
                    title="ডাউনলোড করুন"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
