# Kellasepa E2E

Playwright tests for: https://irynadmytrenko24.thkit.ee/kellasepa

## 1) Configure
Copy `.env.example` to `.env` and fill real credentials:
```
BASE_URL=https://irynadmytrenko24.thkit.ee/kellasepa
ADMIN_USER=...
ADMIN_PASS=...
USER_USER=...
USER_PASS=...
```

## 2) Install & Run
```bash
npm i
npx playwright install
npm test
# UI:
npm run test:ui
# Report:
npm run report
```

Selectors are semantic (labels/placeholders/roles). Adjust in `fixtures/session.ts` if your markup differs.
