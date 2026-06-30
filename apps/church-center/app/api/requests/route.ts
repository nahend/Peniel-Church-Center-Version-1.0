import { NextResponse } from "next/server";
import { z } from "zod";
import { createRequest, getRequestItems } from "@peniel/database";
import { requestSchema } from "@peniel/forms";

export async function GET() {
  const items = await getRequestItems();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors.map((item) => item.message).join(", ") }, { status: 400 });
  }
  const requestItem = await createRequest({ ...parsed.data, payload: { details: body.description } });
  return NextResponse.json(requestItem, { status: 201 });
}
