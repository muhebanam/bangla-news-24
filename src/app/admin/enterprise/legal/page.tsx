import { ShieldCheck, AlertCircle, FileCheck, CheckCircle2 } from "lucide-react";

export default function LegalCompliancePage() {
  const ethicsRules = [
    { rule: "বস্তুনিষ্ঠতা ও নির্ভুলতা", desc: "কোনো সংবাদ পরিবেশনের পূর্বে অন্তত দুটি নির্ভরযোগ্য স্বাধীন উৎস থেকে সত্যতা যাচাই করা।" },
    { rule: "ব্যক্তিগত গোপনীয়তার প্রতি শ্রদ্ধা", desc: "সংবেদনশীল ঘটনা বা ভিকটিমদের ছবি ও নাম প্রকাশের ক্ষেত্রে প্রেস কাউন্সিল নির্দেশনা মেনে চলা।" },
    { rule: "প্রতিবাদ ও সংশোধনী প্রকাশের সুযোগ", desc: "সংবাদে অনিচ্ছাকৃত কোনো অসঙ্গতি ধরা পড়লে যথাযথ গুরুত্ব দিয়ে সংশোধনী প্রকাশ করা।" },
    { rule: "বিজ্ঞাপন ও খবরের স্পষ্ট বিভাজন", desc: "স্পনসরড বা বিজ্ঞাপনী কনটেন্ট স্পষ্টভাবে চিহ্নিত করা যাতে পাঠকের বিভ্রান্তি না হয়।" },
  ];

  const correctionLogs = [
    {
      date: "০৮ অক্টোবর ২০২৬",
      title: "বাংলাদেশ ব্যাংকের নতুন মুদ্রানীতি সংক্রান্ত প্রতিবেদনে সংশোধন",
      note: "পূর্বে উল্লেখিত মূল্যস্ফীতির হারের শতাংশ হিসেবে টাইপিংজনিত ত্রুটি সংশোধন করা হয়েছে।",
    },
    {
      date: "০১ অক্টোবর ২০২৬",
      title: "টি-টোয়েন্টি স্কোয়াড তালিকা নিয়ে ব্যাখ্যা",
      note: "রিজার্ভ খেলোয়াড়দের তালিকায় নাম পুনর্বিন্যাস করা হয়েছে।",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
            <span>আইনগত ও প্রেস কাউন্সিল কমপ্লায়েন্স ডেস্ক</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            বাংলাদেশ প্রেস কাউন্সিল আচরণবিধি, সাংবাদিকতার নীতিমালা ও সংশোধনী রেজিস্ট্রি
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ethics Checklist */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-emerald-600" />
            <span>সাংবাদিকতা আচরণবিধি ও মানদণ্ড</span>
          </h2>

          <div className="space-y-3">
            {ethicsRules.map((rule, idx) => (
              <div key={idx} className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-100 dark:border-neutral-800 space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100">{rule.rule}</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 pl-6">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Corrections & Retraction Log */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 pb-2 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <span>সংশোধনী ও প্রতিবাদ রেজিস্ট্রি (Correction Log)</span>
          </h2>

          <div className="space-y-3">
            {correctionLogs.map((log, idx) => (
              <div key={idx} className="p-4 bg-amber-50/60 dark:bg-neutral-800/60 rounded-2xl border border-amber-200 dark:border-neutral-700 space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 block">{log.date}</span>
                <h4 className="font-bold text-neutral-900 dark:text-neutral-100">{log.title}</h4>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{log.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
