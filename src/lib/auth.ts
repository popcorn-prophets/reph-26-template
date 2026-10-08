import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { env } from "@/env";

// Optional: the app works without a session. Nothing is route-guarded by default.
export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET || "dev-only-secret-change-me-dev-only-secret",
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: true },
  plugins: [nextCookies()],
});
