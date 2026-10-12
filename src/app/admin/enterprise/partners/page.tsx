import { Handshake, CheckCircle2, Globe, Clock, ShieldCheck } from "lucide-react";

interface PartnerItem {
  id: string;
  name: string;
  type: string;
  articlesImported: number;
  status: "সক্রিয়" | "সিঙ্কড";
  agreement: string;
}

const partners: PartnerItem[] = [
  { id: "p1", name: "বাংলাদেশ সংবাদ সংস্থা (বাসস - BSS)", type: "জাতীয় সংবাদ সংস্থা", articlesImported: 1420, status: "সক্রিয়", agreement: "পূর্ণাঙ্গ সিন্ডিকেশন পার্টনারশিপ ২০২৬-২৮" },
  { id: "p2", name: "রয়টার্স (Reuters)", type: "আন্তর্জাতিক ওয়্যার সার্ভিস", articlesImported: 890, status: "সক্রিয়", agreement: "আন্তর্জাতিক টেক্সট ও ফটো লাইসেন্স" },
  { id: "p3", name: "এজেন্স ফ্রান্স-প্রেস (এএফপি - AFP)", type: "আন্তর্জাতিক ওয়্যার সার্ভিস", articlesImported: 640, status: "সক্রিয়", agreement: "মাল্টিমিডিয়া সিন্ডিকেশন" },
  { id: "p4", name: "প্রেস ট্রাস্ট অব ইন্ডিয়া (পিটিআই - PTI)", type: "আঞ্চলিক সংবাদ সংস্থা", articlesImported: 310, status: "সিঙ্কড", agreement: "দক্ষিণ এশিয়া আঞ্চলিক এক্সচেঞ্জ" },
];

export default function PartnersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Handshake className="h-6 w-6 text-red-600" />
            <span>সংবাদ সংস্থা ও সিন্ডিকেশন পার্টনারস</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            জাতীয় ও আন্তর্জাতিক ওয়্যার সার্ভিসেস ইন্টিগ্রেশন ও কনটেন্ট শেয়ারিং লাইসেন্স
          </p>
        </div>
      </div>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2.5 py-0.5 rounded">
                {p.type}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{p.status}</span>
              </span>
            </div>

            <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100">{p.name}</h3>

            <div className="bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded-2xl text-xs space-y-1">
              <span className="text-neutral-500 block">চুক্তি ও শর্তাবলী:</span>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">{p.agreement}</p>
            </div>

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
              <span>মোট আমদানিকৃত কনটেন্ট:</span>
              <span className="font-bold text-neutral-900 dark:text-white">
                {p.articlesImported.toLocaleString("bn-BD")} টি
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
