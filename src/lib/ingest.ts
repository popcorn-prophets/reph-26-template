import "server-only";
import Papa from "papaparse";
import { readSheet } from "read-excel-file/node";

export type Row = Record<string, string | number | boolean | Date | null>;

/** Parse an uploaded .csv/.xlsx File into header-keyed rows. Use inside a Server Action. */
export async function parseTable(file: File): Promise<Row[]> {
  if (/\.xlsx$/i.test(file.name)) {
    const [header, ...rows] = await readSheet(Buffer.from(await file.arrayBuffer()));
    const keys = header.map((h) => String(h ?? "").trim());
    return rows.map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? null])) as Row);
  }
  const { data } = Papa.parse<Row>(await file.text(), {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  return data;
}
