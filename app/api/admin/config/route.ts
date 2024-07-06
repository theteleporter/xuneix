// app/api/admin/config/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const configFilePath = path.join(process.cwd(), "app/data/admin/initial-link.json");

export async function GET() {
  try {
    const data = await fs.readFile(configFilePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading admin auth data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
