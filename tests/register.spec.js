// @ts-check
import { test, expect } from '@playwright/test';

test('registration form', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('http://localhost:5173/register'); // Update the URL if needed

    // Check if the title contains 'Create Account'
    await expect(page).toHaveTitle(/Melody Mentor/);

    // Fill out the registration form
    await page.fill('input[placeholder="Name"]', 'Test User 2');
    await page.fill('input[placeholder="Email"]', 'testuser3@example.com');
    await page.fill('input[placeholder="Password"]', 'password1');

    // Click the register button
    await page.click('button:has-text("Register Now")');

    // Wait for success message
    const successMessage = await page.locator('text=User registered successfully!');
    await expect(successMessage).toBeVisible();

    // Optionally, check if redirected to login after a delay
    await page.waitForTimeout(2000); // Wait for the redirect
    await expect(page).toHaveURL(/\/login$/); // Verify the URL is now the login page
});
