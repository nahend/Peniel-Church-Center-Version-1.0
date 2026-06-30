export type Locale = "en" | "am" | "ti";
export type Role =
  | "SUPER_ADMIN"
  | "PASTOR"
  | "SECRETARY"
  | "MEDIA_TEAM"
  | "TRANSLATOR"
  | "TREASURER"
  | "CHAIRMAN"
  | "ACCOUNTANT";
export type Permission =
  | "people:read"
  | "people:write"
  | "requests:approve"
  | "giving:manage"
  | "media:manage"
  | "settings:manage"
  | "users:manage"
  | "audit:read";
export type MemberGroup = "Adult" | "Young Adult" | "Children Ministry";
export type RequestType = "PURCHASE" | "BUDGET" | "PROGRAM";
export type RequestStatus = "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
export type MediaType = "IMAGE" | "VIDEO" | "DOCUMENT" | "PDF";
export type MemberStatus = "VISITOR" | "PENDING" | "MEMBER" | "ARCHIVED";
export interface Person {
  id: string;
  fullName: string;
  gender: "female" | "male";
  occupation?: string;
  phone: string;
  address?: string;
  spouse?: string;
  children?: string | string[];
  group: MemberGroup;
  ministries: string[];
  privateNotes?: string;
  status: MemberStatus;
  createdAt: string;
  updatedAt: string;
}
export interface ChurchRequest {
  id: string;
  type: RequestType;
  title: string;
  amount?: number;
  requesterId: string;
  status: RequestStatus;
  currentStep: number;
  workflow: string[];
  payload: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
export interface GivingMethod {
  id: string;
  name: string;
  enabled: boolean;
  sortOrder: number;
  instructions: string;
  url?: string;
}
export interface MediaAsset {
  id: string;
  title: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  description?: string;
  createdAt: string;
}
export interface AuditEvent {
  id: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}
export interface WebsiteSettings {
  churchName: string;
  logoUrl?: string;
  theme: "dark" | "light";
  primaryColor: string;
  secondaryColor: string;
  footerText: string;
  mapUrl?: string;
  youtubeUrl?: string;
  socialLinks: Record<string, string>;
}
export interface TranslationRecord {
  id: string;
  locale: Locale;
  key: string;
  value: string;
  updatedAt: string;
}
