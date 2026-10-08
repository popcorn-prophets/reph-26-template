import { defineConfig } from "drizzle-kit";

try {
  process.loadEnvFile();
} catch {}

// Every module owns its tables in src/modules/<name>/schema.ts (picked up by glob).
// Auth tables are opt-in: set ENABLE_AUTH=true.
export default defineConfig({
  schema: [
    "./src/modules/*/schema.ts",
    ...(process.env.ENABLE_AUTH === "true" ? ["./src/modules/auth/auth-schema.ts"] : []),
  ],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
