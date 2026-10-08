import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const globalForDb = globalThis as unknown as { client?: ReturnType<typeof postgres> };

const client =
  globalForDb.client ??
  postgres(process.env.DATABASE_URL ?? "postgres://app:app@localhost:5432/app");
if (process.env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client);
