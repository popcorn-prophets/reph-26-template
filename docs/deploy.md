# Deploy to AWS (EC2 + Docker)

Written for an agent to follow. Use the AWS MCP server and the `aws-compute` / `aws-iam` skills. Never read secret values into context; use `asm-exec` for Secrets Manager.

Before deploying: confirm the event environment allows it. Never deploy `data/` (it is excluded by `.dockerignore` and `scripts/deploy.sh`).

## One-time infra

1. Key pair (or SSM Session Manager). Save the `.pem` outside the repo.
2. Security group: inbound 22 (your IP only), 80 (and 443 if using TLS).
3. EC2: Amazon Linux 2023, `t3.small` or larger, 20 GB gp3, with user-data:
   ```bash
   #!/bin/bash
   dnf install -y docker rsync
   systemctl enable --now docker
   usermod -aG docker ec2-user
   mkdir -p /usr/local/lib/docker/cli-plugins
   curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
     -o /usr/local/lib/docker/cli-plugins/docker-compose
   chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
   ```
4. Allocate and associate an Elastic IP.
5. Optional: RDS PostgreSQL instead of the `db` container; set `DATABASE_URL` in `.env` and drop the `DATABASE_URL` override in `docker-compose.prod.yml`.

## Deploy

```bash
cp .env.example .env        # fill AI keys, POSTGRES_PASSWORD, BETTER_AUTH_*
scripts/deploy.sh ec2-user@<elastic-ip> ~/.ssh/key.pem
```

It rsyncs the source and `.env`, starts the db, pushes the Drizzle schema, then builds and starts the app on port 80.

## Notes

- Logs: `ssh ... "cd app && docker compose -f docker-compose.prod.yml logs -f app"`.
- HTTPS (optional): put Caddy in front, or use an ALB + ACM.
- Set `BETTER_AUTH_URL` to the public URL if auth is used.
