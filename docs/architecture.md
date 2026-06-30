# Architecture

Peniel Church Center v1.0 is a production-oriented SaaS monorepo for Peniel Ethiopian Evangelical Church. It separates the public bilingual website from the authenticated operations console while sharing typed domain packages.

## Applications

- `apps/website`: public, SEO-focused bilingual website for visitors, members, giving, live worship, and membership registration.
- `apps/church-center`: authenticated Church Center console for Super Admin and ministry staff.

## Shared Packages

- `@peniel/ui`: dark glass UI primitives and layout components.
- `@peniel/types`: canonical TypeScript contracts for people, requests, giving, roles, permissions, notifications, and audit logs.
- `@peniel/auth`: role-based permission matrix and authorization helpers.
- `@peniel/workflows`: configurable approval workflows for purchase, budget, and program requests.
- `@peniel/forms`: input validation for phone registration and future form modules.
- `@peniel/database`: DynamoDB table/index names and repository contracts.
- `@peniel/notifications`: invitation and notification message builders.
- `@peniel/utils`: reusable date, assertion, and slug helpers.

## Runtime Architecture

Next.js route handlers expose REST endpoints. Amplify Gen 2 provisions Cognito, DynamoDB, S3, SES, and CloudFront. Cognito is invitation-only after Super Admin bootstrap. Every privileged action must pass authorization, validation, persistence, notification, and audit logging stages.

## Security Baseline

- HTTPS at the edge through Amplify Hosting and CloudFront.
- Cognito authentication with invitation-only users.
- Granular permissions mapped from roles.
- Server-side input validation.
- Audit events for sensitive reads, writes, approvals, settings changes, and invitations.
- Future SMS is modeled as a notification channel but not enabled until a provider is selected.
