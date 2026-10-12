import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-service";

export async function GET() {
  const news = dataStore.getAllNews().filter((n) => n.status === "published");
  const live = dataStore.getLiveUpdates();
  const breaking = news.filter((n) => n.isBreaking);

  return NextResponse.json({
    status: "ok",
    appVersion: "2.4.0",
    serverTimestamp: new Date().toISOString(),
    feed: {
      breaking: breaking.slice(0, 3),
      topStories: news.slice(0, 10),
      liveTicker: live.slice(0, 5),
    },
    config: {
      pushNotificationEnabled: true,
      audioPlayerEnabled: true,
      darkModeDefault: false,
    },
  });
}
