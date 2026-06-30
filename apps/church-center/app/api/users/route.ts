import { NextResponse } from "next/server";
import { rolePermissions } from "@peniel/auth";

export async function GET() {
  return NextResponse.json({ roles: rolePermissions, invitationOnly: true, bootstrapUser: "SUPER_ADMIN" });
}
