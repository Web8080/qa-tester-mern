import { describe, expect, it } from "vitest";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./auth-utils";

const mockUser = {
  _id: "507f1f77bcf86cd799439011",
  email: "admin@example.com",
  role: "admin",
} as any;

describe("auth-utils", () => {
  it("verifyAccessToken returns null for invalid token", () => {
    expect(verifyAccessToken("invalid")).toBeNull();
    expect(verifyAccessToken("")).toBeNull();
    expect(verifyAccessToken("eyJhbGciOiJIUzI1NiJ9.bad.sign")).toBeNull();
  });

  it("verifyAccessToken returns payload for valid token", () => {
    const token = generateAccessToken(mockUser);
    const payload = verifyAccessToken(token);
    expect(payload).not.toBeNull();
    expect(payload?.userId).toBe(mockUser._id);
    expect(payload?.email).toBe(mockUser.email);
    expect(payload?.role).toBe(mockUser.role);
  });

  it("verifyRefreshToken returns null for wrong secret", () => {
    const token = generateAccessToken(mockUser);
    expect(verifyAccessToken(token)).not.toBeNull();
    expect(verifyRefreshToken(token)).toBeNull();
  });
});
