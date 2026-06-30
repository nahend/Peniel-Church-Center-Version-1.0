export const backend = {
  auth: { provider: "amazon-cognito", bootstrapRole: "SUPER_ADMIN", invitationsOnly: true },
  data: { provider: "amazon-dynamodb" },
  storage: { provider: "amazon-s3", cdn: "amazon-cloudfront" },
  email: { provider: "amazon-ses" },
} as const;
