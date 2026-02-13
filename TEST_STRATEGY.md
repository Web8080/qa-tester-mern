## Test Strategy – Buggy MERN App (QA Assignment)

Scope, risks, and how testing was planned for the assignment MERN app (7-day window).

---

## 1. Context and Objectives

- **Application under test**
  - Frontend: Next.js + React + TypeScript.
  - Backend: Node.js + Express + TypeScript.
  - Database: MongoDB (Mongoose).
  - Auth: JWT access + refresh tokens, role‑based access (user, editor, admin).
  - Extras: File uploads, Socket.IO real‑time updates, Docker‑based deployment.

- **Assignment objectives**
  - Expose defects across functionality, API contracts, auth/RBAC, security, performance, and UX.
  - Design and execute a structured set of manual test cases (40–50+).
  - Implement automated tests (unit, integration, and E2E) for critical flows.
  - Deliver a clear report summarising findings, coverage, and recommendations.

---

## 2. Scope, Focus, and Non‑Goals

- **In scope**
  - Core user journeys:
    - Signup → login → logout.
    - Items CRUD (create, read, update, delete).
    - File upload for items.
    - Admin and editor workflows.
  - API behaviour:
    - Authentication endpoints (signup, login, refresh).
    - Items endpoints (listing, detail, pagination, search, mutations).
  - Role‑based access control:
    - Enforcement of permissions for user, editor, and admin, at both API and UI layers.
  - Session and token handling:
    - Expired tokens, refresh behaviour, invalid or tampered tokens.
  - Basic non‑functional checks:
    - Performance sanity for key endpoints and main screens.
    - Accessibility sanity checks on primary pages.

- **Out of scope for this assignment**
  - Deep performance benchmarking or soak testing.
  - Exhaustive cross‑browser and device matrix (focus will be on a modern Chromium‑based browser and one additional browser if time allows).
  - Full localisation, internationalisation, or multi‑region testing.

---

## 3. Risks and Prioritisation

- **Key risk areas**
  - **Authentication and tokens**
    - Incorrect expiry handling, missing validation, and insecure storage of tokens.
  - **RBAC and authorisation**
    - Users performing actions outside their role (e.g. user deleting items, editor performing admin‑only operations).
  - **Input validation and security**
    - XSS, injection via item fields, weak validation on the API and client.
  - **API contracts and error handling**
    - Inconsistent status codes, leaky error messages, mismatched request/response shapes.
  - **Data integrity**
    - Partial updates, orphan data, and inconsistent state between UI and DB.

- **Priorities**
  - P1: Auth, RBAC, and security‑sensitive flows.
  - P2: Items CRUD and file uploads (business‑critical paths).
  - P3: UX, responsiveness, and usability issues.
  - P4: Performance and accessibility checks.

---

## 4. Test Levels and Types

- **Unit tests**
  - Target pure or mostly pure logic in:
    - Auth utilities (token creation/verification, expiry).
    - Middleware for auth and role checks.
    - Simple frontend utilities and hooks where it adds value.

- **Integration tests**
  - API + DB tests that exercise:
    - Auth endpoints (correct and incorrect logins, refresh behaviour).
    - Items endpoints (including error cases, missing fields, and invalid IDs).
    - Role‑based access at API layer (same endpoint with different roles).
    - File upload endpoint behaviour with realistic payloads.

- **End‑to‑end (E2E) tests**
  - Browser‑driven flows that validate:
    - Login/logout and session continuity.
    - Items CRUD from the UI.
    - A minimal admin journey.
    - File uploads initiated from the UI.

- **Non‑functional checks**
  - Lightweight performance checks against key endpoints and pages.
  - Automated accessibility scan on primary screens.

---

## 5. Test Design Approach by Area

- **UI and UX**
  - Validate:
    - Navigation between pages and clear feedback on actions.
    - Form validation (client‑side and server‑side behaviour).
    - Error and empty states on lists and detail pages.
    - Responsiveness on at least desktop and tablet breakpoints.

- **API and data**
  - Use both test scripts and API tools (or automated integration tests) to:
    - Verify contracts (fields, error codes, pagination behaviour).
    - Exercise typical, boundary, and invalid inputs.
    - Confirm that known bugs are captured with reproducible requests.

- **Authentication and RBAC**
  - For each role (user, editor, admin):
    - Define allowed and forbidden operations at API and UI levels.
    - Design negative tests where tokens are missing, expired, or tampered.
    - Check that sensitive actions are not available in the UI when not permitted.

- **File upload**
  - Test:
    - Supported file types and sizes.
    - Behaviour on invalid files (wrong type, oversized).
    - Permission model (who can upload, when, and to which items).

- **Real‑time updates**
  - Validate:
    - Whether items or related entities update live for connected clients where expected.
    - Behaviour on reconnects and simple failure scenarios if feasible within time.

---

## 6. Environments, Data, and Tooling

- **Environment**
  - Primary: Docker‑based stack using `docker-compose` as described in `SETUP.md`.
  - Alternative: Local Node + MongoDB as fallback if Docker is unavailable on the testing machine.

- **Test data**
  - Seed users:
    - `admin@example.com` / `AdminPass123!`
    - `editor@example.com` / `EditorPass123!`
    - `user@example.com` / `UserPass123!`
  - Additional data generated by seed scripts and manual actions during testing.

- **Tools**
  - Test frameworks:
    - Backend: Vitest (unit and integration).
    - Frontend: Vitest/React Testing Library where useful.
    - E2E: Playwright or Cypress (to be selected based on fit and setup effort).
  - Supporting tools:
    - Browser devtools, API clients (e.g. curl or similar), and simple load/perf tools.

---

## 7. Test Case Management and Traceability

- Test cases will be maintained in `TEST_CASES.md` with:
  - Unique IDs and categorisation (UI, API, auth/RBAC, file uploads, non‑functional).
  - Links from the final report to related test cases and defects.
- Defects will be referenced by ID in both `TEST_CASES.md` and `REPORT.md` to show which tests discovered which issues.

---

## 8. Exit Criteria (Per Assignment)

- Minimum of 40–50 documented test cases created and at least a core subset executed on the running system.
- Automated tests in place for:
  - Selected unit and integration scenarios in backend (auth, RBAC, items).
  - At least two key E2E flows.
- Documented list of defects with severity and priority, plus a concise recommendations section in `REPORT.md`.

