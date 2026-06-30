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
  | "dashboard:view"
  | "website:manage"
  | "people:read"
  | "people:write"
  | "people:import"
  | "people:export"
  | "requests:create"
  | "requests:approve"
  | "giving:manage"
  | "media:manage"
  | "languages:manage"
  | "settings:manage"
  | "users:manage"
  | "audit:read";

export type MemberStatus = "VISITOR" | "PENDING" | "MEMBER" | "ARCHIVED";
export type MinistryGroup = "Adult" | "Young Adult" | "Children Ministry";
export type RequestType = "PURCHASE" | "BUDGET" | "PROGRAM";
export type RequestStatus = "DRAFT" | "SUBMITTED" | "IN_REVIEW" | "APPROVED" | "REJECTED" | "COMPLETED";
export type NotificationChannel = "EMAIL" | "IN_APP" | "SMS_FUTURE";

export interface Person {
  id: string;
  fullName: string;
  gender: "female" | "male";
  occupation?: string;
  phone: string;
  address?: string;
  spouse?: string;
  children: string[];
  group: MinistryGroup;
  ministries: string[];
  privateNotes?: string;
  status: MemberStatus;
  source: "EXCEL_IMPORT" | "PHONE_REGISTRATION" | "ADMIN_ENTRY";
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
  payload: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface GivingMethod {
  id: string;
  name: "Tithe.ly" | "Zelle" | "PayPal" | "Stripe" | "CashApp" | "Venmo" | string;
  enabled: boolean;
  sortOrder: number;
  instructions: string;
  url?: string;
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
