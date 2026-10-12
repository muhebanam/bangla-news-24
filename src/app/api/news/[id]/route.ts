import { NextResponse } from "next/server";
import { connectDB } from "@/database/mongodb";
import News from "@/models/News";
import { dataStore } from "@/lib/data-service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const db = await connectDB();
    if (db) {
      const item = await News.findById(id);
      if (item) {
        item.views = (item.views || 0) + 1;
        await item.save();
        return NextResponse.json({ success: true, data: item });
      }
    }
  } catch (err) {
    console.warn("DB find failed, falling back to dataStore:", err);
  }

  const newsItem = dataStore.getNewsById(id);
  if (newsItem) {
    dataStore.incrementViews(id);
    return NextResponse.json({ success: true, data: newsItem });
  }

  return NextResponse.json(
    { success: false, message: "সংবাদটি খুঁজে পাওয়া যায়নি" },
    { status: 404 }
  );
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  // If reaction action
  if (body.action === "reaction" && body.reactionType) {
    dataStore.addReaction(id, body.reactionType);
    return NextResponse.json({ success: true, message: "প্রতিক্রিয়া সংরক্ষিত হয়েছে" });
  }

  try {
    const db = await connectDB();
    if (db) {
      await News.findByIdAndUpdate(id, body);
    }
  } catch (err) {
    console.warn("DB update failed:", err);
  }

  const updated = dataStore.updateNews(id, body);
  if (updated) {
    return NextResponse.json({
      success: true,
      message: "সংবাদ সফলভাবে হালনাগাদ করা হয়েছে",
      data: updated,
    });
  }

  return NextResponse.json(
    { success: false, message: "সংবাদটি পাওয়া যায়নি" },
    { status: 404 }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const db = await connectDB();
    if (db) {
      await News.findByIdAndDelete(id);
    }
  } catch (err) {
    console.warn("DB delete failed:", err);
  }

  const deleted = dataStore.deleteNews(id);
  return NextResponse.json({
    success: true,
    message: deleted ? "সংবাদটি মুছে ফেলা হয়েছে" : "সংবাদটি খুঁজে পাওয়া যায়নি",
  });
}
