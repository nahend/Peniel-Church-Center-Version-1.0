import { NextResponse } from "next/server";
import { getWebsiteSettings, saveWebsiteSettings } from "@peniel/database";

export async function GET() {
  const settings = await getWebsiteSettings();
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  const body = await request.json();
  const settings = await saveWebsiteSettings(body);
  return NextResponse.json(settings);
}
