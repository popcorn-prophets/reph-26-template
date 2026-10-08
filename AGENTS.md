# AGENTS.md

REPH AI Summit 2026 Academe Hackathon. Onsite 5h build sprint, live demo judged. Rules: `docs/mechanics.md`. Company background (RELX/REPH): `docs/relx-reph.md`.

## Priorities (judging weights)

1. Working end-to-end flow on supplied data (35%). Input -> real logic -> AI -> visible output. No hardcoded or staged output.
2. Business value (25%). Tie every feature to the brief's pain point and a measurable outcome.
3. AI is essential to the outcome (15%), not decorative.
4. Feasible, maintainable, scoped (15%). Demo clarity (10%).

Build the thinnest vertical slice first, then widen. Never polish before the core flow runs live.

## Hard rules

- Data in `data/` is confidential. Never commit it, paste it into external services, or send it to any model/API not approved by REPH. It stays in the event environment.
- Do not add external or synthetic data without approval.
- Disclose every mock, simulated feature, manual workaround, AI model, API and dev assistant in `DISCLOSURE.md` as you add them.
- AI features that influence decisions need human review/oversight in the UI, with a short rationale shown.
- Never commit secrets. Use `.env` (gitignored); keep `.env.example` current.

## Stack

Next.js + TypeScript, Tailwind + shadcn/ui, Recharts, Server Actions/Route Handlers, PostgreSQL + Drizzle, Zod, Vercel AI SDK (Anthropic/OpenAI via env), AWS EC2 + Docker. Next.js app lives in the repo root (`src/`).

## Conventions

- Speed over polish. Simple, working code; no speculative abstraction, no tests unless the core logic is risky.
- Prettier + ESLint. Run lint + build before pushing.
- Zod-validate AI output (structured output). Keep AI calls in one module, provider switchable by env.

### Git

- Never commit to `main`. Every change goes on a branch (`type/<short-desc>`, e.g. `feat/upload-form`) and merges via PR.
- Conventional Commits: `type(scope): description`. Keep it concise.
- Small, focused branches and PRs, merged quickly. Keep them short-lived to avoid conflicts between the 3 of us.
- PR: concise title and description, link issue wiht `Closes #`. One teammate reviews/merges; skip templates and ceremony.
- Do not co-author commits or mention yourself/tools in commit messages.
- Force-push (`--force-with-lease`) only on your own branch, never on `main`.
- Work is tracked as GitHub issues, one per (parallel) unit of work, assigned per teammate.
- Minimal issues: title, short description, acceptance criteria, blockers. No labels, projects or templates.

## Workflow

1. `grill-me` on the brief (short, time-boxed).
2. `to-spec`: short spec/PRD.
3. `to-tickets`: split into parallel GitHub issues, assigned per teammate.
4. Each person: `implement-spec` on their issue, then branch and PR.
5. Verify with `webapp-testing`; `diagnosing-bugs` when stuck; `handoff` when switching agents.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.
