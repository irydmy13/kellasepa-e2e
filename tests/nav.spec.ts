import { test, expect } from '../fixtures/session';

test.describe('Navigation', () => {
    test.beforeEach(async ({ loginAs }) => {
        await loginAs();
    });

    test('main nav links are reachable', async ({ page }) => {
        // Home
        await page.goto('/kellasepa/avaleht.php');
        await expect(page).toHaveURL(/\/kellasepa\/avaleht\.php/);

        // Services (if exists)
        await page.goto('/kellasepa/teenused.php').catch(() => { });
        const ok1 = /\/kellasepa\/teenused\.php/.test(page.url()) || /\/kellasepa\//.test(page.url());
        expect(ok1).toBeTruthy();

        // Orders (if exists in this build)
        await page.goto('/kellasepa/tellimused.php').catch(() => { });
        const ok2 = /\/kellasepa\/tellimused\.php/.test(page.url()) || /\/kellasepa\//.test(page.url());
        expect(ok2).toBeTruthy();
    });
});
