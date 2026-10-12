import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle, HelpCircle, ChevronRight } from "lucide-react";

interface FactCheckItem {
  id: string;
  claim: string;
  verdict: "মিথ্যা" | "সত্য" | "বিভ্রান্তিকর";
  explanation: string;
  source: string;
  date: string;
  imageUrl: string;
}

const factChecks: FactCheckItem[] = [
  {
    id: "fc-1",
    claim: "সামাজিক মাধ্যমে দাবি: 'সকল মোবাইল রিচার্জে অতিরিক্ত ২০% করারোপ করা হয়েছে'",
    verdict: "মিথ্যা",
    explanation: "জাতীয় রাজস্ব বোর্ড (এনবিআর) এবং বিটিআরসি নিশ্চিত করেছে যে মোবাইল রিচার্জে অতিরিক্ত কোনো করারোপ করা হয়নি। ভাইরাল হওয়া সার্কুলারটি সম্পূর্ণ ভুয়া ও সম্পাদিত।",
    source: "এনবিআর ও বিটিআরসি আনুষ্ঠানিক বিজ্ঞপ্তি",
    date: "১১ অক্টোবর ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fc-2",
    claim: "দাবি: 'পদ্মা সেতুতে নতুন গতিসীমা ৮০ কিমি/ঘণ্টা নির্ধারণ'",
    verdict: "সত্য",
    explanation: "সেতু কর্তৃপক্ষ জানিয়েছে, যানচলাচলের শৃঙ্খলা ও নিরাপত্তা নিশ্চিত করতে নতুন ইলেকট্রনিক স্পিড মনিটরিং সিস্টেম চালু হয়েছে এবং গতিসীমা ৮০ কিমি নির্ধারণ করা হয়েছে।",
    source: "বাংলাদেশ সেতু কর্তৃপক্ষ (বাসেক)",
    date: "০৯ অক্টোবর ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fc-3",
    claim: "দাবি: 'বিশ্ববাজারে চালের দাম কমলেও বাংলাদেশে রেকর্ড বৃদ্ধি'",
    verdict: "বিভ্রান্তিকর",
    explanation: "খাদ্য মন্ত্রণালয় এবং ট্রেডিং করপোরেশন অব বাংলাদেশ (টিসিবি) তথ্য অনুযায়ী, চলতি সপ্তাহে চালের পাইকারি দর স্থিতিশীল রয়েছে এবং আমদানিকৃত চালের শুল্ক কমানো হয়েছে।",
    source: "টিসিবি বাজার মনিটরিং সেল",
    date: "০৬ অক্টোবর ২০২৬",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  },
];

export default function FactCheckPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">ফ্যাক্ট-চেক ডেস্ক</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 to-neutral-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-2">
        <div className="flex items-center gap-2 text-blue-400">
          <ShieldCheck className="h-6 w-6" />
          <span className="text-xs font-bold uppercase tracking-widest">গুজব প্রতিরোধ ও সত্য অনুসন্ধান</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">বাংলা নিউজ২৪ ফ্যাক্ট-চেক ও যাচাইকরণ ডেস্ক</h1>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
          সামাজিক যোগাযোগ মাধ্যমে ছড়িয়ে পড়া তথ্য, ভুয়া ছবি ও দাবির নিরপেক্ষ ও বস্তুনিষ্ঠ অনুসন্ধান।
        </p>
      </div>

      {/* Fact Check Cards */}
      <div className="space-y-5">
        {factChecks.map((item) => {
          const isFalse = item.verdict === "মিথ্যা";
          const isTrue = item.verdict === "সত্য";

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start"
            >
              <div className="relative h-32 w-full sm:w-44 rounded-xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-900">
                <Image src={item.imageUrl} alt={item.claim} fill className="object-cover" />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full text-white ${
                      isFalse
                        ? "bg-rose-600"
                        : isTrue
                        ? "bg-emerald-600"
                        : "bg-amber-600"
                    }`}
                  >
                    {isFalse && <XCircle className="h-3.5 w-3.5" />}
                    {isTrue && <CheckCircle className="h-3.5 w-3.5" />}
                    {!isFalse && !isTrue && <AlertTriangle className="h-3.5 w-3.5" />}
                    <span>ফলাফল: {item.verdict}</span>
                  </span>
                  <span className="text-xs text-neutral-400">• {item.date}</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {item.claim}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-neutral-900/60 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  <strong className="text-neutral-900 dark:text-white">ফ্যাক্ট-চেক অনুসন্ধান: </strong>
                  {item.explanation}
                </p>

                <div className="text-[11px] text-neutral-500 flex items-center justify-between">
                  <span>তথ্যসূত্র: {item.source}</span>
                  <span className="text-red-600 font-semibold">পূর্ণাঙ্গ ফ্যাক্ট রিপোর্ট</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
