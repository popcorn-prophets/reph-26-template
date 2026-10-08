"use server";

import { z } from "zod";
import { generateStructured } from "@/lib/ai";

const resultSchema = z.object({
  summary: z.string().describe("One or two sentence summary"),
  rationale: z.string().describe("Short reasoning behind the summary"),
});

export type AnalyzeResult = z.infer<typeof resultSchema>;

// Smoke-test action: proves input -> logic -> AI -> output. Replace with real flow.
export async function analyze(text: string): Promise<AnalyzeResult | { error: string }> {
  if (!text.trim()) return { error: "Enter some text" };
  try {
    return await generateStructured(resultSchema, text, "Summarize the user's text.");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "AI call failed" };
  }
}
