export const schema = {
  auth: "Cognito user pool with Super Admin bootstrap and invitation-only users",
  data: ["People", "Requests", "GivingMethods", "MediaAssets", "Translations", "AuditEvents"],
  storage: "S3 media bucket fronted by CloudFront",
  notifications: "SES email plus in-app notification records",
};
