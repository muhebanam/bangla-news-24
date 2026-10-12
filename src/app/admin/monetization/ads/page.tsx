"use client";

import { useState } from "react";
import { Megaphone, PlusCircle, Eye, MousePointerClick, CheckCircle, PauseCircle } from "lucide-react";
import toast from "react-hot-toast";

interface AdItem {
  id: string;
  title: string;
  advertiser: string;
  placement: string;
  impressions: number;
  clicks: number;
  status: "active" | "paused";
}

const initialAds: AdItem[] = [
  {
    id: "ad-1",
    title: "বাংলাদেশ টেক সামিট ২০২৬",
    advertiser: "আইসিটি বিভাগ ও বাংলাদেশ ইনোভেশন ফোরাম",
    placement: "হেডার লিডারবোর্ড (Header Leaderboard)",
    impressions: 48920,
    clicks: 1420,
    status: "active",
  },
  {
    id: "ad-2",
    title: "বিকাশ ক্যাশব্যাক অফার",
    advertiser: "বিকাশ লিমিটেড",
    placement: "সাইডবার বক্স (Sidebar Box)",
    impressions: 31200,
    clicks: 980,
    status: "active",
  },
  {
    id: "ad-3",
    title: "রবি ৫জি ইন্টারনেট প্যাকেজ",
    advertiser: "রবি আজিয়াটা",
    placement: "ইন-আর্টিকেল ব্যানার (In-Article)",
    impressions: 19400,
    clicks: 610,
    status: "paused",
  },
];

export default function AdManagerPage() {
  const [ads, setAds] = useState<AdItem[]>(initialAds);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [advertiser, setAdvertiser] = useState("");
  const [placement, setPlacement] = useState("হেডার লিডারবোর্ড (Header Leaderboard)");

  const handleToggleStatus = (id: string) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id ? { ...ad, status: ad.status === "active" ? "paused" : "active" } : ad
      )
    );
    toast.success("বিজ্ঞাপন স্ট্যাটাস পরিবর্তন করা হয়েছে!");
  };

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !advertiser) {
      toast.error("তথ্য পূরণ করুন");
      return;
    }

    const newAd: AdItem = {
      id: "ad-" + Date.now(),
      title,
      advertiser,
      placement,
      impressions: 0,
      clicks: 0,
      status: "active",
    };

    setAds([newAd, ...ads]);
    setShowModal(false);
    setTitle("");
    setAdvertiser("");
    toast.success("নতুন বিজ্ঞাপন ক্যাম্পেইন সক্রিয় হয়েছে!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-red-600" />
            <span>বিজ্ঞাপন প্ল্যাটফর্ম ও ক্যাম্পেইন ম্যানেজার</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            ব্যানার স্লট মনিটরিং, সিটিআর বিশ্লেষণ ও রাজস্ব ট্র্যাকিং
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn btn-sm bg-red-700 hover:bg-red-800 text-white border-none rounded-xl flex items-center gap-1.5 px-4 font-bold shadow-sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span>নতুন বিজ্ঞাপন স্লট যুক্ত করুন</span>
        </button>
      </div>

      {/* Ads Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="table w-full text-xs">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-wider text-[11px] bg-neutral-50/50 dark:bg-neutral-800/40">
                <th>বিজ্ঞাপন শিরোনাম ও ক্লায়েন্ট</th>
                <th>প্লেসমেন্ট স্লট</th>
                <th>ইম্প্রেশন</th>
                <th>ক্লিক সংখ্যা</th>
                <th>সিটিআর (CTR)</th>
                <th>স্ট্যাটাস</th>
                <th className="text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {ads.map((ad) => {
                const ctr = ((ad.clicks / Math.max(ad.impressions, 1)) * 100).toFixed(2);
                return (
                  <tr key={ad.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/60">
                    <td>
                      <span className="font-bold text-neutral-900 dark:text-neutral-100 block">{ad.title}</span>
                      <span className="text-[11px] text-neutral-400">বিজ্ঞাপনদাতা: {ad.advertiser}</span>
                    </td>
                    <td>
                      <span className="bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded text-[11px] font-semibold">
                        {ad.placement}
                      </span>
                    </td>
                    <td className="font-semibold">{ad.impressions.toLocaleString("bn-BD")}</td>
                    <td className="font-semibold text-red-600">{ad.clicks.toLocaleString("bn-BD")}</td>
                    <td>
                      <span className="font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                        {ctr}%
                      </span>
                    </td>
                    <td>
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          ad.status === "active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-neutral-200 text-neutral-700"
                        }`}
                      >
                        {ad.status === "active" ? "সক্রিয় (Active)" : "বিরতি (Paused)"}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => handleToggleStatus(ad.id)}
                        className={`btn btn-xs rounded-lg ${
                          ad.status === "active" ? "btn-warning" : "btn-success"
                        }`}
                      >
                        {ad.status === "active" ? "পজ করুন" : "চালু করুন"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-black text-lg text-neutral-900 dark:text-neutral-100">
              নতুন বিজ্ঞাপন ক্যাম্পেইন স্লট তৈরি
            </h3>

            <form onSubmit={handleCreateAd} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  বিজ্ঞাপনের শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: ওয়ালটন স্মার্টটিভি প্রচার..."
                  className="input input-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  ক্লায়েন্ট / বিজ্ঞাপনদাতা *
                </label>
                <input
                  type="text"
                  required
                  value={advertiser}
                  onChange={(e) => setAdvertiser(e.target.value)}
                  placeholder="যেমন: ওয়ালটন হাইটেক ইন্ডাস্ট্রিজ..."
                  className="input input-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  প্লেসমেন্ট স্লট নির্বাচন
                </label>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className="select select-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs"
                >
                  <option value="হেডার লিডারবোর্ড (Header Leaderboard)">হেডার লিডারবোর্ড (Header Leaderboard)</option>
                  <option value="সাইডবার বক্স (Sidebar Box)">সাইডবার বক্স (Sidebar Box)</option>
                  <option value="ইন-আর্টিকেল ব্যানার (In-Article)">ইন-আর্টিকেল ব্যানার (In-Article)</option>
                  <option value="ফুটার ব্যানার (Footer Banner)">ফুটার ব্যানার (Footer Banner)</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm btn-ghost rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="btn btn-sm bg-red-700 hover:bg-red-800 text-white rounded-xl"
                >
                  ক্যাম্পেইন সংরক্ষণ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
