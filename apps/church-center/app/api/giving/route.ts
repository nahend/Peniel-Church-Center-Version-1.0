import { NextResponse } from "next/server";
export async function GET(){ return NextResponse.json({ methods: ["Tithe.ly", "Zelle", "PayPal", "Stripe", "CashApp", "Venmo"] }); }
