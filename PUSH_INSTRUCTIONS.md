# Push to GitHub - Network Issue Fix

You got: `fatal: unable to access 'https://github.com/Web8080/qa-tester-mern.git/': Could not resolve host: github.com`

This means CLOUD9 can't reach GitHub (DNS/network issue).

## Option 1: Fix network and push (if you have access)

Try these:

1. **Check DNS:**
   ```bash
   ping github.com
   # or
   nslookup github.com
   ```

2. **Use SSH instead of HTTPS** (if SSH keys are set up):
   ```bash
   git remote set-url origin git@github.com:Web8080/qa-tester-mern.git
   git push -u origin main
   ```

3. **Check proxy/firewall:** CLOUD9 might need proxy settings or VPN.

## Option 2: Remove node_modules from git (recommended first)

`node_modules` was committed. Remove it before pushing:

```bash
cd /Users/user/AariyaTech_software_tester_intern

# Remove node_modules from git (keep files locally)
git rm -r --cached assignment-app/node_modules/

# Commit the removal
git commit -m "Remove node_modules from git"

# Now try push again
git push -u origin main
```

## Option 3: Create ZIP file instead (if network won't work)

If you can't fix the network, create a ZIP:

```bash
cd /Users/user/AariyaTech_software_tester_intern

# Create ZIP excluding node_modules
zip -r qa-tester-mern-submission.zip . \
  -x "assignment-app/node_modules/*" \
  -x "*.git/*" \
  -x "test-results/*" \
  -x ".DS_Store"

# The ZIP will be at: qa-tester-mern-submission.zip
# Upload this to wherever the assignment is collected
```

## Option 4: Push from your local machine

1. Copy the assignment folder to your local machine (or clone if you can get it via another method).
2. On your local machine:
   ```bash
   cd /path/to/AariyaTech_software_tester_intern
   git init
   git add .
   git commit -m "QA assignment submission"
   git remote add origin https://github.com/Web8080/qa-tester-mern.git
   git branch -M main
   git push -u origin main
   ```

---

**Files to submit (all in repo root after push or in ZIP):**

- `README.md` - Setup and how to run tests
- `REPORT.md` - Strategy, bugs, coverage, recommendations  
- `TEST_STRATEGY.md` - Full test strategy
- `TEST_CASES.md` - 49 test cases
- `assignment-app/` - App + automated tests
