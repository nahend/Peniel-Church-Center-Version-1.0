import type { Permission, Role } from "@peniel/types";
export const rolePermissions: Record<Role, Permission[]> = {
  SUPER_ADMIN: ["people:read", "people:write", "requests:approve", "giving:manage", "media:manage", "settings:manage", "users:manage", "audit:read"],
  PASTOR: ["people:read", "requests:approve", "audit:read"], SECRETARY: ["people:read", "people:write"], MEDIA_TEAM: ["media:manage"], TRANSLATOR: ["settings:manage"], TREASURER: ["requests:approve", "giving:manage"], CHAIRMAN: ["requests:approve"], ACCOUNTANT: ["requests:approve", "giving:manage"]
};
export const can = (roles: Role[], permission: Permission) => roles.some((role) => rolePermissions[role]?.includes(permission));
