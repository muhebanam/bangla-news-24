import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-service";

export async function GET() {
  const updates = dataStore.getLiveUpdates();
  return NextResponse.json({ success: true, count: updates.length, data: updates });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const update = dataStore.addLiveUpdate(body);
    return NextResponse.json({ success: true, data: update }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
