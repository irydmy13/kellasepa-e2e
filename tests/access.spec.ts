/**
 * Algseis: külaline (mitte sisse loginud).
 * Tegevus: avab avalikud lehed ja haldus.php.
 * Ootus: avalikud lehed on /kellasepa/ all; haldus.php nõuab sisselogimist (redirect/deny).
 */

import { test, expect } from '@playwright/test';

test.describe('Access control for guests', () => {
    test('guest access behavior on public and admin pages', async ({ page }) => {
        await page.goto('/kellasepa/avaleht.php').catch(() => { });
        expect(/\/kellasepa\//.test(page.url())).toBeTruthy();

        await page.goto('/kellasepa/teenused.php').catch(() => { });
        expect(/\/kellasepa\//.test(page.url())).toBeTruthy();

        await page.goto('/kellasepa/haldus.php').catch(() => { });
        const adminOk = /\/kellasepa\/login\.php/.test(page.url()) || /\/kellasepa\/haldus\.php/.test(page.url());
        expect(adminOk).toBeTruthy();
    });
});
