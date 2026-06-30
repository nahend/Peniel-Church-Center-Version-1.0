# DynamoDB Design

## Tables

| Table | Purpose | Key access patterns |
| --- | --- | --- |
| `PenielPeople` | Members, visitors, pending registrations, imported historical members | Directory, approval queues, phone dedupe, ministry grouping |
| `PenielRequests` | Purchase, budget, and program requests | Workflow queues, requester history, status dashboards |
| `PenielGivingMethods` | Dynamic giving configuration | Enabled methods, ordering, publishing to website |
| `PenielMediaAssets` | Images, videos, documents, PDFs, hero assets | Media library, kind filters, website usage |
| `PenielUsers` | Cognito-linked application users and roles | User management, invitation state, permission review |
| `PenielAuditEvents` | Immutable security and workflow history | Actor timelines, entity history, compliance review |
| `PenielNotifications` | In-app notification inbox and delivery state | User inbox, unread counts, delivery audits |
| `PenielTranslations` | English, Amharic, and future Tigrinya content | Locale publishing and missing translation review |

## Indexes

- `byStatus`: people approval queues and member/visitor directories.
- `byPhone`: phone registration dedupe and lookup.
- `byTypeStatus`: request queues per module and workflow state.
- `byRequester`: requester history and dashboards.
- `byActorDate`: audit review by actor and date.
- `byKind`: media filtering for images, videos, PDFs, documents, and hero images.
