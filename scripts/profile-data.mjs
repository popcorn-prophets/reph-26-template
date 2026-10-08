// Profile every .csv/.xlsx in data/ (or the paths given): rows, columns, types, nulls, uniques.
// Runs locally only; nothing is sent to any model or API. Usage: pnpm data:profile [file...]
import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file/node";

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync("data")
      .filter((f) => /\.(csv|xlsx)$/i.test(f))
      .map((f) => join("data", f));

if (!files.length) {
  console.log("No .csv/.xlsx files found in data/.");
  process.exit(0);
}

const isEmpty = (v) => v === null || v === undefined || (typeof v === "string" && v.trim() === "");

function inferType(values) {
  const v = values.filter((x) => !isEmpty(x));
  if (!v.length) return "empty";
  if (v.every((x) => x instanceof Date)) return "date";
  if (v.every((x) => typeof x === "boolean" || /^(true|false)$/i.test(String(x)))) return "boolean";
  // Leading zeros mean an identifier, not a number.
  if (v.every((x) => /^0\d+$/.test(String(x)))) return "id (zero-padded)";
  if (v.every((x) => /^-?\d+(\.\d+)?$/.test(String(x)) && !/^-?0\d/.test(String(x))))
    return v.every((x) => /^-?\d+$/.test(String(x))) ? "integer" : "number";
  if (v.every((x) => !isNaN(Date.parse(String(x))) && /\d{4}|\d{1,2}[/-]\d{1,2}/.test(String(x))))
    return "date?";
  return "text";
}

function profile(name, rows) {
  console.log(`\n=== ${name}: ${rows.length} rows ===`);
  const cols = [...new Set(rows.flatMap((r) => Object.keys(r)))];
  const table = cols.map((c) => {
    const vals = rows.map((r) => r[c]);
    const nulls = vals.filter(isEmpty).length;
    const uniq = new Set(vals.filter((x) => !isEmpty(x)).map(String));
    const sample = [...uniq].slice(0, 3).map((s) => (s.length > 24 ? s.slice(0, 24) + "…" : s));
    return {
      column: c,
      type: inferType(vals),
      "null %": rows.length ? +((nulls / rows.length) * 100).toFixed(1) : 0,
      unique: uniq.size,
      sample: sample.join(" | "),
    };
  });
  console.table(table);
}

for (const file of files) {
  const buf = readFileSync(file);
  if (/\.xlsx$/i.test(file)) {
    for (const { sheet, data } of await readXlsxFile(buf)) {
      if (!data.length) continue;
      const [header, ...rest] = data;
      const keys = header.map((h) => String(h ?? "").trim());
      profile(
        `${basename(file)} [${sheet}]`,
        rest.map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? null]))),
      );
    }
  } else {
    const { data } = Papa.parse(buf.toString("utf8"), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
    });
    profile(basename(file), data);
  }
}
