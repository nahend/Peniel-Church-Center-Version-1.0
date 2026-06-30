import type { Permission, Role } from "@peniel/types";

export const rolePermissions: Record<Role, Permission[]> = {
  SUPER_ADMIN: ["dashboard:view", "website:manage", "people:read", "people:write", "people:import", "people:export", "requests:create", "requests:approve", "giving:manage", "media:manage", "languages:manage", "settings:manage", "users:manage", "audit:read"],
  PASTOR: ["dashboard:view", "people:read", "requests:create", "requests:approve", "audit:read"],
  SECRETARY: ["dashboard:view", "people:read", "people:write", "people:import", "people:export", "requests:create"],
  MEDIA_TEAM: ["dashboard:view", "website:manage", "media:manage"],
  TRANSLATOR: ["dashboard:view", "languages:manage", "website:manage"],
  TREASURER: ["dashboard:view", "requests:approve", "giving:manage"],
  CHAIRMAN: ["dashboard:view", "requests:approve", "audit:read"],
  ACCOUNTANT: ["dashboard:view", "requests:approve", "giving:manage"],
};

export function can(roles: Role[], permission: Permission) {
  return roles.some((role) => rolePermissions[role]?.includes(permission));
}

export function assertCan(roles: Role[], permission: Permission) {
  if (!can(roles, permission)) {
    throw new Error(`Missing required permission: ${permission}`);
  }
}
