import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { kv } from "@vercel/kv";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = searchParams.get("token");

  // Fetch admin config from Vercel KV
  const [validUrl, validToken] = await Promise.all([
    kv.get("adminUrl"),
    kv.get("token"),
  ]);

  if (pathname.startsWith("/admin")) {
    // Check if the request is for the admin section
    if (validUrl && validToken && pathname === validUrl && token === validToken) {
      // Allow access if URL and token are correct
      return NextResponse.rewrite(new URL("/admin", request.url));
    } else {
      // Redirect to homepage if URL or token is incorrect
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  // If not an admin route, continue with normal processing
  return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }