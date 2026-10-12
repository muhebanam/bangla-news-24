"use client";

import { useState } from "react";
import {
  Compass,
  Radio,
  Server,
  Activity,
  AlertOctagon,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

export default function CommandCenterPage() {
  const [crisisMode, setCrisisMode] = useState(false);

  const toggleCrisis = () => {
    setCrisisMode(!crisisMode);
    toast.success(
      crisisMode
        ? "জরুরি সংকট মোড নিষ্ক্রিয় করা হয়েছে"
        : "সতর্কতা: জরুরি ব্রেকিং ক্রাইসিস মোড সক্রিয় করা হয়েছে!"
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              সেন্ট্রাল অপারেশনাল হাব
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Compass className="h-7 w-7 text-red-600" />
            <span>এক্সিকিউটিভ কমান্ড সেন্টার (Command Center)</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            প্রধান সম্পাদক ও প্রকাশকের জন্য সার্বক্ষণিক একনজরে সম্পূর্ণ ডিজিটাল ইকোসিস্টেম মনিটরিং
          </p>
        </div>

        {/* Crisis Mode Emergency Toggle */}
        <button
          onClick={toggleCrisis}
          className={`btn btn-sm rounded-xl font-bold border-none shadow-md flex items-center gap-2 ${
            crisisMode
              ? "bg-rose-600 text-white animate-pulse"
              : "bg-neutral-900 text-white hover:bg-neutral-800"
          }`}
        >
          <AlertOctagon className="h-4 w-4" />
          <span>{crisisMode ? "জরুরি ক্রাইসিস মোড সচল" : "জরুরি ক্রাইসিস মোড চালু করুন"}</span>
        </button>
      </div>

      {crisisMode && (
        <div className="bg-rose-950 text-rose-200 p-4 rounded-2xl border border-rose-800 flex items-center gap-3 text-xs animate-in fade-in">
          <AlertOctagon className="h-5 w-5 text-rose-400 shrink-0" />
          <div>
            <strong className="block font-bold text-white text-sm">জরুরি সতর্কবার্তা সক্রিয় রয়েছে</strong>
            <span>সাইটের সকল ব্যানার শীর্ষ ব্রেকিং নিউজে রূপান্তরিত হবে এবং পুশ নোটিফিকেশন অগ্রাধিকার পাবে।</span>
          </div>
        </div>
      )}

      {/* Grid of Command Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Server className="h-4 w-4 text-emerald-600" />
              <span>সার্ভার ও সিডিএন অবকাঠামো</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              ১০০% আপটাইম
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500">ঢাকা প্রাইমারি ক্লাউড নোড:</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200">সক্রিয় (১২ মি.সে.)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">সিঙ্গাপুর ব্যাকআপ সিডিএন:</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200">সিঙ্কড (৯৯.৯৮%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">ডাটাবেজ কানেকশন পুল:</span>
              <span className="font-bold text-emerald-600">রেডি ও অপ্টিমাইজড</span>
            </div>
          </div>
        </div>

        {/* Editorial Velocity */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <span>সম্পাদকীয় গতিবেগ (Velocity)</span>
            </h3>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              উচ্চ গতি
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500">প্রতি ঘণ্টায় প্রকাশিত সংবাদ:</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200">৪.২ টি</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">খসড়া অনুমোদন গড় সময়:</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200">১৮ মিনিট</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">সক্রিয় সাংবাদিক ও রিপোর্টার:</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200">১২ জন অন-ডিউটি</span>
            </div>
          </div>
        </div>

        {/* Financial & Monetization Health */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-amber-600" />
              <span>মনিটাইজেশন ও রাজস্ব প্রবৃদ্ধি</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              +২৩% গ্রোথ
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-neutral-500">আজকের বিজ্ঞাপন রেভিনিউ:</span>
              <span className="font-bold text-emerald-600">৳১২,৪০০</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">নতুন প্রিমিয়াম গ্রাহক:</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200">+৩৬ জন আজ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">কর্পোরেট পার্টনারশিপ:</span>
              <span className="font-bold text-neutral-800 dark:text-neutral-200">৪টি সক্রিয় চুক্তি</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
