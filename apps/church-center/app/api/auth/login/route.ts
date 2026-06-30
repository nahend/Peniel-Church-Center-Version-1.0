import { NextResponse } from "next/server";
import { z } from "zod";
import { loginUser, createSessionCookie } from "@peniel/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors.map((item) => item.message).join(", ") }, { status: 400 });
  }

  const { email, password } = parsed.data;
  try {
    const token = await loginUser(email, password);
    const cookie = createSessionCookie(token);
    const response = NextResponse.json({ status: "ok" });
    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
