// Wipe the public schema and re-push the Drizzle schema. Local DB only unless --remote.
// Usage: pnpm db:reset
import { spawnSync } from "node:child_process";
import postgres from "postgres";

try {
  process.loadEnvFile();
} catch {}

const url = process.env.DATABASE_URL ?? "postgres://app:app@localhost:5432/app";
const host = new URL(url).hostname;
if (!["localhost", "127.0.0.1", "db"].includes(host) && !process.argv.includes("--remote")) {
  console.error(`Refusing to reset non-local database "${host}". Pass --remote to override.`);
  process.exit(1);
}

const sql = postgres(url);
await sql.unsafe(
  "drop schema public cascade; create schema public; create extension if not exists vector;",
);
await sql.end();
console.log(`Reset ${host}. Pushing schema...`);
process.exit(
  spawnSync("pnpm", ["exec", "drizzle-kit", "push", "--force"], { stdio: "inherit" }).status ?? 1,
);
