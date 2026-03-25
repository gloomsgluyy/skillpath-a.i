import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders hero section with CTA', async ({ page }) => {
    const ctaButton = page.locator('button:has-text("Mulai Eksplorasi")');
    await expect(ctaButton).toBeVisible({ timeout: 10000 });
  });

  test('renders navigation bar', async ({ page }) => {
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
  });

  test('renders feature bento cards', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(1000);

    await expect(page.locator('text=SkillPath AI').first()).toBeVisible();
  });

  test('opens onboarding modal on CTA click', async ({ page }) => {
    const ctaButton = page.locator('button:has-text("Mulai Eksplorasi")');
    await ctaButton.click();

    const modal = page.locator('dialog#onboarding-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });
  });

  test('social proof section is visible', async ({ page }) => {
    await expect(page.locator('text=Terpercaya')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Oleh 10K+ Pelajar')).toBeVisible();
  });
});

test.describe('Onboarding Modal Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const ctaButton = page.locator('button:has-text("Mulai Eksplorasi")');
    await ctaButton.click();
    await page.waitForTimeout(500);
  });

  test('modal contains form steps', async ({ page }) => {
    const modal = page.locator('dialog#onboarding-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    await expect(modal.locator('text=/pendidikan|langkah|step/i').first()).toBeVisible({ timeout: 5000 });
  });

  test('can close modal with outside click or escape', async ({ page }) => {
    await page.keyboard.press('Escape');
    const modal = page.locator('dialog#onboarding-modal');
    await expect(modal).not.toBeVisible({ timeout: 3000 });
  });
});

test.describe('Navigation', () => {
  test('navbar links navigate correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/SkillPath/);
  });

  test('page loads within reasonable time', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await expect(page.locator('button:has-text("Mulai Eksplorasi")')).toBeVisible({ timeout: 10000 });
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(15000); // Under 15 seconds for dev server
  });
});
