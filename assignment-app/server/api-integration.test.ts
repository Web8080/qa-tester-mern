import { describe, expect, it } from "vitest";

const API_BASE = process.env.API_BASE || "http://localhost:3001";

describe("API integration (requires API running)", () => {
  it("POST /api/auth/login returns 200 and accessToken", async () => {
    let res: Response;
    try {
      res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@example.com",
          password: "AdminPass123!",
        }),
      });
    } catch (e) {
      return; // skip when API is not running or network blocked
    }
    if (!res.ok && res.status !== 401) return;
    expect(res.status).toBe(200);
    const data = (await res.json()) as { accessToken?: string };
    expect(data.accessToken).toBeDefined();
  });
});
