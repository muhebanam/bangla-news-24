"use client";

import { useState } from "react";
import Link from "next/link";
import { Tv, Radio, Send, Users, Clock, ShieldCheck, ChevronRight, Zap } from "lucide-react";
import toast from "react-hot-toast";

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
}

const initialMessages: ChatMessage[] = [
  { id: "c1", sender: "নাজমুল হুদা (ঢাকা)", text: "লাইভ সম্প্রচারের পিকচার কোয়ালিটি খুব ভালো। ধন্যবাদ বাংলা নিউজ২৪!", time: "১২:৪০" },
  { id: "c2", sender: "সাইদুর রহমান (সিলেট)", text: "প্রেস ব্রিফিংয়ের মূল সারাংশ কি বুলেটিনে দেওয়া হবে?", time: "১২:৪২" },
  { id: "c3", sender: "মিথিলা (চট্টগ্রাম)", text: "শিক্ষা খাতের সংস্কার নিয়ে আলোচনা অনুষ্ঠানটি কখন শুরু হবে?", time: "১২:৪৫" },
];

const programSchedule = [
  { time: "১২:০০ - ০১:০০", title: "দুপুরের সংবাদ বুলেটিন (সরাসরি)", status: "চলমান" },
  { time: "০১:০০ - ০২:০০", title: "অর্থনীতি ডায়ালগ: ব্যাংকিং সংকট ও সংস্কার", status: "আসন্ন" },
  { time: "০২:০০ - ০৩:০০", title: "আন্তর্জাতিক খবর ও বিশ্লেষণ", status: "আসন্ন" },
  { time: "০৩:০০ - ০৪:৩০", title: "টকশো: আগামীর বাংলাদেশ", status: "আসন্ন" },
];

export default function LiveTvPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [chatInput, setChatInput] = useState("");
  const [viewerCount, setViewerCount] = useState(14820);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: "c-" + Date.now(),
      sender: "আপনি (পাঠক)",
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput("");
    toast.success("বার্তা সফলভাবে পাঠানো হয়েছে!");
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">লাইভ টিভি সম্প্রচার</span>
      </nav>

      {/* Main Studio Stream + Live Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stream Video Player (Col-span 8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-neutral-800 shadow-2xl">
            <video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              controls
              autoPlay
              muted
              poster="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80"
              className="w-full h-full object-cover"
            />
            {/* Live TV Overlays */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-red-700 text-white font-black text-xs px-3 py-1 rounded-md shadow-md flex items-center gap-1.5 animate-pulse">
                <span className="h-2 w-2 rounded-full bg-white"></span>
                <span>LIVE TV</span>
              </span>
              <span className="bg-black/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-semibold">
                <Users className="h-3.5 w-3.5 text-red-400" />
                <span>{viewerCount.toLocaleString("bn-BD")} দর্শক</span>
              </span>
            </div>

            {/* Breaking News Ticker on Bottom of Stream */}
            <div className="absolute bottom-0 left-0 right-0 bg-red-700/95 text-white py-1.5 px-4 text-xs font-bold flex items-center gap-2">
              <span className="bg-red-950 px-2 py-0.5 rounded text-[10px] uppercase">ব্রেকিং</span>
              <span className="truncate">বাংলাদেশ ব্যাংকের নতুন আর্থিক নীতিমালা: রিজার্ভ বৃদ্ধি ও মূল্যস্ফীতি নিয়ন্ত্রণে কঠোর নির্দেশনা...</span>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100">
              বাংলা নিউজ২৪ সার্বক্ষণিক সরাসরি সম্প্রচার (24/7 Live Stream)
            </h1>
            <p className="text-xs text-neutral-500">
              এইচডি গুণমানে দেশের সকল জাতীয় ও আন্তর্জাতিক ঘটনা, টকশো ও প্রেস ব্রিফিংয়ের অবিরত সরাসরি সম্প্রচার।
            </p>
          </div>
        </div>

        {/* Live Chat & EPG (Col-span 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Chat Box */}
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-3xl p-4 shadow-sm flex flex-col h-96">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-700">
              <span className="font-extrabold text-sm text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                <span>সরাসরি দর্শক প্রতিক্রিয়া</span>
              </span>
              <span className="text-[10px] text-neutral-400">এআই ফিল্টার্ড</span>
            </div>

            {/* Chat Messages Scroll */}
            <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-xs">
              {messages.map((m) => (
                <div key={m.id} className="bg-neutral-50 dark:bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800 space-y-1">
                  <div className="flex items-center justify-between font-bold text-neutral-700 dark:text-neutral-300">
                    <span className="text-red-700 dark:text-red-400">{m.sender}</span>
                    <span className="text-[10px] text-neutral-400 font-normal">{m.time}</span>
                  </div>
                  <p className="text-neutral-800 dark:text-neutral-200">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Send Chat */}
            <form onSubmit={handleSendMessage} className="pt-2 border-t border-neutral-200 dark:border-neutral-700 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="মতামত লিখুন..."
                className="input input-sm bg-neutral-100 dark:bg-neutral-900 border-none text-xs rounded-xl flex-1 focus:outline-none"
              />
              <button type="submit" className="btn btn-sm bg-red-700 hover:bg-red-800 text-white border-none rounded-xl px-3">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

          {/* Program Schedule (EPG) */}
          <div className="bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-3xl p-5 space-y-3 text-xs">
            <h3 className="font-extrabold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 pb-2 border-b border-neutral-200 dark:border-neutral-700">
              <Clock className="h-4 w-4 text-red-600" />
              <span>আজকের অনুষ্ঠানসূচি (EPG)</span>
            </h3>

            <div className="space-y-2.5">
              {programSchedule.map((prog, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-700/60 last:border-none">
                  <div>
                    <span className="text-[11px] font-bold text-neutral-500 block">{prog.time}</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{prog.title}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      prog.status === "চলমান"
                        ? "bg-red-600 text-white animate-pulse"
                        : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    {prog.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
