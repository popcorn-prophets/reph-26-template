import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "./auth-schema";

// Reads BETTER_AUTH_SECRET and BETTER_AUTH_URL from env automatically.
// Add plugins/social providers here, then re-run `pnpm auth:generate`.
function create() {
  return betterAuth({
    database: drizzleAdapter(db, { provider: "pg", schema }),
    emailAndPassword: { enabled: true },
    session: { cookieCache: { enabled: true, maxAge: 5 * 60 } },
    plugins: [nextCookies()], // keep last
  });
}

// Lazy so an unconfigured app (no secret) never fails at build/boot unless auth is actually used.
let instance: ReturnType<typeof create> | undefined;
export function getAuth() {
  return (instance ??= create());
}

export type Session = ReturnType<typeof create>["$Infer"]["Session"];
