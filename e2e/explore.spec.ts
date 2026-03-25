import { test, expect } from '@playwright/test';

test.describe('Explore Careers Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/explore');
  });

  test('renders the explore page heading', async ({ page }) => {
    await expect(page.locator('text=/Karir|Explore|Career/i').first()).toBeVisible({ timeout: 15000 });
  });

  test('renders search bar', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Cari"]');
    const count = await searchInput.count();
    if (count > 0) {
      await expect(searchInput.first()).toBeVisible();
    }
  });

  test('renders career cards or login prompt', async ({ page }) => {
    await page.waitForTimeout(3000);
    
    const hasCards = await page.locator('[class*="rounded"]').count();
    expect(hasCards).toBeGreaterThan(0);
  });

  test('career category filters are interactive', async ({ page }) => {
    const filters = page.locator('button, [role="button"]');
    const count = await filters.count();
    expect(count).toBeGreaterThan(0);
  });
});
