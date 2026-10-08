"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { analyze, type AnalyzeResult } from "../actions";

export function AnalyzeForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [pending, start] = useTransition();

  function run() {
    start(async () => {
      const res = await analyze(text);
      if ("error" in res) toast.error(res.error);
      else setResult(res);
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-6">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text to analyze..."
        rows={6}
      />
      <Button onClick={run} disabled={pending}>
        {pending ? "Analyzing..." : "Analyze"}
      </Button>
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>AI suggestion</CardTitle>
            <CardDescription>{result.rationale}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>{result.summary}</p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => toast.success("Accepted")}>
                Accept
              </Button>
              <Button size="sm" variant="outline" onClick={() => setResult(null)}>
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
