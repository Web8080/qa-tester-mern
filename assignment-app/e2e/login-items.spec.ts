import { test, expect } from "@playwright/test";

test.describe("Login then view items", () => {
  test("user can log in and see the items list on home", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/\/login/);

    const emailInput = page.getByPlaceholder("admin@example.com");
    await expect(emailInput).toBeVisible({ timeout: 10000 });
    await emailInput.fill("admin@example.com");
    await page.getByPlaceholder("••••••••").fill("AdminPass123!");
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Items" })).toBeVisible();
    await expect(page.getByRole("button", { name: /logout/i })).toBeVisible();
  });
});

test.describe("Admin flow: login then open Admin Dashboard", () => {
  test("admin can open Admin Dashboard and see create form and items list", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/\/login/);

    await page.getByPlaceholder("admin@example.com").fill("admin@example.com");
    await page.getByPlaceholder("••••••••").fill("AdminPass123!");
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page).toHaveURL("/");
    await page.getByRole("button", { name: /admin dashboard/i }).click();

    await expect(page).toHaveURL("/admin");
    await expect(page.getByRole("heading", { name: "Admin Dashboard" })).toBeVisible();
    await expect(page.getByText("Create New Item")).toBeVisible();
    await expect(page.getByText("All Items")).toBeVisible();
  });
});
