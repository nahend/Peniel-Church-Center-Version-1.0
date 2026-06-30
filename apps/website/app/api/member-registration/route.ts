import { NextResponse } from "next/server";
import { validateMemberRegistration } from "@peniel/forms";

export async function POST(request: Request) {
  try {
    const registration = validateMemberRegistration(await request.json());

    return NextResponse.json(
      {
        id: crypto.randomUUID(),
        ...registration,
        status: "PENDING",
        source: "PHONE_REGISTRATION",
        nextStep: "Secretary review and Super Admin approval",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid registration" }, { status: 400 });
  }
}
