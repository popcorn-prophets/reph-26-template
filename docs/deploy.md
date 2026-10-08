# Deploy to AWS (EC2 + Docker)

Written for an agent to follow. Use the AWS MCP server and the `aws-compute` / `aws-iam` skills. Never read secret values into context; use `asm-exec` for Secrets Manager.

Before deploying: confirm the event environment allows it. Never deploy `data/` (it is excluded by `.dockerignore` and `scripts/deploy.sh`).

## One-time infra

1. Key pair (or SSM Session Manager). Save the `.pem` outside the repo.
2. Security group: inbound 22 (your IP only), 80 (and 443 if using TLS).
3. EC2: Amazon Linux 2023, 4 GB RAM or more (`next build` runs out of memory on 2 GB), 20 GB gp3, with user-data. Use an instance type your account allows (free-tier accounts reject `t3.medium`; `c7i-flex.large` worked). Check with `aws ec2 describe-instance-types --filters Name=free-tier-eligible,Values=true`:
   ```bash
   #!/bin/bash
   dnf install -y docker rsync
   systemctl enable --now docker
   usermod -aG docker ec2-user
   mkdir -p /usr/local/lib/docker/cli-plugins
   curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
     -o /usr/local/lib/docker/cli-plugins/docker-compose
   chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
   # Compose v5 needs buildx >= 0.17; the Amazon Linux docker package lacks it
   curl -SL https://github.com/docker/buildx/releases/download/v0.30.1/buildx-v0.30.1.linux-amd64 \
     -o /usr/local/lib/docker/cli-plugins/docker-buildx
   chmod +x /usr/local/lib/docker/cli-plugins/docker-buildx
   ```
   User-data takes 1-2 minutes. Wait until `ssh ... cloud-init status` says `done` and `docker compose version` works before deploying.
4. Allocate and associate an Elastic IP.
5. Optional: RDS PostgreSQL instead of the `db` container; set `DATABASE_URL` in `.env` and drop the `DATABASE_URL` override in `docker-compose.prod.yml`.

## Deploy

```bash
cp .env.example .env        # fill AI keys, POSTGRES_PASSWORD, BETTER_AUTH_*
scripts/deploy.sh ec2-user@<elastic-ip> ~/.ssh/key.pem
```

It rsyncs the source and `.env`, starts the db, pushes the Drizzle schema, then builds and starts the app on port 80. The first run takes about 4 minutes (image pulls plus build). Verify with `curl http://<ip>/api/health` (expect `{"ok":true,"db":true}`).

## Notes

- An empty AI key deploys fine, but Analyze fails with `Missing Authentication header`. Set the key in `.env` and rerun `scripts/deploy.sh` (it re-syncs `.env` and restarts the app).
- Tear down when done: delete the stack/instance, release the Elastic IP (billed while unattached or the instance is stopped) and delete the key pair.
- Logs: `ssh ... "cd app && docker compose -f docker-compose.prod.yml logs -f app"`.
- HTTPS (optional): put Caddy in front, or use an ALB + ACM.
- Set `BETTER_AUTH_URL` to the public URL if auth is used.
