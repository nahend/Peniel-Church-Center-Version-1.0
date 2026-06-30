import { z } from "zod";
import type { MemberGroup, RequestType, Role } from "@peniel/types";

export const phonePattern = /^\+?[1-9]\d{7,14}$/;
export const requiredString = (value: string, label: string) => {
  if (!value.trim()) throw new Error(`${label} is required`);
  return value.trim();
};

export const personSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  gender: z.enum(["female", "male"]),
  occupation: z.string().optional(),
  phone: z.string().min(8, "Enter a valid phone number"),
  address: z.string().optional(),
  spouse: z.string().optional(),
  children: z.preprocess((value) => {
    if (typeof value === "string") {
      return value.split(",").map((child) => child.trim()).filter(Boolean);
    }
    return value;
  }, z.array(z.string()).optional()),
  group: z.enum(["Adult", "Young Adult", "Children Ministry"]),
  ministries: z.array(z.string()).optional(),
  privateNotes: z.string().optional()
});

export const requestSchema = z.object({
  title: z.string().min(5, "Title is required"),
  type: z.enum(["PURCHASE", "BUDGET", "PROGRAM"]),
  amount: z.number().min(0, "Amount must be positive").optional(),
  description: z.string().min(10, "Describe the request"),
  requesterId: z.string().uuid()
});

export const givingMethodSchema = z.object({
  name: z.string().min(3, "Method name is required"),
  enabled: z.boolean(),
  sortOrder: z.number().int().min(0),
  instructions: z.string().min(10, "Enter instructions"),
  url: z.string().url().optional()
});

export const websiteSettingsSchema = z.object({
  churchName: z.string().min(3),
  logoUrl: z.string().url().optional(),
  theme: z.enum(["dark", "light"]),
  primaryColor: z.string().min(3),
  secondaryColor: z.string().min(3),
  footerText: z.string().min(10),
  mapUrl: z.string().url().optional(),
  youtubeUrl: z.string().url().optional(),
  socialLinks: z.record(z.string().url())
});

export const memberRegistrationSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  message: z.string().min(10)
});

export const inviteUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(["SUPER_ADMIN", "PASTOR", "SECRETARY", "MEDIA_TEAM", "TRANSLATOR", "TREASURER", "CHAIRMAN", "ACCOUNTANT"]),
  fullName: z.string().min(2)
});

export const translationSchema = z.object({
  locale: z.enum(["en", "am", "ti"]),
  key: z.string().min(2),
  value: z.string().min(1)
});

export type PersonFormValues = z.infer<typeof personSchema>;
export type RequestFormValues = z.infer<typeof requestSchema>;
export type GivingMethodFormValues = z.infer<typeof givingMethodSchema>;
export type WebsiteSettingsValues = z.infer<typeof websiteSettingsSchema>;
export type MemberRegistrationValues = z.infer<typeof memberRegistrationSchema>;
export type InviteUserValues = z.infer<typeof inviteUserSchema>;
export type TranslationValues = z.infer<typeof translationSchema>;
