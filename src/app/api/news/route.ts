import { NextResponse } from "next/server";
import { connectDB } from "@/database/mongodb";
import News from "@/models/News";
import { dataStore } from "@/lib/data-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status") || "published";
  const search = searchParams.get("search");
  const limit = parseInt(searchParams.get("limit") || "50", 10);

  try {
    const db = await connectDB();
    if (db) {
      const query: any = {};
      if (category && category !== "all") query.category = category;
      if (status && status !== "all") query.status = status;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { summary: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ];
      }

      const dbNews = await News.find(query).sort({ publishedAt: -1, createdAt: -1 }).limit(limit);
      if (dbNews && dbNews.length > 0) {
        return NextResponse.json({
          success: true,
          count: dbNews.length,
          source: "database",
          data: dbNews,
        });
      }
    }
  } catch (err) {
    console.warn("DB query fallback:", err);
  }

  // Fallback to unified data store
  let news = dataStore.getAllNews();

  if (category && category !== "all") {
    news = news.filter((n) => n.category === category || n.subCategory === category);
  }
  if (status && status !== "all") {
    news = news.filter((n) => n.status === status);
  }
  if (search) {
    const s = search.toLowerCase();
    news = news.filter(
      (n) =>
        n.title.toLowerCase().includes(s) ||
        (n.summary && n.summary.toLowerCase().includes(s)) ||
        (n.content && n.content.toLowerCase().includes(s))
    );
  }

  return NextResponse.json({
    success: true,
    count: news.length,
    source: "datastore",
    data: news.slice(0, limit),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Try saving in MongoDB
    let createdItem: any = null;
    try {
      const db = await connectDB();
      if (db) {
        createdItem = await News.create(body);
      }
    } catch (dbErr) {
      console.warn("MongoDB create skipped or failed, saving in dataStore", dbErr);
    }

    // Always update dataStore for instant access
    const storeItem = dataStore.createNews(body);

    return NextResponse.json(
      {
        success: true,
        message: "সংবাদ সফলভাবে তৈরি করা হয়েছে",
        data: createdItem || storeItem,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "সংবাদ তৈরি করতে সমস্যা হয়েছে",
      },
      { status: 400 }
    );
  }
}
