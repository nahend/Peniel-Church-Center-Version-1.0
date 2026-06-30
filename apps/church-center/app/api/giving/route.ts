import { NextResponse } from "next/server";

const supportedMethods = ["Tithe.ly", "Zelle", "PayPal", "Stripe", "CashApp", "Venmo"];

export async function GET() {
  return NextResponse.json({ methods: supportedMethods.map((name, index) => ({ id: name.toLowerCase().replaceAll(".", ""), name, enabled: true, sortOrder: index + 1 })) });
}
