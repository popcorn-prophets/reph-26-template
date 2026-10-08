# Auth module (optional)

Self-contained Better Auth (email + password). Nothing else in the app depends on it; ignore it if unused.

## Enable
1. `.env`: set `BETTER_AUTH_SECRET` (`openssl rand -base64 32`) and `BETTER_AUTH_URL` (public URL; `http://localhost:3000` locally).
2. `src/db/schema.ts`: uncomment `export * from "@/modules/auth/schema"`.
3. `pnpm db:push`.
4. Check `GET /api/auth/ok`, then visit `/sign-up`.

## Use
- Protect a server component/action: `const user = await requireUser()` from `@/modules/auth/session` (redirects to `/sign-in`). Use `getSession()` for optional sessions.
- Header: render `<UserMenu />` from `@/modules/auth/components/user-menu`.
- Client: `authClient` from `@/modules/auth/client` (`useSession`, `signOut`, ...).
- Authorize in every server action / route handler that touches user data, not only in pages. Add `proxy.ts` only as an optimistic redirect, never as the sole check.

## Extend
Add plugins/social providers in `server.ts` (and client plugins in `client.ts`), then `pnpm auth:generate && pnpm db:push`.

## Remove
Delete `src/modules/auth`, `src/app/(auth)`, `src/app/api/auth`, the `auth:generate` script, and the commented line in `src/db/schema.ts`.
