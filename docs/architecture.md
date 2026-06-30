# Architecture
Peniel Church Center v1.0 is a pnpm/Turborepo monorepo with two Next.js 15 applications: public `website` and authenticated `church-center`. Shared packages isolate UI, auth permissions, database constants, workflows, notifications, forms, types, and utilities.

## Security
Cognito is the identity provider. Only a Super Admin exists at bootstrap; all other accounts are invitation-only. Every write path validates input, checks granular permissions, and emits audit events.
