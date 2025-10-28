# REPORT

- Login ja logout toimivad stabiilselt; vale parool/tühjad väljad ei lase sisse.
- Põhinavigatsioon /kellasepa/ all töötab (avaleht, teenused, tellimused – kui olemas).
- Kaitstud leht `haldus.php` on role-based: ilma sisselogimiseta ligipääsu ei anta (redirect või keelamine).
- Testid ei jäta andmeid ega vaja kunstlikke pause (ainult selged ootused).

- Mõnes keskkonnas `haldus.php` käitumine võib erineda (redirect vs. 403) — see on aktsepteeritud testides.
- Vormil puudub eraldi “nähtav” veateade tühjade väljade puhul (leht jääb loginile) — UX parendusvõimalus.

- HTML-aruanded: käivita `npx playwright show-report` (loodud kaust: `playwright-report/`).
- Tõrgete korral (kui oleks): screens ja videod `test-results/` (linkitud HTML-aruandes, “View trace”).

## System requirements
- OS: Windows 10/11, macOS, või Linux
- Node.js: ≥ 18 (soovitatav 20), npm ≥ 9
- Playwright browsers: paigaldatakse käsuga `npx playwright install` (Chromium)

## Setup
```bash
npm ci
npx playwright install --with-deps
cp .env.example .env     # täida päris BASE_URL ja kasutajad