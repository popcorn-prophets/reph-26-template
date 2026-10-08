import { AnalyzeForm } from "@/modules/demo/components/analyze-form";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center">
      <h1 className="px-6 text-center text-2xl font-semibold">REPH 26 starter</h1>
      <AnalyzeForm />
    </main>
  );
}
