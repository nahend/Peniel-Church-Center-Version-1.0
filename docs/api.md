# REST API

All endpoints are implemented as Next.js App Router route handlers and are designed to be backed by Amplify Gen 2 data clients.

## Public Website

### `POST /api/member-registration`
Registers a future member from a phone-first public form. The endpoint validates name, phone, gender, and ministry group, then creates a pending approval record.

## Church Center

### `GET /api/people`
Returns people directory records for authorized users.

### `POST /api/people`
Creates a pending person record for administrative entry or import pipelines.

### `GET /api/requests`
Returns request workflow definitions and request queues.

### `POST /api/requests`
Creates a purchase, budget, or program request and attaches the configured workflow.

### `GET /api/giving`
Returns ordered dynamic giving methods including Tithe.ly, Zelle, PayPal, Stripe, CashApp, and Venmo.

### `GET /api/users`
Returns roles, permissions, invitation policy, and bootstrap role metadata.
