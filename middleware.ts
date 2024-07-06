import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { kv } from "@vercel/kv";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = searchParams.get("token");

  // Fetch admin config from Vercel KV, but handle potential nulls
  const [validUrl, validToken] = await Promise.all([
    kv.get<string | null>("adminUrl"),
    kv.get<string | null>("token"),
  ]);

  if (pathname.startsWith("/admin")) {
    // Checks if both the URL and token are valid AND not null
    if (validUrl && validToken && pathname === validUrl && token === validToken) {
      // Allow access (rewrite to the actual protected admin page)
      return NextResponse.rewrite(new URL("/admin", request.url));
    } else {
      // Invalid credentials, but check if request.url is valid first
      if (request.url) {
        // Redirect to the home page
        return NextResponse.redirect(new URL("/", request.url));
      } else {
        // If request.url is also undefined, return a server error
        return new NextResponse("Internal Server Error", { status: 500 });
      }
    }
  }

  // If not an admin route, continue with normal processing
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
