"use client";

import { useState } from "react";
import { Users, Mail, Send, CheckCircle, Search, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface SubscriberItem {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: string;
  joined: string;
}

const subscribers: SubscriberItem[] = [
  { id: "s1", name: "তানিম ইসলাম", email: "tanim@gmail.com", plan: "প্রিমিয়াম বার্ষিক", status: "সক্রিয়", joined: "১০ অক্টোবর ২০২৬" },
  { id: "s2", name: "বিডি টেক সল্যুশনস", email: "corp@bdtech.com", plan: "কর্পোরেট প্ল্যান", status: "সক্রিয়", joined: "০৮ অক্টোবর ২০২৬" },
  { id: "s3", name: "নুসরাত সুলতানা", email: "nusrat@yahoo.com", plan: "মাসিক প্রিমিয়াম", status: "সক্রিয়", joined: "০৪ অক্টোবর ২০২৬" },
  { id: "s4", name: "আহমেদ আসিফ", email: "asif@hotmail.com", plan: "ফ্রি নিউজলেটার", status: "সক্রিয়", joined: "০১ অক্টোবর ২০২৬" },
];

export default function CrmNewsletterPage() {
  const [subject, setSubject] = useState("");
  const [newsletterBody, setNewsletterBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !newsletterBody) {
      toast.error("বিষয় ও বার্তা লিখুন");
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast.success(`নিউজলেটারটি ${subscribers.length} জন গ্রাহককে সফলভাবে পাঠানো হয়েছে!`);
      setSubject("");
      setNewsletterBody("");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Users className="h-6 w-6 text-red-600" />
            <span>সিআরএম ও পাঠক রিলেশনশিপ প্ল্যাটফর্ম</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            সাবস্ক্রাইবার ডেটাবেস ও দৈনিক নিউজলেটার সম্প্রচার কেন্দ্র
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subscriber List (Col-span 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <h2 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              গ্রাহক ও পাঠক তালিকা ({subscribers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full text-xs">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 text-[11px]">
                  <th>গ্রাহকের নাম ও ইমেইল</th>
                  <th>প্ল্যান</th>
                  <th>স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {subscribers.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <span className="font-bold text-neutral-900 dark:text-neutral-100 block">{s.name}</span>
                      <span className="text-neutral-400 text-[11px]">{s.email}</span>
                    </td>
                    <td>
                      <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-[11px] font-semibold">
                        {s.plan}
                      </span>
                    </td>
                    <td>
                      <span className="text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded text-[10px]">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Newsletter Dispatch Composer (Col-span 5) */}
        <div className="lg:col-span-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <Mail className="h-5 w-5 text-red-600" />
            <h2 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              নিউজলেটার সম্প্রচার (Newsletter Broadcast)
            </h2>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                ইমেইল সাবজেক্ট (বিষয়)
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="যেমন: আজকের শীর্ষ ৫ খবর ও গভীর বিশ্লেষণ..."
                className="input input-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                নিউজলেটার কনটেন্ট
              </label>
              <textarea
                rows={6}
                required
                value={newsletterBody}
                onChange={(e) => setNewsletterBody(e.target.value)}
                placeholder="পাঠকদের জন্য আকর্ষণীয় নিউজলেটার লিখুন..."
                className="textarea textarea-sm w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="btn w-full bg-red-700 hover:bg-red-800 text-white font-bold border-none rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isSending ? "পাঠানো হচ্ছে..." : "সকল গ্রাহককে প্রেরণ করুন"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
