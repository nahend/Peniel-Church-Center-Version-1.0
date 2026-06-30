import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  GetCommand
} from "@aws-sdk/lib-dynamodb";
import type { GivingMethod, Person, ChurchRequest, MediaAsset, TranslationRecord, WebsiteSettings, AuditEvent } from "@peniel/types";
import { requiredEnv, nowIso } from "@peniel/utils";

let dbClient: DynamoDBClient | undefined;
let db: ReturnType<typeof DynamoDBDocumentClient.from> | undefined;
let s3Client: S3Client | undefined;

const getRegion = () => requiredEnv("AWS_REGION");
const getBucket = () => requiredEnv("AWS_S3_BUCKET");

const getDb = () => {
  if (!db) {
    const region = getRegion();
    dbClient = new DynamoDBClient({ region });
    db = DynamoDBDocumentClient.from(dbClient, {
      marshallOptions: { removeUndefinedValues: true }
    });
  }
  return db;
};

const getS3 = () => {
  if (!s3Client) {
    s3Client = new S3Client({ region: getRegion() });
  }
  return s3Client;
}

export const tableNames = {
  people: "PenielPeople",
  requests: "PenielRequests",
  giving: "PenielGivingMethods",
  media: "PenielMedia",
  users: "PenielUsers",
  audit: "PenielAudit",
  settings: "PenielSettings",
  translations: "PenielTranslations"
} as const;

export async function getPeople(): Promise<Person[]> {
  const db = getDb();
  const result = await db.send(new ScanCommand({ TableName: tableNames.people }));
  return (result.Items ?? []) as Person[];
}

export async function createPerson(person: Omit<Person, "id" | "createdAt" | "updatedAt">): Promise<Person> {
  const db = getDb();
  const item: Person = { ...person, id: crypto.randomUUID(), createdAt: nowIso(), updatedAt: nowIso() };
  await db.send(new PutCommand({ TableName: tableNames.people, Item: item }));
  return item;
}

export async function updatePerson(id: string, updates: Partial<Person>): Promise<Person> {
  const db = getDb();
  const expression = [] as string[];
  const values: Record<string, unknown> = {};
  for (const key of Object.keys(updates)) {
    if (key === "id") continue;
    expression.push(`#${key} = :${key}`);
    values[`:${key}`] = (updates as any)[key];
  }
  if (!expression.length) throw new Error("No update fields provided");
  values[":updatedAt"] = nowIso();
  const result = await db.send(
    new UpdateCommand({
      TableName: tableNames.people,
      Key: { id },
      UpdateExpression: `SET ${expression.join(", ")}, #updatedAt = :updatedAt`,
      ExpressionAttributeNames: Object.fromEntries([...Object.keys(updates).map((key) => [`#${key}`, key]), ["#updatedAt", "updatedAt"]]),
      ExpressionAttributeValues: values,
      ReturnValues: "ALL_NEW"
    })
  );
  return result.Attributes as Person;
}

export async function getRequestItems(): Promise<ChurchRequest[]> {
  const db = getDb();
  const result = await db.send(new ScanCommand({ TableName: tableNames.requests }));
  return (result.Items ?? []) as ChurchRequest[];
}

export async function createRequest(request: Omit<ChurchRequest, "id" | "createdAt" | "updatedAt" | "status" | "currentStep" | "workflow">): Promise<ChurchRequest> {
  const db = getDb();
  const now = nowIso();
  const item: ChurchRequest = {
    ...request,
    id: crypto.randomUUID(),
    status: "PENDING",
    currentStep: 0,
    workflow: ["requester"],
    createdAt: now,
    updatedAt: now
  };
  await db.send(new PutCommand({ TableName: tableNames.requests, Item: item }));
  return item;
}

export async function updateRequest(id: string, updates: Partial<ChurchRequest>): Promise<ChurchRequest> {
  const db = getDb();
  const expression = [] as string[];
  const values: Record<string, unknown> = {};
  for (const key of Object.keys(updates)) {
    if (key === "id") continue;
    expression.push(`#${key} = :${key}`);
    values[`:${key}`] = (updates as any)[key];
  }
  if (!expression.length) throw new Error("No update fields provided");
  values[":updatedAt"] = nowIso();
  const result = await db.send(
    new UpdateCommand({
      TableName: tableNames.requests,
      Key: { id },
      UpdateExpression: `SET ${expression.join(", ")}, #updatedAt = :updatedAt`,
      ExpressionAttributeNames: Object.fromEntries([...Object.keys(updates).map((key) => [`#${key}`, key]), ["#updatedAt", "updatedAt"]]),
      ExpressionAttributeValues: values,
      ReturnValues: "ALL_NEW"
    })
  );
  return result.Attributes as ChurchRequest;
}

export async function getGivingMethods(): Promise<GivingMethod[]> {
  const db = getDb();
  const result = await db.send(new ScanCommand({ TableName: tableNames.giving }));
  return ((result.Items ?? []) as GivingMethod[]).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function upsertGivingMethod(method: GivingMethod): Promise<GivingMethod> {
  const db = getDb();
  const item = { ...method, updatedAt: nowIso() } as any;
  await db.send(new PutCommand({ TableName: tableNames.giving, Item: item }));
  return item as GivingMethod;
}

export async function getMediaAssets(): Promise<MediaAsset[]> {
  const db = getDb();
  const result = await db.send(new ScanCommand({ TableName: tableNames.media }));
  return (result.Items ?? []) as MediaAsset[];
}

export async function saveMediaAsset(asset: Omit<MediaAsset, "id" | "createdAt">): Promise<MediaAsset> {
  const db = getDb();
  const item: MediaAsset = { ...asset, id: crypto.randomUUID(), createdAt: nowIso() };
  await db.send(new PutCommand({ TableName: tableNames.media, Item: item }));
  return item;
}

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  const db = getDb();
  const result = await db.send(new GetCommand({ TableName: tableNames.settings, Key: { id: "website-settings" } }));
  return (result.Item as WebsiteSettings) ?? {
    churchName: "Peniel Ethiopian Evangelical Church",
    theme: "dark",
    primaryColor: "#06b6d4",
    secondaryColor: "#818cf8",
    footerText: "Peniel Church Center "+new Date().getFullYear(),
    socialLinks: {}
  };
}

export async function saveWebsiteSettings(settings: WebsiteSettings): Promise<WebsiteSettings> {
  const db = getDb();
  const item = { ...settings, id: "website-settings", updatedAt: nowIso() };
  await db.send(new PutCommand({ TableName: tableNames.settings, Item: item }));
  return item;
}

export async function getTranslations(): Promise<TranslationRecord[]> {
  const db = getDb();
  const result = await db.send(new ScanCommand({ TableName: tableNames.translations }));
  return (result.Items ?? []) as TranslationRecord[];
}

export async function saveTranslation(record: Omit<TranslationRecord, "id" | "updatedAt">): Promise<TranslationRecord> {
  const db = getDb();
  const item: TranslationRecord = { ...record, id: crypto.randomUUID(), updatedAt: nowIso() };
  await db.send(new PutCommand({ TableName: tableNames.translations, Item: item }));
  return item;
}

export async function createAuditEvent(event: Omit<AuditEvent, "id" | "createdAt">): Promise<AuditEvent> {
  const db = getDb();
  const item: AuditEvent = { ...event, id: crypto.randomUUID(), createdAt: nowIso() };
  await db.send(new PutCommand({ TableName: tableNames.audit, Item: item }));
  return item;
}

export async function getPresignedUploadUrl(key: string, contentType: string): Promise<string> {
  const bucket = getBucket();
  const s3 = getS3();
  const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
  return getSignedUrl(s3, command, { expiresIn: 900 });
}
