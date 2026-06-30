# Peniel Church Center v1.0

Production monorepo for Peniel Ethiopian Evangelical Church: a bilingual public website and authenticated Church Center SaaS console.

## Workspace

```text
apps/
  website/        Public bilingual website
  church-center/  Authenticated operations console
packages/
  ui/ notifications/ workflows/ forms/ utils/
  auth/ database/ types/
amplify/          AWS backend metadata
docs/             Architecture, API, database, deployment
```

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck
pnpm test
```

## Core Capabilities

- English and Amharic website with future Tigrinya support.
- Member import, phone registration, pending approval, and directory management.
- Purchase, budget, and program workflows.
- Dynamic giving methods that can be enabled, disabled, removed, and reordered.
- Media library for images, videos, PDFs, documents, and hero assets.
- Role-based permissions, invitation-only users, and audit logging.
- Amplify Gen 2 architecture for Cognito, DynamoDB, S3, SES, and CloudFront.
