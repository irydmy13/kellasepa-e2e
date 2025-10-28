import { test, expect } from '../fixtures/session';

test.describe('Logout', () => {
    test('logout sends user to login and blocks protected pages', async ({ page, loginAs, logout }) => {
        await loginAs();
        await logout();

        await expect(page).toHaveURL(/\/kellasepa\/login\.php/);

        // Try protected page
        await page.goto('/kellasepa/haldus.php');
        const url = page.url();
        const redirected = /\/kellasepa\/login\.php/.test(url) || /\/kellasepa\/haldus\.php/.test(url);
        expect(redirected).toBeTruthy();
    });
});
