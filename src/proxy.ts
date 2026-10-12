import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  } catch (err) {
    console.warn("Session check fallback:", err);
  }
}

export const config = {
  matcher: ["/profile"],
};
