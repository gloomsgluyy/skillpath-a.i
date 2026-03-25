import { test, expect } from '@playwright/test';

test.describe('Protected Pages (Unauthenticated)', () => {
  test('paths page shows login prompt', async ({ page }) => {
    await page.goto('/paths');
    await expect(page.locator('text=Login Diperlukan')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('button:has-text("Kembali")')).toBeVisible();
  });

  test('journey page shows login prompt', async ({ page }) => {
    await page.goto('/journey');
    await expect(page.locator('text=Login Diperlukan')).toBeVisible({ timeout: 15000 });
  });

  test('projects page shows login prompt', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.locator('text=Login Diperlukan')).toBeVisible({ timeout: 15000 });
  });

  test('profile page shows login prompt', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('text=Login Diperlukan')).toBeVisible({ timeout: 15000 });
  });

  test('back button on login prompt navigates home', async ({ page }) => {
    await page.goto('/paths');
    await expect(page.locator('text=Login Diperlukan')).toBeVisible({ timeout: 15000 });
    
    const backButton = page.locator('button:has-text("Kembali")');
    await backButton.click();
    
    await expect(page).toHaveURL('/', { timeout: 5000 });
  });
});

test.describe('API Documentation Page', () => {
  test('api-doc page loads', async ({ page }) => {
    await page.goto('/api-doc');
    await page.waitForTimeout(3000);
    
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
  });
});
