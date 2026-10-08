#!/usr/bin/env bash
# Wire .agents/ (canonical skills + MCP) into the chosen agent's expected paths.
# Usage: scripts/setup-agent.sh claude|copilot|cursor|codex|opencode|gemini|antigravity|all
set -euo pipefail
cd "$(dirname "$0")/.."

link() { mkdir -p "$(dirname "$2")"; rm -rf "$2"; ln -s "$1" "$2"; echo "linked $2 -> $1"; }

# mcp <outfile> <js expr over m = parsed .agents/mcp.json>
mcp() {
  mkdir -p "$(dirname "$1")"
  node -e "const m=require('./.agents/mcp.json');console.log(JSON.stringify($2,null,2))" > "$1" && echo "wrote $1"
}

setup() {
  case "$1" in
    claude)  # CLAUDE.md already imports AGENTS.md
      link ../.agents/skills .claude/skills
      link .agents/mcp.json .mcp.json ;;
    copilot) # reads AGENTS.md + .github/copilot-instructions.md; VS Code MCP uses "servers" key
      link ../.agents/skills .github/skills
      mcp .vscode/mcp.json "{servers:m.mcpServers}" ;;
    cursor)  # reads AGENTS.md natively
      link ../.agents/skills .cursor/skills
      link ../.agents/mcp.json .cursor/mcp.json ;;
    codex)   # reads AGENTS.md + .agents/skills natively; MCP is global TOML
      echo "skills: nothing to do. MCP: add to ~/.codex/config.toml, e.g."
      echo '  [mcp_servers.shadcn]'; echo '  command = "npx"'; echo '  args = ["-y","shadcn@latest","mcp"]' ;;
    opencode) # reads AGENTS.md; MCP uses its own schema in opencode.json
      link ../.agents/skills .opencode/skills
      mcp opencode.json "{\$schema:'https://opencode.ai/config.json',mcp:Object.fromEntries(Object.entries(m.mcpServers).map(([k,v])=>[k,{type:'local',command:[v.command,...v.args]}]))}" ;;
    gemini)  # Gemini CLI: GEMINI.md imports AGENTS.md; mcpServers format matches
      link ../.agents/skills .gemini/skills
      mcp .gemini/settings.json "{mcpServers:m.mcpServers}" ;;
    antigravity) # reads AGENTS.md/GEMINI.md; workspace skills in .agent/skills; MCP is added in the IDE
      link ../.agents/skills .agent/skills
      echo "MCP: Agent panel > ... > MCP Servers > Manage > View raw config, paste .agents/mcp.json" ;;
    *) echo "unknown agent: $1"; exit 1 ;;
  esac
}

if [ "${1:-}" = all ]; then for a in claude copilot cursor codex opencode gemini antigravity; do setup $a; done
else setup "${1:?usage: $0 claude|copilot|cursor|codex|opencode|gemini|antigravity|all}"; fi
