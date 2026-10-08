# Laptop setup

Written for an agent to follow on a fresh company laptop. Be concise. Ask the user only for things you cannot do (logins, keys).

## Copy-paste prompt

Clone the repo first (`git clone git@github.com:popcorn-prophets/reph-26-template.git`), open your agent in it, then paste:

```
Set up this machine for this repo by following docs/setup.md. Report only failures and what I must do manually.
```

Before cloning (agent not yet in the repo):

```
Clone git@github.com:popcorn-prophets/reph-26-template.git, then set up this machine by following docs/setup.md in it.
```

## Steps

Skip anything already installed (check versions first). Use whatever the OS provides (winget/brew/apt/dnf); prefer user-level installs if no admin rights.

1. **Tools**: `git`, `gh`, Node matching `.nvmrc` (use `fnm`/`nvm`), `pnpm` (`corepack enable`), Docker (+ Compose), AWS CLI v2.
2. **Auth** (tell the user to run these, they are interactive; in Claude Code via `! <cmd>`):
   - `gh auth login`, then `git config --global user.name/user.email`
   - `aws login` (see `signing-in-to-aws` skill) or the event-provided SSO/credentials
3. **Agent wiring**: `scripts/setup-agent.sh <claude|copilot|cursor|codex|opencode|gemini|antigravity>` for the agent in use.
4. **AWS MCP / skills**: follow https://raw.githubusercontent.com/aws/agent-toolkit-for-aws/refs/heads/main/setup-instructions/setup.md
5. **Project**:
   ```bash
   cp .env.example .env            # ask the user for the AI API keys/vars it lists; never print them
   docker compose up -d db
   pnpm install
   pnpm db:push
   ```
6. **Data**: place supplied files in `data/` (gitignored, confidential). Never upload or send them to any external service or unapproved model.
7. **Verify**: `pnpm lint && pnpm build`, then `pnpm dev` and confirm http://localhost:3000 loads.
8. **Disclose**: add the dev assistant/models used to `DISCLOSURE.md`.

## Done when

`gh auth status`, `aws sts get-caller-identity`, `docker ps` (db up), and `pnpm build` all succeed.

## If blocked

Locked-down laptop (no admin, no Docker, blocked npm/registry): tell the user which and propose the fallback (portable Node, remote Postgres/RDS via `DATABASE_URL`, run on EC2 per `docs/deploy.md`).
