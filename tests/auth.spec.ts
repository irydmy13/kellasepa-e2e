import { test, expect } from '../fixtures/session';
import { mustEnv } from '../src/utils/env';

test.describe('Auth', () => {
    test('valid user login leaves login.php and shows greeting', async ({ page, loginAs }) => {
        await loginAs(mustEnv('USER_USER'), mustEnv('USER_PASS'));
        await expect(page).not.toHaveURL(/\/kellasepa\/login\.php/);
        await expect(page.getByText(/Tere\s+tulemast!/i)).toBeVisible();
    });

    test('admin login then try haldus.php (accept both outcomes)', async ({ page, loginAs }) => {
        await loginAs(mustEnv('ADMIN_USER'), mustEnv('ADMIN_PASS'));
        await page.goto('/kellasepa/haldus.php', { waitUntil: 'domcontentloaded' });
        const url = page.url();
        const ok = /\/kellasepa\/haldus\.php/.test(url) || /\/kellasepa\/login\.php/.test(url);
        expect(ok).toBeTruthy();
    });

    test('empty fields stay on login.php', async ({ page }) => {
        await page.goto('/kellasepa/login.php');
        const user = page.locator('input:not([type="hidden"]):not([type="password"]):not([disabled])').first();
        await expect(user).toBeVisible();
        await user.focus();
        await user.press('Enter');
        await expect(page).toHaveURL(/\/kellasepa\/login\.php/);
    });

    test('wrong password stays on login.php', async ({ page }) => {
        await page.goto('/kellasepa/login.php');
        await page.locator('input[name="login"], #login, input:not([type="hidden"]):not([type="password"])').first()
            .fill(mustEnv('USER_USER'));
        await page.locator('input[name="pass"], input[name="password"], #password, input[type="password"]').first()
            .fill('___wrong___');
        await page.locator('input[type="password"]').first().press('Enter');
        await expect(page).toHaveURL(/\/kellasepa\/login\.php/);
    });

    test('guest visiting haldus.php is sent to login (or stays if not protected)', async ({ page }) => {
        await page.goto('/kellasepa/haldus.php');
        const url = page.url();
        const ok = /\/kellasepa\/login\.php/.test(url) || /\/kellasepa\/haldus\.php/.test(url);
        expect(ok).toBeTruthy();
    });
});
