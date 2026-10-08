# reph-26-template

## Tech Stack

| Layer            | Choice                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------- |
| Frontend         | Next.js + TypeScript                                                                     |
| UI               | Tailwind CSS + shadcn/ui (tweakcn for theming)                                           |
| Charts           | Recharts (shadcn charts)                                                                 |
| Backend          | Next.js Server Actions / Route Handlers                                                  |
| Database         | PostgreSQL + Drizzle ORM                                                                 |
| Managed database | AWS RDS PostgreSQL (optional; alternative: Postgres in Docker Compose)                   |
| Validation       | Zod                                                                                      |
| Auth             | Better Auth (optional)                                                                   |
| Storage          | AWS S3 (optional; alternative: local disk)                                               |
| AI               | Vercel AI SDK, provider-switchable (Anthropic / OpenAI via env)                          |
| Vector search    | pgvector (optional)                                                                      |
| Data/ML          | Python + pandas + NumPy + scikit-learn + XGBoost (heavily optional; likely not needed)   |
| Hosting          | AWS EC2 + Docker                                                                         |
| Preview hosting  | Vercel + Supabase (optional; quick testing/previews only, then deploy to AWS)            |
| Formatting       | Prettier                                                                                 |
| Linting          | ESLint                                                                                   |
| Version control  | GitHub                                                                                   |
| CI/CD            | GitHub Actions (optional; minimal lint + build check on PRs; Vercel for preview deploys) |
