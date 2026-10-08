import "server-only";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file/node";

export type Row = Record<string, string | number | boolean | Date | null>;
export type Sheet = { sheet: string; rows: Row[] };

function toRows(header: unknown[], rows: unknown[][]): Row[] {
  const keys = header.map((h) => String(h ?? "").trim());
  return rows.map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? null])) as Row);
}

/**
 * Parse an uploaded .csv/.xlsx File into one entry per sheet (CSV -> a single "csv" sheet).
 * Use inside a Server Action.
 */
export async function parseSheets(file: File): Promise<Sheet[]> {
  if (/\.xlsx$/i.test(file.name)) {
    const sheets = await readXlsxFile(Buffer.from(await file.arrayBuffer()));
    return sheets
      .filter((s) => s.data.length > 0)
      .map(({ sheet, data: [header, ...rows] }) => ({ sheet, rows: toRows(header, rows) }));
  }
  // No dynamicTyping: values stay strings so IDs like "00123" or 20-digit codes survive.
  const { data } = Papa.parse<Row>(await file.text(), {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  return [{ sheet: "csv", rows: data }];
}

/**
 * Parse an uploaded .csv/.xlsx File into header-keyed rows. Reads the first sheet unless
 * `sheet` (name) is given; throws if the workbook has several sheets and none is chosen,
 * so no sheet is dropped silently. Use `parseSheets` to get all of them.
 */
export async function parseTable(file: File, sheet?: string): Promise<Row[]> {
  const sheets = await parseSheets(file);
  if (sheet) {
    const found = sheets.find((s) => s.sheet === sheet);
    if (!found)
      throw new Error(
        `Sheet "${sheet}" not found. Available: ${sheets.map((s) => s.sheet).join(", ")}`,
      );
    return found.rows;
  }
  if (sheets.length > 1)
    throw new Error(
      `Workbook has ${sheets.length} sheets (${sheets.map((s) => s.sheet).join(", ")}). Pass a sheet name or use parseSheets().`,
    );
  return sheets[0]?.rows ?? [];
}
