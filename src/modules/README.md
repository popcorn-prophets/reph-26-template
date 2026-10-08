# Modules (vertical slices)

One folder per feature, so three people can work in parallel without touching each other's files.

```
src/modules/<feature>/
  schema.ts        Drizzle tables (auto-picked up by drizzle.config.ts glob)
  actions.ts       "use server" actions / data access for this feature
  ai.ts            prompts + Zod schemas, calls generateStructured() from @/lib/ai
  components/      UI used only by this feature
src/app/<route>/page.tsx   thin: import from the module and render
```

## Rules
- Own your module; don't edit another's. Cross-module use goes through its exported actions/components only.
- Shared code lives outside modules: `src/components/ui` (shadcn), `src/lib` (ai, utils), `src/db` (client), `src/env.ts`. Change these in small, quick PRs.
- Tables: only `db.select()/insert()` (no relational `db.query`, so no shared schema barrel). Prefix table names with the module (e.g. `claims_items`) to avoid collisions.
- Shared conflict hotspots: `src/app/layout.tsx` (nav links), `package.json`/lockfile, `.env.example`, `DISCLOSURE.md`. Keep edits to one line and merge fast.
- AI output is Zod-validated and shown with a rationale and human accept/reject. Disclose each new model/mock in `DISCLOSURE.md`.
- Schema workflow: `pnpm db:push` (everyone's tables). Coordinate before renaming/dropping columns on a shared DB.

`demo` is an example slice (AI summary with human review). Replace or delete it once the real flow exists. `auth` is opt-in, see its README.
