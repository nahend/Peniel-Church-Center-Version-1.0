import { NextResponse } from "next/server";
import { z } from "zod";
import { createPerson, createAuditEvent } from "@peniel/database";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors.map((error) => error.message).join(", ") }, { status: 400 });
  }

  const { fullName, email, phone, message } = parsed.data;
  const person = await createPerson({
    fullName,
    gender: "female",
    occupation: "Visitor",
    phone,
    address: message,
    group: "Adult",
    ministries: [],
    privateNotes: `Email: ${email}`,
    status: "PENDING"
  });

  await createAuditEvent({
    actorId: "public-visitor",
    action: "member_registration_submitted",
    entityType: "Person",
    entityId: person.id,
    metadata: { email, phone },
  });

  return NextResponse.json({ status: "ok", id: person.id }, { status: 201 });
}
