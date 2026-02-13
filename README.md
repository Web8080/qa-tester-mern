# QA Tester – MERN Take-Home

Deliverables for the QA technical assignment: test strategy, test cases, bug report, and automated tests for the buggy MERN app in `assignment-app/`.

**Docs:** [TEST_STRATEGY.md](./TEST_STRATEGY.md) | [TEST_CASES.md](./TEST_CASES.md) | [REPORT.md](./REPORT.md)

---

## Setup

From repo root:

```bash
cd assignment-app
docker compose up --build -d
docker compose exec api npm run seed
```

Frontend: http://localhost:3002. API: http://localhost:3001.

Without Docker: copy `assignment-app/.env.example` to `.env`, run MongoDB locally, then `npm run dev` (API) and `npm run dev:web` (frontend) from `assignment-app/`. See `assignment-app/README.md` for details.

---

## How to run tests

All commands from `assignment-app/`:

| What | Command |
|------|---------|
| Unit + integration | `npm run test` |
| API smoke | `npm run test:smoke` (API must be running) |
| E2E | `npm run test:e2e`. With Docker: `PLAYWRIGHT_BASE_URL=http://localhost:3002 npm run test:e2e`. Run `npx playwright install chromium` once. |

---

## Default logins (after seed)

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | AdminPass123! | admin |
| editor@example.com | EditorPass123! | editor |
| user@example.com | UserPass123! | user |

---

## Submission

Push this repo to: **https://github.com/Web8080/qa-tester-mern** (or submit a ZIP). Included: this README (setup + how to run tests), [REPORT.md](./REPORT.md) (strategy summary, bugs, coverage, recommendations), [TEST_STRATEGY.md](./TEST_STRATEGY.md), [TEST_CASES.md](./TEST_CASES.md), and automated tests in `assignment-app/`.
