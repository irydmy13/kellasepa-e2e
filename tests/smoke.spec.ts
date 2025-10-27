import { test, expect } from '../fixtures/session';

test.describe('Smoke after login', () => {
    test.beforeEach(async ({ loginAs }) => {
        await loginAs();
    });

    test('landing shows greeting', async ({ page }) => {
        await expect(page.getByText(/Tere\s+tulemast!/i)).toBeVisible();
    });

    test('can try to open haldus.php (accept both outcomes)', async ({ page }) => {
        await page.goto('/kellasepa/haldus.php', { waitUntil: 'domcontentloaded' });
        const url = page.url();
        const ok = /\/kellasepa\/haldus\.php/.test(url) || /\/kellasepa\/login\.php/.test(url);
        expect(ok).toBeTruthy();
    });
});
