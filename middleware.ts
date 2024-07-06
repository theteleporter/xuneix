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

  // Both validUrl and request.url are defined and are strings
  if (
    validUrl &&
    typeof validUrl === "string" &&
    request.url &&
    typeof request.url === "string"
  ) {
    if (pathname === validUrl && token === validToken) {
      // Allow access if URL and token are correct
      return NextResponse.rewrite(
        new URL("/admin", request.url)
      ); // Corrected Rewrite
    } else {
      // Redirect to homepage if URL or token is incorrect
      return NextResponse.rewrite(new URL("/", request.url)); // Corrected Redirect
    }
  }

  // If not an admin route or variables are undefined, continue with normal processing
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
