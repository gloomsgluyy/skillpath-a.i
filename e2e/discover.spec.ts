import { test, expect } from '@playwright/test';

test.describe('Discover Yourself Page', () => {
  test('renders the assessment UI', async ({ page }) => {
    await page.goto('/discover');

    await expect(page.locator('text=/Pertanyaan|Selesai/i').first()).toBeVisible({ timeout: 15000 });
  });

  test('shows progress indicator', async ({ page }) => {
    await page.goto('/discover');

    await expect(page.locator('text=/1/').first()).toBeVisible({ timeout: 15000 });
  });

  test('answer buttons are clickable', async ({ page }) => {
    await page.goto('/discover');
    await page.waitForTimeout(2000);

    const buttons = page.locator('button[aria-label*="Skala"]');
    const count = await buttons.count();
    expect(count).toBe(5); // 5 scale options
  });

  test('clicking an answer advances to next question', async ({ page }) => {
    await page.goto('/discover');
    await page.waitForTimeout(2000);

    const firstButton = page.locator('button[aria-label*="Skala"]').first();
    await firstButton.click();

    await page.waitForTimeout(1000);
    await expect(page.locator('text=Pertanyaan 2')).toBeVisible({ timeout: 5000 });
  });
});
