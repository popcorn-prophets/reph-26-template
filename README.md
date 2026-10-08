# reph-26-template

## Tech Stack

| Layer            | Choice                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------- |
| Frontend         | Next.js + TypeScript                                                                     |
| UI               | Tailwind CSS + shadcn/ui (tweakcn for theming)                                           |
| Charts           | Recharts (shadcn charts)                                                                 |
| Backend          | Next.js Server Actions / Route Handlers                                                  |
| Database         | PostgreSQL + Drizzle ORM                                                                 |
| Managed database | AWS RDS PostgreSQL (optional; alternative: Postgres in Docker Compose)                   |
| Validation       | Zod                                                                                      |
| Auth             | Better Auth (optional)                                                                   |
| Storage          | AWS S3 (optional; alternative: local disk)                                               |
| AI               | Vercel AI SDK, provider-switchable (Anthropic / OpenAI via env)                          |
| Vector search    | pgvector (optional)                                                                      |
| Data/ML          | Python + pandas + NumPy + scikit-learn + XGBoost (heavily optional; likely not needed)   |
| Hosting          | AWS EC2 + Docker                                                                         |
| Preview hosting  | Vercel + Supabase (optional; quick testing/previews only, then deploy to AWS)            |
| Formatting       | Prettier                                                                                 |
| Linting          | ESLint                                                                                   |
| Version control  | GitHub                                                                                   |
| CI/CD            | GitHub Actions (optional; minimal lint + build check on PRs; Vercel for preview deploys) |

## Agent setup

Skills and MCP live in `.agents/` (canonical). Instructions: `AGENTS.md`. Wire them to your agent:

```bash
scripts/setup-agent.sh claude   # or copilot | cursor | codex | opencode | gemini | antigravity | all
```

## Quickstart

```bash
cp .env.example .env            # add OPENROUTER_API_KEY
docker compose up -d db         # local Postgres
pnpm install
pnpm db:push                    # sync schema
pnpm dev
```

## Scripts

| Command                                       | Purpose                       |
| --------------------------------------------- | ----------------------------- |
| `pnpm dev` / `build` / `start`                | Run, build, serve             |
| `pnpm lint` / `format` / `typecheck`          | Checks (run lint + build before pushing) |
| `pnpm db:push` / `db:generate` / `db:studio`  | Drizzle schema sync, migrations, GUI |
| `pnpm auth:generate`                          | Regenerate auth schema after changing plugins |

## Project structure

```
src/
  app/          routes (thin pages, API routes)
  modules/      one folder per feature: schema, actions, ai, components
  components/ui shadcn/ui
  lib/          shared helpers (ai.ts, utils)
  db/           Drizzle client
  env.ts        Zod-validated env
```

Features are vertical slices in `src/modules/` so teammates work in parallel; see `src/modules/README.md`.

## AI

All AI calls go through `src/lib/ai.ts` (Vercel AI SDK). Switch with `AI_PROVIDER` (`openrouter` | `openai-compatible`) and `AI_MODEL` (default `openrouter/free`). Output is Zod-validated.

## Vector search (optional)

The db image is pgvector and `docker/init-pgvector.sql` enables the extension on first start (existing volume or RDS: run `CREATE EXTENSION IF NOT EXISTS vector;` once). Embed with `embedText`/`embedTexts` from `@/lib/ai` (set `AI_EMBEDDING_MODEL`), store in a Drizzle `vector("embedding", { dimensions: N })` column, and query with `cosineDistance` from `drizzle-orm`:

```ts
db.select().from(docs).orderBy(cosineDistance(docs.embedding, await embedText(q))).limit(5);
```

## File ingest

`parseTable(file)` in `src/lib/ingest.ts` turns an uploaded `.csv`/`.xlsx` into rows. Pair it with `<FileUpload action={...} />` and a Server Action that reads `formData.get("file")`.

## Auth (optional)

Self-contained Better Auth module, off by default. See `src/modules/auth/README.md`.

## Deploy

EC2 + Docker: see `docs/deploy.md` and `scripts/deploy.sh`.
