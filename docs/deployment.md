# Deployment

## Prerequisites

- Node.js 22 or later.
- pnpm 9.15.4 through Corepack.
- AWS account with Amplify Gen 2 access.
- SES sender identity verified for invitation email.

## Deploy

1. Connect the repository to AWS Amplify Hosting.
2. Configure workspace build commands with `pnpm install --frozen-lockfile`, `pnpm typecheck`, and `pnpm build`.
3. Provision Cognito, DynamoDB, S3, SES, and CloudFront from the Amplify backend metadata.
4. Set required environment variables: `AWS_REGION`, public app URLs, SES sender, and Cognito app client IDs.
5. Bootstrap the first `SUPER_ADMIN`; all future users are invited from Church Center.
