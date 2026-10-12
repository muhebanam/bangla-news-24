import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-service";

export async function GET() {
  const subs = dataStore.getSubscribers();
  return NextResponse.json({ success: true, count: subs.length, data: subs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json({ success: false, message: "ইমেইল প্রদান করুন" }, { status: 400 });
    }

    const sub = dataStore.addSubscriber(body);
    return NextResponse.json(
      { success: true, message: "সাবস্ক্রিপশন সফল হয়েছে", data: sub },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
