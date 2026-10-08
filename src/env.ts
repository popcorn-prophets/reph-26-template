import { z } from "zod";

// Lenient on purpose: missing vars never crash boot; features check what they need.
const schema = z.object({
  DATABASE_URL: z.string().default("postgres://app:app@localhost:5432/app"),
  AI_PROVIDER: z.enum(["openrouter", "openai-compatible"]).default("openrouter"),
  AI_MODEL: z.string().default("openrouter/free"),
  AI_FALLBACK_MODEL: z.string().optional(),
  AI_TIMEOUT_MS: z.coerce.number().default(30000),
  AI_EMBEDDING_MODEL: z.string().optional(),
  AI_BASE_URL: z.string().optional(),
  OPENROUTER_API_KEY: z.string().optional(),
  AI_API_KEY: z.string().optional(),
  BETTER_AUTH_SECRET: z.string().optional(),
  BETTER_AUTH_URL: z.string().optional(),
});

export const env = schema.parse(process.env);
