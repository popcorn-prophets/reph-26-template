#!/usr/bin/env bash
# Usage: scripts/deploy.sh <user@host> [ssh-key]
# Syncs source (never data/ or .env) to the EC2 host, pushes .env, applies schema, rebuilds app.
set -euo pipefail
HOST="${1:?usage: deploy.sh user@host [ssh-key]}"
KEY="${2:-}"
SSH="ssh ${KEY:+-i $KEY} -o StrictHostKeyChecking=accept-new"
DIR=/home/${HOST%@*}/app

rsync -az --delete -e "$SSH" \
  --exclude node_modules --exclude .next --exclude .git --exclude data \
  --exclude '.env*' --exclude .agents --exclude .claude \
  ./ "$HOST:$DIR/"
[ -f .env ] && rsync -az -e "$SSH" .env "$HOST:$DIR/.env"
C="docker compose -f docker-compose.prod.yml"
$SSH "$HOST" "cd $DIR && $C up -d db && $C run --rm migrate && $C up -d --build app"
echo "Deployed: http://${HOST#*@}"
