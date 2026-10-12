import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-service";

export async function GET() {
  const stats = dataStore.getAnalytics();
  return NextResponse.json({ success: true, data: stats });
}
