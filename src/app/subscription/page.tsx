"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ShieldCheck, CreditCard, ChevronRight, Zap } from "lucide-react";
import toast from "react-hot-toast";

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "card">("bkash");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("অনুগ্রহ করে মোবাইল নম্বর প্রদান করুন");
      return;
    }

    setIsProcessing(true);
    setTimeout(async () => {
      try {
        await fetch("/api/subscribers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: `user_${Date.now()}@banglanews24.com`,
            phone,
            plan: selectedPlan === "monthly" ? "pro_monthly" : "pro_yearly",
            paymentMethod,
          }),
        });
      } catch (err) {
        console.warn(err);
      }

      setIsProcessing(false);
      setIsSubscribed(true);
      toast.success("অভিনন্দন! আপনার প্রিমিয়াম সাবস্ক্রিপশন সক্রিয় হয়েছে।");
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800">
        <Link href="/" className="hover:text-red-700">হোম</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-red-700 font-bold">প্রিমিয়াম সাবস্ক্রিপশন</span>
      </nav>

      {/* Header Banner */}
      <div className="text-center space-y-3 py-6">
        <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
          <Sparkles className="h-4 w-4" />
          <span>ডিজিটাল সাংবাদিকতায় আপনার সহযোগিতা</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100">
          বাংলা নিউজ২৪ প্রিমিয়াম মেম্বারশিপ
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
          বিজ্ঞাপনমুক্ত মসৃণ পাঠ অভিজ্ঞতা, বিশেষ অনুসন্ধানী প্রতিবেদন এবং প্রতিদিনের ই-পেপার পড়তে আজই যুক্ত হোন।
        </p>
      </div>

      {isSubscribed ? (
        <div className="bg-emerald-50 dark:bg-neutral-900 border-2 border-emerald-500 rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="h-16 w-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-emerald-800 dark:text-emerald-300">
            আপনি এখন বাংলা নিউজ২৪ প্রিমিয়াম সদস্য!
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
            আপনার অ্যাকাউন্টে বিজ্ঞাপনমুক্ত পাঠ, স্পেশাল ডাটা স্টোরিজ এবং ই-পেপার সুবিধা আনলক হয়েছে।
          </p>
          <div className="pt-2">
            <Link href="/" className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl px-8">
              সংবাদ পড়তে ফিরে যান
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Plan Toggles & Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Plan */}
            <div
              onClick={() => setSelectedPlan("monthly")}
              className={`cursor-pointer p-6 sm:p-8 rounded-3xl border-2 transition-all relative ${
                selectedPlan === "monthly"
                  ? "bg-white dark:bg-neutral-800 border-red-600 shadow-xl scale-[1.02]"
                  : "bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-100">মাসিক প্ল্যান</h3>
                  <p className="text-xs text-neutral-500">স্বল্পমেয়াদী সাবস্ক্রিপশন</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-red-700">৳৯৯</span>
                  <span className="text-xs text-neutral-400 block">/ প্রতি মাস</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mb-6">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> সম্পূর্ণ বিজ্ঞাপনমুক্ত পোর্টাল</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> এক্সক্লুসিভ অনুসন্ধানী রিপোর্ট</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> দৈনিক ই-পেপার ডাউনলোড</li>
              </ul>
            </div>

            {/* Yearly Plan (Best Value) */}
            <div
              onClick={() => setSelectedPlan("yearly")}
              className={`cursor-pointer p-6 sm:p-8 rounded-3xl border-2 transition-all relative ${
                selectedPlan === "yearly"
                  ? "bg-white dark:bg-neutral-800 border-red-600 shadow-xl scale-[1.02]"
                  : "bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300"
              }`}
            >
              <span className="absolute -top-3 right-6 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-black px-3 py-0.5 rounded-full shadow-md uppercase tracking-wide">
                সেরা সাশ্রয়ী অফার • ৩৩% ছাড়
              </span>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-100">বার্ষিক প্ল্যান</h3>
                  <p className="text-xs text-neutral-500">১২ মাসের সেরা সুবিধা</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-red-700">৳৭৯৯</span>
                  <span className="text-xs text-neutral-400 block">/ প্রতি বছর</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mb-6">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> সম্পূর্ণ বিজ্ঞাপনমুক্ত পোর্টাল</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> এক্সক্লুসিভ অনুসন্ধানী রিপোর্ট</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> দৈনিক ই-পেপার ডাউনলোড</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> সাপ্তাহিক স্পেশাল নিউজলেটার</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> অডিও বুলেটিন আনলিমিটেড স্ট্রিমিং</li>
              </ul>
            </div>
          </div>

          {/* Payment Gateway Simulation Form */}
          <form onSubmit={handleCheckout} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-extrabold text-lg text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-red-600" />
              <span>পেমেন্ট মাধ্যম ও সক্রিয়করণ</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("bkash")}
                className={`p-3 rounded-2xl border text-center font-bold text-xs transition-all ${
                  paymentMethod === "bkash"
                    ? "bg-pink-50 dark:bg-pink-950/40 border-pink-600 text-pink-700 dark:text-pink-400 font-extrabold shadow-sm"
                    : "border-neutral-200 dark:border-neutral-700 text-neutral-600"
                }`}
              >
                বিকাশ (bKash)
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("nagad")}
                className={`p-3 rounded-2xl border text-center font-bold text-xs transition-all ${
                  paymentMethod === "nagad"
                    ? "bg-amber-50 dark:bg-amber-950/40 border-amber-600 text-amber-700 dark:text-amber-400 font-extrabold shadow-sm"
                    : "border-neutral-200 dark:border-neutral-700 text-neutral-600"
                }`}
              >
                নগদ (Nagad)
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-2xl border text-center font-bold text-xs transition-all ${
                  paymentMethod === "card"
                    ? "bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-400 font-extrabold shadow-sm"
                    : "border-neutral-200 dark:border-neutral-700 text-neutral-600"
                }`}
              >
                ভিসা / মাস্টারকার্ড
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                {paymentMethod === "card" ? "কার্ড নম্বর অথবা ইমেইল" : "মোবাইল অ্যাকাউন্ট নম্বর"}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={paymentMethod === "card" ? "৪১২৩ ৪৫৬৭ ৮৯০১ ২৩৪৫" : "০১৭১১-XXXXXX"}
                className="input bg-neutral-50 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 rounded-xl w-full text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="btn w-full bg-red-700 hover:bg-red-800 text-white font-bold border-none rounded-xl py-3 text-sm shadow-lg"
            >
              {isProcessing ? "পেমেন্ট প্রসেসিং হচ্ছে..." : `পেমেন্ট সম্পন্ন করুন (${selectedPlan === "monthly" ? "৳৯৯" : "৳৭৯৯"})`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
