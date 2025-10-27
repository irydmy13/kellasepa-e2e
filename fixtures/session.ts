import { test as base } from '@playwright/test';
import { mustEnv } from '../src/utils/env';

type Login = {
    loginAs: (username?: string, password?: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const test = base.extend<Login>({
    loginAs: async ({ page }, use) => {
        const doLogin = async (
            username = mustEnv('USER_USER'),
            password = mustEnv('USER_PASS')
        ) => {
            
            await page.goto('/kellasepa/login.php', { waitUntil: 'domcontentloaded' });

            const user = page.locator(
                [
                    'input[name="login"]',
                    '#login',
                    'input[name="kasutaja"]',
                    'input[name="kasutajanimi"]',
                    'input[name*="user" i]',
                    'input[name="email"]',
                    '#email',
                    'input[type="email"]',
                    'input:not([type="hidden"]):not([type="password"]):not([disabled])'
                ].join(', ')
            ).first();

            const pwd = page.locator(
                [
                    'input[name="pass"]',
                    'input[name="password"]',
                    '#password',
                    'input[name*="parool" i]',
                    'input[type="password"]'
                ].join(', ')
            ).first();

            await base.expect(user).toBeVisible({ timeout: 5000 });
            await base.expect(pwd).toBeVisible({ timeout: 5000 });

            await user.fill(username);
            await pwd.fill(password);

            await pwd.press('Enter');

            await page.waitForLoadState('domcontentloaded');
        };
        await use(doLogin);
    },

    logout: async ({ page }, use) => {
        const doLogout = async () => {
            await page.goto('/kellasepa/logout.php').catch(() => { });
        };
        await use(doLogout);
    },
});

export { expect } from '@playwright/test';