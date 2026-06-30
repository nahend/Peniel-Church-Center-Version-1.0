import { NextResponse } from "next/server";
import { clearSessionCookie } from "@peniel/auth";

export async function POST() {
  const response = NextResponse.json({ status: "ok" });
  response.headers.set("Set-Cookie", clearSessionCookie());
  return response;
}
