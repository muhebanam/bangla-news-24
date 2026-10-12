import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { action, text, headline, topic } = await request.json();

    if (action === "headline") {
      const generated = [
        `আলোড়ন সৃষ্টি: ${headline || "গুরুত্বপূর্ণ ঘটনা"} নিয়ে বিস্তারিত প্রতিবেদন ও সর্বশেষ আপডেট`,
        `যে কারণে আলোচনায় ${headline || "আজকের সংবাদ"}: পর্দার পেছনের আসল ঘটনা`,
        `বিশেষ অনুসন্ধান: ${headline || "শীর্ষ খবর"} ও এর সুদূরপ্রসারী রাজনৈতিক প্রভাব`,
        `ব্রেকিং: ${headline || "সাম্প্রতিক অগ্রগতি"} নিয়ে কর্তৃপক্ষের তাৎক্ষণিক সিদ্ধান্ত`,
      ];
      return NextResponse.json({ success: true, headlines: generated });
    }

    if (action === "summary") {
      const sampleText = text || headline || "সংবাদ সারসংক্ষেপ";
      const bullets = [
        `১. প্রধান বিষয়বস্তু: ${sampleText.slice(0, 70)}... সংক্রান্ত মূল তথ্য প্রকাশ।`,
        `২. সংশ্লিষ্ট কর্তৃপক্ষের প্রতিক্রিয়া ও ভবিষ্যৎ নীতিগত পদক্ষেপের ইঙ্গিত।`,
        `৩. সাধারণ নাগরিক ও অংশীজনদের ইতিবাচক দৃষ্টিভঙ্গি ও প্রতিক্রিয়া।`,
      ];
      return NextResponse.json({
        success: true,
        summary: bullets.join("\n"),
        bulletPoints: bullets,
      });
    }

    if (action === "seo") {
      const baseTitle = headline || "বাংলা নিউজ ২৪ বিশেষ প্রতিবেদন";
      return NextResponse.json({
        success: true,
        seo: {
          metaTitle: `${baseTitle} | Bangla News 24 - ২৪ ঘণ্টার নির্ভরযোগ্য সংবাদ`,
          metaDescription: `${baseTitle}-এর বিস্তারিত বিশ্লেষণ, পটভূমি ও সর্বশেষ তথ্য পড়ুন বাংলা নিউজ ২৪ পোর্টালে।`,
          keywords: [
            "বাংলা সংবাদ",
            "Bangla News 24",
            "সর্বশেষ খবর",
            topic || "বাংলাদেশ",
            "রাজনীতি ও অর্থনীতি",
          ],
        },
      });
    }

    if (action === "translate") {
      // Intelligent journalistic English to Bengali translation mock
      const translated = text
        ? `[বাংলা অনুবাদ] ${text} - এই বিষয়ে সংশ্লিষ্ট দায়িত্বশীল প্রতিনিধিরা জানিয়েছেন যে দ্রুত প্রয়োজনীয় ব্যবস্থা গ্রহণ করা হবে।`
        : "অনুবাদ করার জন্য কোনো ইংরেজি টেক্সট পাওয়া যায়নি।";
      return NextResponse.json({ success: true, translatedText: translated });
    }

    if (action === "moderate") {
      const toxicKeywords = ["হুমকি", "গালাগালি", "উসকানিমূলক", "spam", "violence"];
      const isToxic = toxicKeywords.some((k) => (text || "").toLowerCase().includes(k));
      return NextResponse.json({
        success: true,
        isSafe: !isToxic,
        confidence: isToxic ? 0.94 : 0.99,
        flag: isToxic ? "উসকানিমূলক বা নিয়মবহির্ভূত শব্দ শনাক্ত হয়েছে" : "মন্তব্য নিরাপদ",
      });
    }

    return NextResponse.json({ success: false, message: "অজানা অ্যাকশন" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
