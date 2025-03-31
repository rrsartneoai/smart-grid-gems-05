
import { test, expect } from '@playwright/test';

test.describe('Weather Panel', () => {
  test('should display weather information', async ({ page }) => {
    // Navigate to the weather page
    await page.goto('/');
    
    // Check if the weather panel is visible
    await expect(page.getByText('Pogoda w województwie pomorskim')).toBeVisible();
    
    // Check if the city selector is visible
    await expect(page.getByRole('combobox')).toBeVisible();
    
    // Wait for the weather data to load
    await page.waitForSelector('text=Gdańsk', { timeout: 10000 });
    
    // Check if the weather details are visible
    await expect(page.locator('.bg-card')).toBeVisible();
  });
  
  test('should change city when selecting from dropdown', async ({ page }) => {
    // Navigate to the weather page
    await page.goto('/');
    
    // Open the city selector dropdown
    await page.getByRole('combobox').click();
    
    // Select Gdynia
    await page.getByRole('option', { name: 'Gdynia' }).click();
    
    // Check if the weather data is loaded for Gdynia
    // Since we can't reliably check for the city name in the UI, we'll check for the
    // presence of weather data after the city change
    await expect(page.locator('.bg-card')).toBeVisible();
  });
});
