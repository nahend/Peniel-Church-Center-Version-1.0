import { NextResponse } from "next/server";
import { phonePattern, requiredString } from "@peniel/forms";
export async function POST(request: Request) { const body = await request.json(); const fullName = requiredString(String(body.fullName ?? ""), "Full name"); const phone = String(body.phone ?? ""); if (!phonePattern.test(phone)) return NextResponse.json({ error: "Invalid phone" }, { status: 400 }); return NextResponse.json({ id: crypto.randomUUID(), fullName, phone, status: "PENDING" }, { status: 201 }); }
