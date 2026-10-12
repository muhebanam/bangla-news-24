import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { dataStore } from "@/lib/data-service";
import { Zap } from "lucide-react";

interface Headline {
  id: string;
  title: string;
}

const fallbackHeadlines: Headline[] = [
  { id: "news-bd-101", title: "বাংলাদেশ ব্যাংকের নতুন আর্থিক নীতিমালা: রিজার্ভ বৃদ্ধি ও মূল্যস্ফীতি নিয়ন্ত্রণে কঠোর নির্দেশনা" },
  { id: "news-bd-102", title: "আইসিটি খাতের অগ্রগতি: দেশীয় সেমিকন্ডাক্টর ও এআই শিল্পে ৫০০ কোটি টাকার নতুন তহবিল" },
  { id: "news-bd-103", title: "টি-টোয়েন্টি বিশ্বকাপ প্রস্তুতি: নাটকীয় জয়ে সিরিজ নিশ্চিত করল বাংলাদেশ" },
  { id: "news-bd-105", title: "নির্বাচন কমিশনের রোডম্যাপ: স্বচ্ছ ভোটার তালিকা প্রণয়ন কার্যক্রম শুরু" },
];

const Marquee = async () => {
  let headlines: Headline[] = [];

  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10", {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.data && Array.isArray(data.data)) {
        headlines = data.data;
      }
    }
  } catch (err) {
    console.warn("Marquee fetch fallback:", err);
  }

  // Combine with local breaking news if available
  const localBreaking = dataStore
    .getAllNews()
    .filter((n) => n.isBreaking || n.status === "published")
    .map((n) => ({ id: n.id, title: n.title }));

  if (headlines.length === 0) {
    headlines = localBreaking.length > 0 ? localBreaking : fallbackHeadlines;
  } else if (localBreaking.length > 0) {
    headlines = [...localBreaking.slice(0, 3), ...headlines];
  }

  return (
    <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-white shadow-inner">
      <div className="flex max-w-7xl mx-auto items-center">
        {/* Badge */}
        <div className="bg-red-950/80 px-4 py-2 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 border-r border-red-600">
          <Zap className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
          <span className="font-extrabold text-white">সর্বশেষ</span>
        </div>

        {/* Scrolling text */}
        <div className="overflow-hidden flex-1 py-1 text-sm">
          <MarqueeText duration={35} direction="right" pauseOnHover={true}>
            {headlines.map((h) => (
              <Link
                key={h.id}
                href={`/news/${h.id}`}
                className="hover:underline transition-all hover:text-amber-200 inline-flex items-center"
              >
                <span className="font-medium">{h.title}</span>
                <span className="mx-6 text-red-300 text-xs">◆</span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;