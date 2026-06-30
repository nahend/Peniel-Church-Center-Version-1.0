import { parse, serialize } from "cookie";
import { CognitoIdentityProviderClient, InitiateAuthCommand, AdminCreateUserCommand, ListUsersCommand, AdminGetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { Permission, Role } from "@peniel/types";
import { requiredEnv } from "@peniel/utils";

const getRegion = () => requiredEnv("AWS_REGION");
const getUserPoolId = () => requiredEnv("COGNITO_USER_POOL_ID");
const getClientId = () => requiredEnv("COGNITO_APP_CLIENT_ID");

const getIssuer = () => {
  const region = getRegion();
  const userPoolId = getUserPoolId();
  return `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
};

const getClient = () => new CognitoIdentityProviderClient({ region: getRegion() });
const getJwks = () => createRemoteJWKSet(new URL(`${getIssuer()}/.well-known/jwks.json`));

export const rolePermissions: Record<Role, Permission[]> = {
  SUPER_ADMIN: ["people:read", "people:write", "requests:approve", "giving:manage", "media:manage", "settings:manage", "users:manage", "audit:read"],
  PASTOR: ["people:read", "requests:approve", "audit:read"],
  SECRETARY: ["people:read", "people:write"],
  MEDIA_TEAM: ["media:manage"],
  TRANSLATOR: ["settings:manage"],
  TREASURER: ["requests:approve", "giving:manage"],
  CHAIRMAN: ["requests:approve"],
  ACCOUNTANT: ["requests:approve", "giving:manage"]
};

export class AuthError extends Error {}

export interface AuthSession {
  sub: string;
  email: string;
  role: Role;
  permissions: Permission[];
}

export function getAuthToken(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  return parse(cookie)["peniel_session"] as string | undefined;
}

export async function verifyToken(token: string): Promise<AuthSession> {
  const jwks = getJwks();
  const issuer = getIssuer();
  const clientId = getClientId();
  const { payload } = await jwtVerify(token, jwks, {
    issuer,
    audience: clientId
  });
  const sub = payload.sub?.toString();
  const email = payload.email?.toString();
  const role = (payload["custom:role"]?.toString() || "SUPER_ADMIN") as Role;
  if (!sub || !email) throw new AuthError("Unauthorized");
  return { sub, email, role, permissions: rolePermissions[role] ?? [] };
}

export async function getSession(request: Request): Promise<AuthSession | null> {
  const token = getAuthToken(request);
  if (!token) return null;
  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export function createSessionCookie(token: string) {
  return serialize("peniel_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearSessionCookie() {
  return serialize("peniel_session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
}

export async function loginUser(email: string, password: string) {
  const client = getClient();
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: getClientId(),
    AuthParameters: { USERNAME: email, PASSWORD: password }
  });
  const response = await client.send(command);
  const idToken = response.AuthenticationResult?.IdToken;
  if (!idToken) throw new AuthError("Invalid credentials");
  return idToken;
}

export async function inviteUser(email: string, role: Role, fullName: string) {
  const client = getClient();
  const userPoolId = getUserPoolId();
  const now = new Date().toISOString();
  const command = new AdminCreateUserCommand({
    UserPoolId: userPoolId,
    Username: email,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "email_verified", Value: "true" },
      { Name: "custom:role", Value: role },
      { Name: "name", Value: fullName }
    ],
    DesiredDeliveryMediums: ["EMAIL"],
    MessageAction: "SUPPRESS"
  });
  await client.send(command);
  return { email, role, fullName, createdAt: now };
}

export async function listUsers() {
  const client = getClient();
  const userPoolId = getUserPoolId();
  const command = new ListUsersCommand({ UserPoolId: userPoolId });
  const result = await client.send(command);
  return result.Users ?? [];
}

export async function getUser(username: string) {
  const client = getClient();
  const userPoolId = getUserPoolId();
  const command = new AdminGetUserCommand({ UserPoolId: userPoolId, Username: username });
  const result = await client.send(command);
  return result;
}
