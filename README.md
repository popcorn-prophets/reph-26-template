# reph-26-template

Starter for the REPH AI Summit 2026 Academe Hackathon (onsite 5h build sprint). Next.js + Postgres + AI SDK, wired up so the team can start building the real flow immediately.

Rules: [`docs/mechanics.md`](docs/mechanics.md) · Company context: [`docs/relx-reph.md`](docs/relx-reph.md) · Team conventions: [`AGENTS.md`](AGENTS.md)

## Setup (about 5 minutes)

### Prerequisites

| Tool                                     | Version                          |
| ---------------------------------------- | -------------------------------- |
| Git + [GitHub CLI](https://cli.github.com) | any (`gh auth login` once)       |
| Node.js                                  | 24+ (see `.nvmrc`)               |
| pnpm                                     | via `corepack enable`            |
| Docker (with Compose)                    | any recent                       |

### Install and run

```bash
git clone git@github.com:popcorn-prophets/reph-26-template.git
cd reph-26-template

cp .env.example .env     # then set OPENROUTER_API_KEY (ask a teammate)
docker compose up -d db  # local Postgres (pgvector) on :5432
pnpm install
pnpm db:push             # create tables
pnpm dev                 # http://localhost:3000
```

Put the supplied hackathon files in `data/`. It is gitignored and confidential: never commit it or send it to any model/API not approved by REPH.

### Verify

- http://localhost:3000 loads and `GET /api/health` responds.
- `pnpm lint && pnpm build` pass (run before every push).

### Wire up your coding agent (optional)

Skills and MCP servers live in `.agents/`. Link them for the agent you use:

```bash
scripts/setup-agent.sh claude   # or copilot | cursor | codex | opencode | gemini | antigravity | all
```

On a fresh laptop you can instead let the agent do the whole setup: open it in the cloned repo and paste

```
Set up this machine for this repo by following docs/setup.md. Report only failures and what I must do manually.
```

`docs/setup.md` also covers AWS CLI login and the AWS MCP server.

### Troubleshooting

| Problem                          | Fix                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------- |
| Wrong Node version               | `fnm use` / `nvm use` (reads `.nvmrc`)                                                       |
| `pnpm` not found                 | `corepack enable`                                                                            |
| Port 5432 already in use         | Stop the other Postgres, or change the port in `docker-compose.yml` and `DATABASE_URL`       |
| `db:push` can't connect          | `docker compose ps` should show `db` running; check `DATABASE_URL` in `.env`                 |
| No Docker or Docker blocked      | Point `DATABASE_URL` at a remote Postgres/RDS instance                                       |
| AI calls fail                    | Check `OPENROUTER_API_KEY` (or `AI_API_KEY` + `AI_BASE_URL` for `openai-compatible`)         |

## Tech stack

| Layer            | Choice                                                                    |
| ---------------- | ------------------------------------------------------------------------- |
| Frontend         | Next.js + TypeScript                                                      |
| UI               | Tailwind CSS + shadcn/ui (tweakcn for theming)                            |
| Charts           | Recharts (shadcn charts)                                                  |
| Backend          | Next.js Server Actions / Route Handlers                                   |
| Database         | PostgreSQL + Drizzle ORM (RDS optional; Docker Compose locally)           |
| Validation       | Zod                                                                       |
| Auth             | Better Auth (optional, off by default)                                    |
| AI               | Vercel AI SDK, provider-switchable via env (OpenRouter / OpenAI-compatible) |
| Vector search    | pgvector (optional)                                                       |
| Hosting          | AWS EC2 + Docker (Vercel + Supabase for quick previews only)              |
| Tooling          | Prettier, ESLint, GitHub Actions (lint + build on PRs)                    |

## Environment variables

Defined in `.env.example`, validated in `src/env.ts` (missing values never crash boot; features check what they need).

| Variable                                  | Purpose                                                         |
| ----------------------------------------- | --------------------------------------------------------------- |
| `DATABASE_URL`                            | Postgres connection (default matches `docker-compose.yml`)      |
| `AI_PROVIDER`                             | `openrouter` (default) or `openai-compatible`                   |
| `AI_MODEL`                                | Model id for the provider (default `openrouter/free`)           |
| `OPENROUTER_API_KEY`                      | Key for `openrouter`                                            |
| `AI_API_KEY`, `AI_BASE_URL`               | Key and endpoint for `openai-compatible`                        |
| `AI_EMBEDDING_MODEL`                      | Only for vector search                                          |
| `ENABLE_AUTH`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` | Optional auth, see [`src/modules/auth/README.md`](src/modules/auth/README.md) |
| `POSTGRES_PASSWORD`                       | Production compose only                                         |

Never commit `.env`.

## Scripts

| Command                                      | Purpose                                      |
| -------------------------------------------- | -------------------------------------------- |
| `pnpm dev` / `build` / `start`               | Run, build, serve                            |
| `pnpm lint` / `format` / `typecheck`         | ESLint, Prettier, `tsc --noEmit`             |
| `pnpm db:push`                               | Sync Drizzle schema to the database          |
| `pnpm db:generate` / `db:migrate`            | Generate and apply SQL migrations            |
| `pnpm db:studio`                             | Drizzle Studio GUI                           |
| `pnpm auth:generate`                         | Regenerate auth schema after changing plugins |

## Project structure

```
src/
  app/          routes (thin pages, API routes incl. /api/health, /api/auth)
  modules/      one folder per feature: schema, actions, ai, components
  components/   shared UI (ui/ shadcn, ai-elements, kibo-ui, file-upload)
  lib/          shared helpers (ai.ts, ingest.ts, utils.ts)
  db/           Drizzle client
  env.ts        Zod-validated env
docs/           mechanics, company context, setup, deploy
scripts/        setup-agent.sh, deploy.sh
data/           supplied data (gitignored, confidential)
.agents/        canonical agent skills + MCP config
```

Features are vertical slices in `src/modules/` so three people can work in parallel; see [`src/modules/README.md`](src/modules/README.md). `demo` is an example slice (AI summary with human review): replace or delete it once the real flow exists.

## Building blocks

**AI.** All calls go through `src/lib/ai.ts`: `generateStructured()` returns Zod-validated output, `getModel()` picks the provider from env, `embedText`/`embedTexts` produce embeddings.

**File ingest.** `parseTable(file)` in `src/lib/ingest.ts` turns an uploaded `.csv`/`.xlsx` into rows. Pair it with `<FileUpload action={...} />` and a Server Action that reads `formData.get("file")`.

**Vector search (optional).** The db image is pgvector and `docker/init-pgvector.sql` enables the extension on first start (existing volume or RDS: run `CREATE EXTENSION IF NOT EXISTS vector;` once). Set `AI_EMBEDDING_MODEL`, store embeddings in a `vector("embedding", { dimensions: N })` column, and query:

```ts
db.select().from(docs).orderBy(cosineDistance(docs.embedding, await embedText(q))).limit(5);
```

**Auth (optional).** Self-contained Better Auth module, off by default. See [`src/modules/auth/README.md`](src/modules/auth/README.md).

## Workflow

- Never commit to `main`. Branch as `type/<short-desc>` (e.g. `feat/upload-form`), use Conventional Commits, and merge via a small PR that links its issue (`Closes #`). CI runs lint + build.
- Work is tracked as GitHub issues, one per teammate; see [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md).
- Add every mock, AI model, API and dev assistant to [`DISCLOSURE.md`](DISCLOSURE.md) as you go, and fill in [`WRITEUP.md`](WRITEUP.md) for submission.
- AI features that influence decisions need human review and a short rationale in the UI.

## Deploy

EC2 + Docker: see [`docs/deploy.md`](docs/deploy.md) and `scripts/deploy.sh`. `data/` is never deployed.
