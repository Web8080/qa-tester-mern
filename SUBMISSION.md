# Submission checklist and file locations

Use this to confirm deliverables and where to get them for submission.

---

## 1. GitHub repo link OR ZIP

- **Push this folder to GitHub:**  
  The assignment lives in `AariyaTech_software_tester_intern/`. That folder is not a git repo by default (git root is your home). To push only this assignment:

  1. Open a terminal and go to the assignment folder:
     ```bash
     cd /Users/user/AariyaTech_software_tester_intern
     ```
  2. Initialize a new repo and push to GitHub:
     ```bash
     git init
     git add .
     git commit -m "QA assignment: test strategy, cases, report, automation"
     git remote add origin https://github.com/Web8080/qa-tester-mern.git
     git branch -M main
     git push -u origin main
     ```
     If the repo already exists and has content, use `git pull origin main --rebase` then `git push origin main`, or force push only if you intend to replace the remote.

- **Or create a ZIP:**  
  Zip the contents of `AariyaTech_software_tester_intern` (so that README.md and REPORT.md are at the root of the ZIP). Upload that ZIP where the assignment is collected.

**Repo link to submit:**  
https://github.com/Web8080/qa-tester-mern

---

## 2. README.md (setup, how to run tests, env/config)

**Path:** `README.md` (repo root)

Contains:
- Setup (Docker commands; without Docker pointer to assignment-app)
- How to run tests (unit, smoke, E2E and `PLAYWRIGHT_BASE_URL` for Docker)
- Default logins
- Submission repo link

**Download / open:**  
From the repo root: `README.md`  
From GitHub: `https://github.com/Web8080/qa-tester-mern/blob/main/README.md`

---

## 3. Report (REPORT.md): strategy summary, bugs, coverage, recommendations

**Path:** `REPORT.md` (repo root)

Contains:
- Test strategy summary (Section 2)
- List of bugs found (Section 5: BUG-001, BUG-002, BUG-003 + setup defects table)
- Test coverage summary (Section 4)
- Recommendations / next steps (Section 7)

**Download / open:**  
From the repo root: `REPORT.md`  
From GitHub: `https://github.com/Web8080/qa-tester-mern/blob/main/REPORT.md`  
To export as PDF: open REPORT.md in a viewer/editor and use Print to PDF, or use a markdown-to-PDF tool.

---

## 4. Automated tests (in the repo)

**Paths:**

| Type        | Location |
|------------|----------|
| Unit       | `assignment-app/server/auth-utils.test.ts` |
| Unit       | `assignment-app/server/auth.logout.test.ts` |
| Integration| `assignment-app/server/api-integration.test.ts` |
| Smoke (API)| `assignment-app/scripts/smoke-tests.ts` |
| E2E        | `assignment-app/e2e/login-items.spec.ts` (two flows) |

**How to run (from `assignment-app/`):**

- Unit + integration: `npm run test`
- Smoke (API must be running): `npm run test:smoke`
- E2E (app + API up; Docker frontend on 3002):  
  `PLAYWRIGHT_BASE_URL=http://localhost:3002 npm run test:e2e`  
  Run `npx playwright install chromium` once if needed.

**Download / open from GitHub:**  
- https://github.com/Web8080/qa-tester-mern/tree/main/assignment-app (app + tests)  
- https://github.com/Web8080/qa-tester-mern/blob/main/assignment-app/server/auth-utils.test.ts  
- https://github.com/Web8080/qa-tester-mern/blob/main/assignment-app/e2e/login-items.spec.ts  
- etc.

---

## Quick verification before you submit

1. **Smoke:** From `assignment-app/`, with API running: `npm run test:smoke` (should pass).
2. **E2E:** With app and API up: `PLAYWRIGHT_BASE_URL=http://localhost:3002 npm run test:e2e` (run `npx playwright install chromium` once if required).
3. **Unit:** From `assignment-app/`: `npm run test` (should pass).

Smoke script was updated to use built-in `fetch` (no `node-fetch`). E2E needs Playwright browsers installed locally; if you haven’t run `npx playwright install chromium` in `assignment-app/`, do that before `npm run test:e2e`.
