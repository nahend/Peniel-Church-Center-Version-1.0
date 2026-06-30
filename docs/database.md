# DynamoDB Design
Tables: People, Requests, GivingMethods, MediaAssets, Users, AuditEvents.

Indexes: `byStatus` for member approval queues, `byPhone` for registration dedupe, `byTypeStatus` for workflow queues, and `byActorDate` for audit review.
