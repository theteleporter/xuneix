import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { MAX_ROTATED_URLS, ROTATED_URLS_KEY } from "@/app/constants";

export async function GET() {
  try {
    let rotatedUrls = (await kv.get<string[]>(ROTATED_URLS_KEY)) || [];
    console.log("Fetched rotatedUrls:", rotatedUrls);
    return NextResponse.json(rotatedUrls);
  } catch (error) {
    console.error("Error fetching rotated URLs:", error);
    return NextResponse.json({ error: "Failed to fetch rotated URLs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newUrl = await request.json();
    let rotatedUrls: string[] = (await kv.get<string[]>(ROTATED_URLS_KEY)) || [];
    
    rotatedUrls.push(newUrl);

    if (rotatedUrls.length > MAX_ROTATED_URLS) {
      rotatedUrls.shift(); // Remove the oldest URL if exceeding the limit
    }

    await kv.set(ROTATED_URLS_KEY, rotatedUrls);
    console.log("Updated rotatedUrls:", rotatedUrls);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving rotated URL:", error);
    return NextResponse.json({ error: "Failed to save rotated URL" }, { status: 500 });
  }
}
