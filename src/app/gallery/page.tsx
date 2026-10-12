"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, X, ChevronRight, Share2, ZoomIn } from "lucide-react";
import toast from "react-hot-toast";

interface PhotoEssay {
  id: string;
  title: string;
  category: string;
  photographer: string;
  imageUrl: string;
  caption: string;
}

const photoStories: PhotoEssay[] = [
  {
    id: "photo-1",
    title: "বৃষ্টিভেজা কারওয়ান বাজার ও ব্যস্ত ঢাকা",
    category: "নগর জীবন",
    photographer: "সৌরভ মজুমদার (প্রধান ফটোসাংবাদিক)",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80",
    caption: "শরতের সকালে ঝুম বৃষ্টিতে ছাতা মাথায় নিত্যদিনের জীবিকার তাগিদে ছুটছেন রাজধানীবাসী।",
  },
  {
    id: "photo-2",
    title: "শরতের কাশবন ও রূপসী বাংলার আবহমান রূপ",
    category: "প্রকৃতি ও পরিবেশ",
    photographer: "তানজিলা হক",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    caption: "মেঘনা নদীর তীরে সাদা মেঘ আর কাশবনের দোলায় প্রকৃতির অপরূপ সাজ।",
  },
  {
    id: "photo-3",
    title: "মিরপুর স্টেডিয়ামে উল্লাস: দর্শকের চোখে জয়োল্লাস",
    category: "খেলাধুলা",
    photographer: "আসিফ ইকবাল",
    imageUrl: "https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1200&q=80",
    caption: "বাংলাদেশ দলের নাটকীয় সিরিজ জয়ে শের-ই-বাংলা স্টেডিয়ামের গ্যালারিতে লাল-সবুজের পতাকা হাতে আনন্দোৎসব।",
  },
  {
    id: "photo-4",
    title: "হাইটেক ল্যাবে চিপ ইঞ্জিনিয়ারদের নতুন আবিষ্কার",
    category: "তথ্যপ্রযুক্তি",
    photographer: "শাহরিয়ার নাফিস",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    caption: "বঙ্গবন্ধু হাইটেক সিটিতে দেশীয় সিলিকন চিপ টেস্টিং কার্যক্রমে একাগ্র তরুণ প্রকৌশলীরা।",
  },
  {
    id: "photo-5",
    title: "জলবায়ু সম্মেলনে প্ল্যাকার্ড হাতে তরুণদের প্রতিবাদ",
    category: "আন্তর্জাতিক",
    photographer: "রয়টার্স / বাংলা নিউজ২৪ পুল",
    imageUrl: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?auto=format&fit=crop&w=1200&q=80",
    caption: "বৈশ্বিক তাপমাত্রা বৃদ্ধি রোধে জরুরি তহবিলের দাবিতে সম্মেলন হলের বাইরে যুব জলবায়ু কর্মীদের সমাবেশ।",
  },
  {
    id: "photo-6",
    title: "কান উৎসবের মঞ্চে লাল গালিচায় দেশের নির্মাতা",
    category: "সংস্কৃতি",
    photographer: "এএফপি",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    caption: "আন্তর্জাতিক চলচ্চিত্র বোদ্ধাদের করতালির জবাবে মাথা নত করে অভিবাদন জানাচ্ছেন তরুণ চলচ্চিত্রকার।",
  },
];

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoEssay | null>(null);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">ফটো গ্যালারি</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-2">
        <div className="flex items-center gap-2 text-amber-400">
          <Camera className="h-6 w-6" />
          <span className="text-xs font-bold uppercase tracking-widest">ভিজ্যুয়াল জার্নালিজম</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">ছবিতে আজকের বাংলাদেশ ও বিশ্ব</h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
          ক্যামেরার লেন্সে বন্দী হওয়া মুহূর্তগুলো বলে দেয় হাজারো অব্যক্ত কাহিনী। ফটো সাংবাদিকদের তোলা নির্বাচিত শীর্ষ ছবি।
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photoStories.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group cursor-pointer bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all"
          >
            <div className="relative h-64 w-full bg-neutral-900 overflow-hidden">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                  <ZoomIn className="h-6 w-6" />
                </div>
              </div>
              <span className="absolute top-3 left-3 bg-red-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                {photo.category}
              </span>
            </div>

            <div className="p-4 space-y-1.5">
              <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 transition-colors leading-snug">
                {photo.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                {photo.caption}
              </p>
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="truncate max-w-[200px]">ছবি: {photo.photographer}</span>
                <span className="text-red-600 font-semibold">বড় করে দেখুন</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-80 sm:h-[450px] w-full bg-black">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 text-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-red-700 text-white text-xs font-bold px-2.5 py-0.5 rounded">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs text-neutral-400">ছবি: {selectedPhoto.photographer}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">{selectedPhoto.title}</h2>
              <p className="text-sm text-neutral-300 leading-relaxed">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
