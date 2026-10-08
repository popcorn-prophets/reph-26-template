import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Placeholder table; replace with the real schema once the brief is known.
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
