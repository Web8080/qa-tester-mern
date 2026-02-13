## Test Cases – Buggy MERN App

Manual test cases by area (UI, API, AUTH, FILE, NF, regression). ID format and fields described below.

---

## 1. Conventions

- **ID format**
  - `UI-XX` – UI and UX‑focused cases.
  - `API-XX` – API behaviour and contracts.
  - `AUTH-XX` – Authentication and RBAC.
  - `FILE-XX` – File upload behaviour.
  - `NF-XX` – Non‑functional checks (performance, accessibility).

- **Fields**
  - `ID` – Unique case identifier.
  - `Title` – Short, descriptive name.
  - `Area` – Functional area under test.
  - `Preconditions` – Required state (e.g. seeded DB, logged‑in user).
  - `Steps` – Ordered list of actions.
  - `Expected Result` – What should happen if the system behaves correctly.
  - `Actual Result` – Filled in during execution.
  - `Status` – Not run / Pass / Fail / Blocked.
  - `Severity / Defect ID` – Severity and link to any logged bug.

---

## 2. UI and UX Test Cases (Login, Signup, Navigation, Items List)

| ID    | Title                                         | Area          | Preconditions                           | Steps (summary)                                                                 | Expected Result                                                                  | Actual Result | Status   | Severity / Defect ID |
|-------|-----------------------------------------------|---------------|-----------------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------|----------|----------------------|
| UI-01 | Display of login page                         | Login         | App running, no active session          | Navigate to login page from root URL.                                           | Login form is visible with email/password fields and sign‑in controls.           | As expected | Pass    |                      |
| UI-02 | Successful login as admin                     | Login         | Seeded admin account                    | Open login page, enter valid admin email/password, submit.                      | User is redirected to appropriate landing page and sees admin‑specific options.  | As expected (after proxy fix) | Pass |                      |
| UI-03 | Login error with invalid password             | Login         | Seeded admin account                    | Enter valid email with incorrect password, submit.                              | User remains on login page with clear, non‑technical error message.              |              | Not run  |                      |
| UI-04 | Signup form validation (required fields)      | Signup        | App running                             | Open signup page, leave required fields blank, submit.                          | User is blocked from continuing; validation errors are shown per field.          |              | Not run  |                      |
| UI-05 | Items list pagination basic behaviour         | Items list    | Logged in user with seeded items        | Navigate to items list, move between pages via pagination controls.             | Items list updates per page, no duplicates or missing items across pages.        |              | Not run  |                      |
| UI-06 | Items search interaction                      | Items list    | Logged in user with searchable dataset  | Enter search term, trigger search.                                              | List filters to matching items; clearing search restores default list.           |              | Not run  |                      |
| UI-07 | Item detail view layout and data              | Item detail   | Logged in user, at least one item       | Open an item from list to detail page.                                          | All key fields are displayed correctly; layout is readable on a desktop screen.  |              | Not run  |                      |
| UI-08 | Logout clears session and redirects           | Login         | Logged in as any role                   | Click logout (or equivalent).                                                  | User is logged out and redirected to login or home; protected routes no longer accessible. |              | Not run  |                      |
| UI-09 | Signup success and redirect                   | Signup        | App running                             | Submit signup with valid email, password, name.                                  | Account created; user redirected to login or dashboard; can log in with new credentials. | "An error occurred during signup." | Fail | BUG (signup) |
| UI-10 | Empty items list message                      | Items list    | Logged in user, no items in DB          | Navigate to items list.                                                          | Clear empty state (e.g. "No items found"); no crash or raw error.                |              | Not run  |                      |
| UI-11 | Create item form validation                   | Items CRUD    | Logged in as editor or admin            | Open create item form; submit with title or required fields empty.               | Validation prevents submit or shows field errors; no invalid data saved.         |              | Not run  |                      |
| UI-12 | Edit item form loads existing data            | Items CRUD    | Logged in editor/admin, existing item  | Open edit for an item.                                                          | Form shows current title/description; save updates the item correctly.          |              | Not run  |                      |
| UI-13 | Navigation to Login and Sign Up from home     | Navigation   | App running, not logged in               | From home/items list click Login; go back, click Sign Up.                        | Both links navigate to correct pages; back/forward behave sensibly.             |              | Not run  |                      |
| UI-14 | Admin dashboard or admin-only UI visibility    | RBAC/UI      | Logged in as admin                      | After login as admin, check for admin-only links or dashboard.                   | Admin sees admin-specific entry point; user/editor do not see it.                |              | Not run  |                      |
| UI-15 | Error message display on API failure           | UX           | Logged in user                          | Trigger an API error (e.g. invalid request or disconnect API).                   | User sees a clear, non-technical error message; no stack trace or raw JSON.      |              | Not run  |                      |

---

## 3. Authentication and RBAC Test Cases

| ID      | Title                                              | Area    | Preconditions                                    | Steps (summary)                                                                                       | Expected Result                                                                                          | Actual Result | Status   | Severity / Defect ID |
|---------|----------------------------------------------------|---------|--------------------------------------------------|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|--------------|----------|----------------------|
| AUTH-01 | Access restrictions for non‑authenticated user     | RBAC    | No active session                                | Attempt to access protected pages (items list, admin dashboard) directly via URL.                     | User is redirected to login or receives a suitable unauthorised response; no data is leaked.             |              | Not run  |                      |
| AUTH-02 | User role cannot create new item via UI            | RBAC    | Logged in as basic user                          | Navigate to items list or create page and attempt to create a new item.                               | User role has no create controls or receives a clear access denied message.                              |              | Not run  |                      |
| AUTH-03 | Editor role can create and edit but not delete     | RBAC    | Logged in as editor                              | Create a new item, then edit it; attempt to delete it.                                                | Create and edit succeed; delete is blocked or hidden for editor role.                                    |              | Not run  |                      |
| AUTH-04 | Admin role full access to items                    | RBAC    | Logged in as admin                               | Create, edit, and delete an item end‑to‑end.                                                          | All operations succeed; list and detail views reflect changes correctly.                                  | As expected after fixes | Pass |                      |
| AUTH-05 | API: forbidden access with user token to admin API | API/RBAC| Logged in as user, captured JWT                  | Call admin‑only API endpoint using user token (via script or client).                                 | API responds with appropriate forbidden/unauthorised status; no admin‑only data is returned.             |              | Not run  |                      |
| AUTH-06 | Behaviour with expired access token                | Auth    | Valid refresh token scenario set up              | Allow access token to expire (or simulate expiry), then perform an operation requiring authentication. | System either refreshes token appropriately or forces re‑login without exposing confusing error states.  |              | Not run  |                      |
| AUTH-07 | Signup then login with new account                 | Auth    | App running, seeded DB                          | Sign up with new email/password; then log in with same credentials.             | Signup succeeds; login returns tokens; user can access protected content.       |              | Not run  |                      |
| AUTH-08 | API rejects request with invalid or missing token | API/RBAC| None                                        | Call protected endpoint with no Authorization header or with malformed token.   | 401 response; no data returned.                                                 |              | Not run  |                      |
| AUTH-09 | Editor cannot access admin-only endpoint           | API/RBAC| Logged in as editor                             | Call admin-only endpoint (e.g. delete item or list users) with editor token.    | 403 (or 401); operation denied; no admin data in response.                      |              | Not run  |                      |

---

## 4. API Behaviour and Contract Test Cases

| ID    | Title                                  | Area  | Preconditions                           | Steps (summary)                                                                 | Expected Result                                                                  | Actual Result | Status   | Severity / Defect ID |
|-------|----------------------------------------|-------|-----------------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------|----------|----------------------|
| API-01| Login endpoint with valid credentials  | Auth  | Seeded test users                       | Send POST to login endpoint with correct credentials.                           | 2xx response, body contains access and refresh tokens with expected structure.    | 200 + tokens | Pass    |                      |
| API-02| Login endpoint with invalid password   | Auth  | Seeded test users                       | Send POST to login endpoint with wrong password.                                | 4xx response, no tokens returned, error message does not leak sensitive details. |              | Not run  |                      |
| API-03| Items list default pagination          | Items | Seeded items                            | GET items endpoint without query params.                                        | Response contains default page size, total count info, and consistent ordering.   | Pass after skip fix | Pass | BUG-001              |
| API-04| Items list with paging parameters      | Items | Seeded items                            | GET items with `page` and `limit` parameters.                                   | Response reflects requested page and size; boundaries handled gracefully.         |              | Not run  |                      |
| API-05| Item creation with missing required fields | Items | Valid editor or admin token              | POST to create item with missing or invalid fields.                             | 4xx validation error with clear messages; nothing is persisted.                  |              | Not run  |                      |
| API-06| Delete item unauthorised               | Items | Valid user or editor token, target item | Attempt DELETE on item endpoint using unauthorised role token.                  | 4xx/403 response; item remains intact in subsequent GET calls.                    |              | Not run  |                      |
| API-07| Get single item by ID                  | Items | Seeded items, valid token               | GET /api/items/:id with valid item id.                                          | 200; response contains item with that id, title, description, createdBy.         |              | Not run  |                      |
| API-08| Get item with invalid ID               | Items | Valid token                              | GET /api/items/:id with non-existent or invalid id.                             | 404 or 400; no 500; sensible error body.                                        |              | Not run  |                      |
| API-09| Update item with valid data (editor)   | Items | Editor token, existing item             | PUT /api/items/:id with valid title/description.                                | 200; item updated; GET returns new data.                                         |              | Not run  |                      |
| API-10| Refresh token returns new access token | Auth  | Valid refresh token                      | POST /api/auth/refresh with valid refresh token in body or cookie.              | 200; new access token (and optionally refresh) in response.                      |              | Not run  |                      |
| API-11| Signup endpoint creates user           | Auth  | None                                     | POST /api/auth/signup with valid email, password, name.                         | 201 or 200; user created; no plaintext password in response.                    |              | Not run  |                      |
| API-12| Items search query parameter           | Items | Seeded items, valid token               | GET /api/items?search=... with a search term.                                   | Response contains only items matching search; or empty array; status 200.         |              | Not run  |                      |

---

## 5. File Upload Test Cases

| ID     | Title                                        | Area       | Preconditions                         | Steps (summary)                                                                 | Expected Result                                                                  | Actual Result | Status   | Severity / Defect ID |
|--------|----------------------------------------------|------------|---------------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------|----------|----------------------|
| FILE-01| Upload valid image for item (editor/admin)   | File upload| Logged in as editor or admin          | Create or open an item, upload a valid image file via UI.                       | Upload succeeds, preview or link appears, API responds with expected metadata.   |              | Not run  |                      |
| FILE-02| Upload unsupported file type                 | File upload| Logged in as editor or admin          | Attempt to upload a non‑image file (e.g. `.txt` or `.exe`) for an item.         | Upload is rejected with clear message; no file is stored.                        |              | Not run  |                      |
| FILE-03| Upload file as basic user                    | File upload| Logged in as basic user               | Attempt to upload a file for an item.                                           | Operation is blocked or hidden for user role.                                    |              | Not run  |                      |
| FILE-04| Upload oversized file rejected               | File upload| Logged in as editor or admin          | Attempt to upload an image larger than allowed limit.                           | Upload rejected with clear message; no partial or full file stored.              |              | Not run  |                      |
| FILE-05| Upload endpoint without auth                 | File upload| No token or invalid token             | POST to upload endpoint without valid auth.                                      | 401 (or 403); upload rejected.                                                    |              | Not run  |                      |

---

## 6. Non‑Functional Test Cases (Performance and Accessibility)

| ID    | Title                                       | Area           | Preconditions                    | Steps (summary)                                                             | Expected Result                                                                | Actual Result | Status   | Severity / Defect ID |
|-------|---------------------------------------------|----------------|----------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------|--------------|----------|----------------------|
| NF-01 | Basic performance check on items list       | Performance    | API and frontend running         | Load items list repeatedly or run simple script to hit list endpoint.      | Response times remain within reasonable bounds without obvious degradation.     |              | Not run  |                      |
| NF-02 | Lighthouse check on main pages              | Performance/UX | Frontend running in browser      | Run Lighthouse (or similar) on home/items list and login pages.            | Scores highlight major performance or accessibility concerns for documentation. |              | Not run  |                      |
| NF-03 | Automated accessibility scan on main pages  | Accessibility  | Frontend running, test tool ready| Run automated accessibility scan (e.g. axe or Playwright accessibility).   | Issues are identified and captured for reporting; no critical blockers missed.  |              | Not run  |                      |
| NF-04 | Items list responsive layout                | UX/Responsive  | Browser, multiple viewport sizes  | Resize viewport to mobile width; check items list and login.                   | Layout adapts; no horizontal scroll; controls remain usable.                     |              | Not run  |                      |

---

## 7. Regression / Smoke (Critical Path)

| ID     | Title                                      | Area     | Preconditions              | Steps (summary)                                                                 | Expected Result                                                              | Actual Result | Status   | Severity / Defect ID |
|--------|--------------------------------------------|----------|-----------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------|--------------|----------|----------------------|
| REG-01 | Full flow: Login as user, view items list   | Smoke    | Seeded DB, app running      | Login as user@example.com; open items list.                                    | List loads; items visible; no console errors.                                 | Pass         | Pass    |                      |
| REG-02 | Full flow: Login as editor, create item    | Smoke    | Seeded DB, app running      | Login as editor; create new item with title and description; view list.        | Item appears in list; detail view shows correct data.                        | Pass after fixes | Pass |                      |
| REG-03 | Full flow: Login as admin, delete item    | Smoke    | Seeded DB, app running      | Login as admin; delete an item; refresh list.                                  | Item removed from list; GET by id returns 404 or equivalent.                 | Not run      | Not run |                      |
| REG-04 | API health: GET items without auth         | Smoke    | API running                 | GET /api/items (or health) without token.                                       | Either 200 with public data or 401; no 500.                                  | 200 + data   | Pass    |                      |
| REG-05 | Frontend loads without errors               | Smoke    | Frontend running             | Open http://localhost:3002; check console and network.                          | Page loads; no uncaught JS errors; API calls return 2xx or expected 4xx.     | Pass         | Pass    |                      |

---

## 8. Execution Notes

- As tests are run, the `Actual Result`, `Status`, and `Severity / Defect ID` columns will be updated.
- Additional test cases will be added under each section as new behaviours and edge cases are discovered during exploration.

