# AGENTS.md

REPH AI Summit 2026 Academe Hackathon. 5h build sprint, live demo judged, 3 teammates each with an agent. Rules: `docs/mechanics.md`. Company: `docs/relx-reph.md`. Setup: `README.md`.

## Priorities

1. Working end-to-end flow on supplied data (35%): real input -> logic -> AI -> visible output. Nothing hardcoded or staged.
2. Business value (25%), AI essential (15%), feasible/scoped (15%), demo clarity (10%).

Thinnest vertical slice first. No polish before the core flow runs live. Feature freeze at 3:00.

## Hard rules

- `data/` is confidential: never commit it or send it to any model/API not approved by REPH. No external or synthetic data without approval.
- Disclose every mock, manual workaround, AI model, API and dev assistant in `DISCLOSURE.md`, in the same PR that adds it.
- AI that influences decisions needs human review in the UI with a short rationale.
- Never commit secrets. Keep `.env.example` current.

## Stack

Next.js + TypeScript, Tailwind + shadcn/ui, Recharts, Server Actions/Route Handlers, PostgreSQL + Drizzle, Zod, Vercel AI SDK, AWS EC2 + Docker. App in `src/`.

## Workflow

1. **Plan together, one driver** (not parallel agents): `grill-me` -> `to-spec` -> `to-tickets`. Spec is `docs/spec.md`, merged to `main` before building. It defines the shared contracts (DB tables, Zod schemas, module boundaries). Issues are assigned one per teammate.
2. **Build loop:** read `docs/spec.md` and your issue -> branch -> `implement-spec` -> PR -> a teammate's agent reviews -> merge -> pull `main` -> next issue.
3. **Freeze:** `main` green and deployed, mocks removed or disclosed, `DISCLOSURE.md` and `WRITEUP.md` final.

## Staying in sync

- Spec and issue are the source of truth. Change a contract by PR to `docs/spec.md` first and tell the team.
- Rebase on `origin/main` before each issue and each PR.
- One feature per `src/modules/<feature>/`. Don't edit a teammate's in-flight module.
- Shared files (`src/db`, `src/lib/ai.ts`, `src/env.ts`, `package.json`): own small PR, merge immediately.
- Stay in your issue's scope. New work becomes a new issue, not a bigger PR. No drive-by refactors.
- Blocked on a teammate: stub against the agreed Zod shape (disclose it, remove before freeze).
- Review: someone other than the author. Block only on a broken flow, contract mismatch, rule violation or leak. Else follow-up issue. Reviewer merges with a regular merge commit (`gh pr merge --merge`, no squash or rebase) when CI is green.

## Conventions

- Speed over polish; no speculative abstraction; tests only for risky core logic.
- Run `pnpm lint && pnpm build` and the flow live before opening a PR.
- Zod-validate AI output. AI calls live in `src/lib/ai.ts`, provider switchable by env.
- Stuck >10 min: `diagnosing-bugs`. Switching agents: `handoff`.

### Git

- Never commit to `main`. Branch `type/<short-desc>`, merge via PR. Small, short-lived PRs.
- Conventional Commits: `type(scope): description`. No co-author or tool mentions in commits or PRs.
- PR: concise title and body, `Closes #<n>`. Force-push only your own branch, with `--force-with-lease`.
- Issues (via `gh`, see `docs/agents/issue-tracker.md`): title, short description, acceptance criteria, blockers (if necessary). No labels or templates.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.
