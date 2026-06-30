import { NextResponse } from "next/server";
import { getMediaAssets } from "@peniel/database";

export async function GET() {
  const items = await getMediaAssets();
  return NextResponse.json({ items });
}
