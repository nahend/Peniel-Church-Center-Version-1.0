import { NextResponse } from "next/server";
import { z } from "zod";
import { createPerson, getPeople } from "@peniel/database";
import { personSchema } from "@peniel/forms";

const createSchema = personSchema.extend({});

export async function GET() {
  const items = await getPeople();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors.map((item) => item.message).join(", ") }, { status: 400 });
  }
  const person = await createPerson({
    ...parsed.data,
    status: "PENDING",
    ministries: parsed.data.ministries ?? [],
    children: Array.isArray(parsed.data.children) ? parsed.data.children : parsed.data.children ? [parsed.data.children] : []
  });
  return NextResponse.json(person, { status: 201 });
}
