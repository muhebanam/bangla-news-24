import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placement = searchParams.get("placement");

  if (placement) {
    const ad = dataStore.getAdByPlacement(placement);
    return NextResponse.json({ success: true, data: ad });
  }

  const ads = dataStore.getAds();
  return NextResponse.json({ success: true, data: ads });
}
