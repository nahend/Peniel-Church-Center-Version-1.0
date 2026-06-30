import { NextResponse } from "next/server";
import { getTranslations, saveTranslation } from "@peniel/database";
import { z } from "zod";

const translationSchema = z.object({ locale: z.enum(["en", "am", "ti"]), key: z.string(), value: z.string() });

export async function GET() {
  const items = await getTranslations();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = translationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors.map((item) => item.message).join(", ") }, { status: 400 });
  }
  const item = await saveTranslation(parsed.data);
  return NextResponse.json(item, { status: 201 });
}
