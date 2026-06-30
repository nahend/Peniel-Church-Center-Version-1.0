import { NextResponse } from "next/server";
import { defaultWorkflows } from "@peniel/workflows";

export async function GET() {
  return NextResponse.json({ workflows: defaultWorkflows, items: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(
    {
      id: crypto.randomUUID(),
      type: body.type,
      title: body.title,
      status: "SUBMITTED",
      currentStep: 0,
      workflow: defaultWorkflows[body.type as keyof typeof defaultWorkflows],
    },
    { status: 201 },
  );
}
