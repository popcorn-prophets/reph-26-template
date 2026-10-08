import "server-only";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  embed,
  embedMany,
  generateText,
  Output,
  type EmbeddingModel,
  type LanguageModel,
} from "ai";
import type { z } from "zod";
import { env } from "@/env";

/** Provider is switched by AI_PROVIDER / AI_MODEL. All AI calls go through this module. */
export function getModel(id: string = env.AI_MODEL): LanguageModel {
  switch (env.AI_PROVIDER) {
    case "openai-compatible":
      return createOpenAICompatible({
        name: "custom",
        baseURL: env.AI_BASE_URL ?? "",
        apiKey: env.AI_API_KEY,
      }).chatModel(id);
    default:
      return createOpenRouter({ apiKey: env.OPENROUTER_API_KEY }).chat(id);
  }
}

/**
 * Zod-validated structured output. Each attempt is capped at AI_TIMEOUT_MS; on failure it
 * retries once with AI_FALLBACK_MODEL (if set) so one slow or bad call doesn't kill a demo.
 */
export async function generateStructured<T extends z.ZodType>(
  schema: T,
  prompt: string,
  system?: string,
): Promise<z.infer<T>> {
  const ids = [env.AI_MODEL, env.AI_FALLBACK_MODEL].filter((id): id is string => !!id);
  let lastError: unknown;
  for (const id of ids) {
    try {
      const { output } = await generateText({
        model: getModel(id),
        system,
        prompt,
        output: Output.object({ schema }),
        abortSignal: AbortSignal.timeout(env.AI_TIMEOUT_MS),
      });
      return output as z.infer<T>;
    } catch (err) {
      lastError = err;
      console.warn(`[ai] ${id} failed:`, err instanceof Error ? err.message : err);
    }
  }
  throw lastError;
}

function getEmbeddingModel(): EmbeddingModel {
  const id = env.AI_EMBEDDING_MODEL;
  if (!id) throw new Error("Set AI_EMBEDDING_MODEL to use embeddings");
  if (env.AI_PROVIDER === "openai-compatible")
    return createOpenAICompatible({
      name: "custom",
      baseURL: env.AI_BASE_URL ?? "",
      apiKey: env.AI_API_KEY,
    }).embeddingModel(id);
  return createOpenRouter({ apiKey: env.OPENROUTER_API_KEY }).textEmbeddingModel(id);
}

/** Embed one string (for pgvector queries). */
export async function embedText(value: string): Promise<number[]> {
  const { embedding } = await embed({ model: getEmbeddingModel(), value });
  return embedding;
}

/** Embed many strings (for indexing). */
export async function embedTexts(values: string[]): Promise<number[][]> {
  const { embeddings } = await embedMany({ model: getEmbeddingModel(), values });
  return embeddings;
}
