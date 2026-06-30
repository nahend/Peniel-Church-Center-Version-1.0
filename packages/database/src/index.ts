export const tableNames = {
  people: "PenielPeople",
  requests: "PenielRequests",
  giving: "PenielGivingMethods",
  media: "PenielMediaAssets",
  users: "PenielUsers",
  audit: "PenielAuditEvents",
  notifications: "PenielNotifications",
  translations: "PenielTranslations",
} as const;

export const indexes = {
  peopleByStatus: "byStatus",
  peopleByPhone: "byPhone",
  requestsByTypeStatus: "byTypeStatus",
  requestsByRequester: "byRequester",
  auditByActorDate: "byActorDate",
  mediaByKind: "byKind",
} as const;

export interface Repository<T extends { id: string }> {
  list(): Promise<T[]>;
  get(id: string): Promise<T | null>;
  put(item: T): Promise<T>;
  delete(id: string): Promise<void>;
}

export function requireAwsConfiguration() {
  const region = process.env.AWS_REGION ?? process.env.NEXT_PUBLIC_AWS_REGION;
  if (!region) {
    throw new Error("AWS_REGION or NEXT_PUBLIC_AWS_REGION must be configured before data access is enabled.");
  }
  return { region };
}
