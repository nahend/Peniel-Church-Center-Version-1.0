import { NextResponse } from "next/server";
import { getGivingMethods } from "@peniel/database";

export async function GET() {
  const methods = await getGivingMethods();
  return NextResponse.json({ methods });
}
