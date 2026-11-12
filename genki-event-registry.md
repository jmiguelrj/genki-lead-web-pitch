<!-- @genki-alias: [GENKI-DOC-REGISTRY] -->
# Genki Lead Web Pitch (`genki-lead-web-pitch`) — Architectural Event Registry

All tasks, pre-flight audits, architectural milestones, and deployments on `genki-lead-web-pitch` are logged sequentially below.

---

## [2026-11-11 20:40:29 -03:00] Task #0: Strictly Read-Only Pre-Flight Discovery Audit

- **Scope:** Local Workspace (`C:\repos\genki`), GitHub MCP Server, and Remote VPS (`root@<ops-vps-host>`)
- **Summary:**
  1. Verified local Windows 11 Home (`10.0.26300`) environment inside `C:\repos\genki`: Node.js `v24.13.0`, npm `11.8.0`, pnpm `10.33.0`, Git `2.56.0.windows.2` (Cloudflare Wrangler not installed globally; no pre-existing `genki-lead-web-pitch` folder).
  2. Audited `github-mcp-server` connection (`get_me` and `search_repositories`), identifying an expired/invalid Personal Access Token (`HTTP 401 Bad credentials`).
  3. Audited remote server `root@<ops-vps-host>` over SSH (`id_ed25519`): verified Git `2.43.0`, Docker `27.0.3` (Coolify containerized runtime; Node/pnpm not installed on host OS), `39G` available disk space on `/` (`74%` used of `150G`), and inspected reference SOP/event registry standards under `<reference-ops-repo>`.

## [2026-11-11 20:53:17 -03:00] Task #1: Repair GitHub MCP Authentication, Create Remote Repo & Initialize Governance SOP/Registry

- **Branch:** `main` (`8dc15f6`)
- **Remote Repository:** `https://github.com/jmiguelrj/genki-lead-web-pitch`
- **Summary:**
  1. Located `github-mcp-server` configuration in `<user-home>\.gemini\config\mcp_config.json` and `<user-home>\.gemini\antigravity-ide\mcp_config.json`, created `.bak` backups (`mcp_config.json.bak`), and updated `GITHUB_PERSONAL_ACCESS_TOKEN`.
  2. Verified `github-mcp-server/get_me` authentication (`"login": "jmiguelrj"`, ID `80391684`) and confirmed via `search_repositories` that `genki-lead-web-pitch` did not previously exist.
  3. Created public GitHub repository `jmiguelrj/genki-lead-web-pitch` via `github-mcp-server/create_repository` with description `"Architectural Blueprint & AI-Guardrail Monorepo for Genki (Astro 5 + React + TypeScript + Vite + SCSS Modules)"`.
  4. Initialized local Git repository in `C:\repos\genki` on branch `main` linked to `origin` (`https://github.com/jmiguelrj/genki-lead-web-pitch.git`), authored `GENKI-SOP.md` (4-part standard format: Prerequisites, Execution Steps, Expected Output, Rollback) and `genki-event-registry.md`, and pushed initial governance commit to `origin/main`.
  5. Created `/opt/genki-lead-web-pitch` on `root@<ops-vps-host>` and synchronized `GENKI-SOP.md` and `genki-event-registry.md` to match the `<reference-ops-repo>` operational registry standard.

## [2026-11-11 21:04:42 -03:00] Task #2: Initialize Monorepo Workspace, Strict TypeScript Base, Biome & Automated AI Guardrails (`CLAUDE.md`)

- **Branch:** `feat/task-2-monorepo-guardrails` -> merged `--no-ff` into `main`
- **Summary:**
  1. Configured monorepo root workspace files: `.gitignore`, `pnpm-workspace.yaml` (`packages/*`, `apps/*`), `package.json` (`pnpm@10.33.0`, Node `>=24.0.0`, `build`, `typecheck`, `lint`, `guardrails`, and `check:all` scripts), and installed `@biomejs/biome`, `typescript`, and `@types/node`.
  2. Configured `biome.json` (2-space indent, single quotes, LF line endings, import sorting, `noExplicitAny: "error"`, `noDangerouslySetInnerHtml: "error"`, and Astro frontmatter overrides) and `tsconfig.base.json` (`strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`, `moduleResolution: "bundler"`, `target: "ES2022"`).
  3. Authored `CLAUDE.md` defining AI-agentic role boundaries and strict stack rules, `.github/CODEOWNERS` protecting `/packages/ui/`, `/scripts/`, `/CLAUDE.md`, `/tsconfig.base.json`, and `/.github/` under `@jmiguelrj`, and placeholder directories `packages/.gitkeep` and `apps/.gitkeep`.
  4. Implemented `scripts/verify-guardrails.mjs` enforcing Rule 1 (zero raw hex/`rgb()`/`hsl()` colors in `*.module.scss`) and Rule 2 (zero `dangerouslySetInnerHTML`, `set:html`, `@ts-ignore`, `@ts-expect-error`, or `: any` in `.ts`, `.tsx`, `.astro`), verified `pnpm guardrails` and `pnpm lint`, merged `--no-ff` to `main`, pushed to `origin/main`, and synced `/opt/genki-lead-web-pitch` on `root@<ops-vps-host>`.
