import "server-only";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output, type LanguageModel } from "ai";
import type { z } from "zod";
import { env } from "@/env";

/** Provider is switched by AI_PROVIDER / AI_MODEL. All AI calls go through this module. */
export function getModel(): LanguageModel {
  const id = env.AI_MODEL;
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

/** Zod-validated structured output. */
export async function generateStructured<T extends z.ZodType>(
  schema: T,
  prompt: string,
  system?: string,
): Promise<z.infer<T>> {
  const { output } = await generateText({
    model: getModel(),
    system,
    prompt,
    output: Output.object({ schema }),
  });
  return output as z.infer<T>;
}
