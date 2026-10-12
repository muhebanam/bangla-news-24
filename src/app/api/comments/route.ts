import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const newsId = searchParams.get("newsId");

  if (!newsId) {
    return NextResponse.json({ success: false, message: "newsId প্রয়োজন" }, { status: 400 });
  }

  const comments = dataStore.getComments(newsId);
  return NextResponse.json({ success: true, count: comments.length, data: comments });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { newsId, userName, content, userAvatar } = body;

    if (!newsId || !userName || !content) {
      return NextResponse.json(
        { success: false, message: "সকল প্রয়োজনীয় তথ্য প্রদান করুন" },
        { status: 400 }
      );
    }

    // AI Toxicity & Moderation Filter in Bengali
    const toxicWords = ["গালাগালি", "খারাপ", "বাজে", "spam", "abuse"];
    const isToxic = toxicWords.some((w) => content.toLowerCase().includes(w));

    const comment = dataStore.addComment({
      newsId,
      userName,
      content,
      userAvatar,
    });

    if (isToxic) {
      comment.status = "flagged";
      return NextResponse.json({
        success: true,
        message: "আপনার মন্তব্যটি এআই মডারেশন পর্যালোচনার জন্য জমা রাখা হয়েছে।",
        data: comment,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "মন্তব্য সফলভাবে যুক্ত হয়েছে",
        data: comment,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
