import { NextResponse } from "next/server";
import { listUsers } from "@peniel/auth";
import type { Role } from "@peniel/types";

type CognitoUserRecord = {
  Username?: string;
  Attributes?: { Name?: string; Value?: string }[];
  UserCreateDate?: Date;
};

export async function GET() {
  const cognitoUsers = await listUsers();
  const users = (cognitoUsers as CognitoUserRecord[]).map((user) => ({
    username: user.Username ?? "unknown",
    email: user.Attributes?.find((attr) => attr.Name === "email")?.Value,
    role: user.Attributes?.find((attr) => attr.Name === "custom:role")?.Value as Role | undefined,
    createdAt: user.UserCreateDate?.toISOString()
  }));
  return NextResponse.json({ users });
}
