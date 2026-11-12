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

- **Branch:** `feat/task-2-monorepo-guardrails` (`1eeec23`) -> merged `--no-ff` into `main` (`2d7ec59`)
- **Summary:**
  1. Configured monorepo root workspace files: `.gitignore`, `pnpm-workspace.yaml` (`packages/*`, `apps/*`), `package.json` (`pnpm@10.33.0`, Node `>=24.0.0`, `build`, `typecheck`, `lint`, `guardrails`, and `check:all` scripts), and installed `@biomejs/biome`, `typescript`, and `@types/node`.
  2. Configured `biome.json` (2-space indent, single quotes, LF line endings, import sorting, `noExplicitAny: "error"`, `noDangerouslySetInnerHtml: "error"`, and Astro frontmatter overrides) and `tsconfig.base.json` (`strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`, `moduleResolution: "bundler"`, `target: "ES2022"`).
  3. Authored `CLAUDE.md` defining AI-agentic role boundaries and strict stack rules, `.github/CODEOWNERS` protecting `/packages/ui/`, `/scripts/`, `/CLAUDE.md`, `/tsconfig.base.json`, and `/.github/` under `@jmiguelrj`, and placeholder directories `packages/.gitkeep` and `apps/.gitkeep`.
  4. Implemented `scripts/verify-guardrails.mjs` enforcing Rule 1 (zero raw hex/`rgb()`/`hsl()` colors in `*.module.scss`) and Rule 2 (zero `dangerouslySetInnerHTML`, `set:html`, `@ts-ignore`, `@ts-expect-error`, or `: any` in `.ts`, `.tsx`, `.astro`), verified `pnpm guardrails` and `pnpm lint`, merged `--no-ff` to `main`, pushed to `origin/main`, and synced `/opt/genki-lead-web-pitch` on `root@<ops-vps-host>`.

## [2026-11-11 21:12:35 -03:00] Task #3: Build Shared Design System & Component Library (`packages/ui` — React 19 + TypeScript + SCSS Modules)

- **Branch:** `feat/task-3-shared-ui-library` (`6d7d7c7`) -> merged `--no-ff` into `main` (`e4ee0a0`)
- **Summary:**
  1. Scaffolded `packages/ui` (`@genki-pitch/ui@0.1.0`) with package exports (`.` and `./tokens.scss`), `tsconfig.json` extending `../../tsconfig.base.json`, `src/css-modules.d.ts`, and installed `react` (`^19.3.1`), `react-dom` (`^19.3.1`), `@types/react`, `@types/react-dom`, and `sass-embedded`; removed placeholder `packages/.gitkeep`.
  2. Authored `packages/ui/src/tokens/tokens.scss` establishing the single-source-of-truth `:root` CSS Custom Properties (`--genki-*`) across editorial off-white surfaces, botanical emerald accents, status colors, font stacks, 4px modular spacing scale, radii, shadows, and base resets.
  3. Built 4 reusable, strictly typed React 19 components bound exclusively to `var(--genki-*)` SCSS Modules (`exactOptionalPropertyTypes: true`, `noUncheckedIndexedAccess: true`): `Badge` (`neutral | emerald | pass | warn | block`), `Card` (`eyebrow`, `title`, `badge`, `elevated`), `Button` (`primary | secondary | ghost` with polymorphic button/anchor semantics), and `TerminalGate` (dark-mode CI/guardrail verification readout card), exported from `packages/ui/src/index.ts`.
  4. Passed `pnpm check:all` (`pnpm guardrails` scanning 4 `*.module.scss` and 6 `.ts`/`.tsx` files with `0` violations, `pnpm lint`, `pnpm typecheck`, and `pnpm build`), merged `--no-ff` into `main`, pushed to `origin/main`, and synchronized `/opt/genki-lead-web-pitch` on `root@<ops-vps-host>`.

## [2026-11-11 21:22:54 -03:00] Task #4: Scaffold `apps/pitch-site` (Astro + Vite + React 19 Islands) & Build Interactive Module #1 (`MigrationBlueprint.tsx`)

- **Branch:** `feat/task-4-astro-shell-migration-island` (`d56fb19`) -> merged `--no-ff` into `main` (`3090db5`)
- **Summary:**
  1. Scaffolded `apps/pitch-site` (`@genki-pitch/site@0.1.0`) linked to `@genki-pitch/ui` (`workspace:*`) with `astro` (`^7.4.11`), `@astrojs/react` (`^7.1.8`), `@astrojs/check` (`^0.9.12`), `react` (`^19.3.1`), `sass-embedded`, and `typescript` (`^6.0.3`), configured `astro.config.mjs` (`output: 'static'`, `vite.ssr.noExternal: ['@genki-pitch/ui']`), and removed placeholder `apps/.gitkeep`.
  2. Built the zero-JS editorial shell (`BaseLayout.astro` + `BaseLayout.module.scss` and `index.astro` + `index.module.scss`) featuring global `@genki-pitch/ui/tokens.scss` import, sticky header navigation, Hero section (`"Systems over screens. Guardrails for speed."` + 4 architectural metric callouts), structural slots for Sections 02 & 03, and the 3-column Execution Track Record footer.
  3. Built Interactive React 19 Island #1 (`MigrationBlueprint.tsx`, `MigrationBlueprint.data.ts`, `MigrationBlueprint.module.scss`) hydrated via `client:visible`, enabling live switching across _Legacy Next.js Sprawl_, _Unified Astro + React Router Monorepo_, and _Zero-Downtime Strangler Plan_ using shared `@genki-pitch/ui` `Card`, `Badge`, and `TerminalGate` components.
  4. Verified `pnpm check:all` (`0` guardrail violations across 7 `*.module.scss` and 13 `.ts`/`.tsx`/`.astro` files, `0` Biome lint errors, `0` `astro check` / `tsc` diagnostics, and clean static bundle emission into `apps/pitch-site/dist`), merged `--no-ff` into `main`, pushed to `origin/main`, and synced `/opt/genki-lead-web-pitch` on `root@<ops-vps-host>`.

## [2026-11-11 21:47:30 -03:00] Task #5: Build Interactive React Islands #2 (`SafeAgentSimulator`) & #3 (`ClaimPreflightWidget`) and Wire into `index.astro`

- **Branch:** `feat/task-5-agent-and-claims-islands` (`5ad0933`) -> merged `--no-ff` into `main` (`87fa405`)
- **Summary:**
  1. Built Interactive React 19 Island #2 (`SafeAgentSimulator.tsx`, `SafeAgentSimulator.types.ts`, `SafeAgentSimulator.data.ts`, `SafeAgentSimulator.escalation.ts`, `SafeAgentSimulator.module.scss`) simulating 3 real-world non-engineer AI prompts against `CLAUDE.md`, `.github/CODEOWNERS`, and `scripts/verify-guardrails.mjs` with live `TerminalGate` verification and remediation guidance.
  2. Built Interactive React 19 Island #3 (`ClaimPreflightWidget.tsx`, `ClaimPreflightWidget.types.ts`, `ClaimPreflightWidget.data.ts`, `ClaimPreflightWidget.bali.ts`, `ClaimPreflightWidget.module.scss`) showcasing a 3-sample interactive medical claim pre-flight intake widget (`Genki Traveler` vs. `Genki Native`), interactive receipt checklist toggles, deterministic confidence scoring (`0%–98%`), and real-time adjudication status (`Auto-Adjudication Ready` vs. `Missing Documentation`).
  3. Wired `<SafeAgentSimulator client:visible />` (Section 02: `#agent-guardrails`) and `<ClaimPreflightWidget client:visible />` (Section 03: `#claim-preflight`) into `apps/pitch-site/src/pages/index.astro`, replacing the Task #4 placeholders and removing unused placeholder styles from `index.module.scss`.
  4. Verified all files stay strictly `< 200` lines across the new islands (`< 250` lines repo-wide), passed `pnpm check:all` (`0` guardrail violations across 9 `*.module.scss` and 21 `.ts`/`.tsx`/`.astro` files, `0` Biome lint errors, `0` `astro check`/`tsc` diagnostics, and clean static bundle output in `apps/pitch-site/dist/_astro/`), merged `--no-ff` into `main`, pushed to `origin/main`, and synced `/opt/genki-lead-web-pitch` on `root@<ops-vps-host>`.

## [2026-11-11 21:56:00 -03:00] Task #6: Implement GitHub Actions CI/CD Pipeline, Cloudflare Security Headers, Wrangler v4 Config & Executive `README.md`

- **Branch:** `feat/task-6-cicd-security-readme` -> merged `--no-ff` into `main`
- **Summary:**
  1. Authored `scripts/verify-bundle-budget.mjs` enforcing uncompressed bundle ceilings (`< 25 KB` per React 19 feature island JS chunk and `< 40 KB` for compiled CSS in `apps/pitch-site/dist/_astro/`) and wired `pnpm budget` into root `package.json` (`check:all`).
  2. Installed `wrangler` (`^4.160.1`) in `apps/pitch-site`, added the `deploy` script (`wrangler pages deploy dist --project-name=genki-lead-web-pitch`), created `apps/pitch-site/wrangler.jsonc`, and configured `apps/pitch-site/public/_headers` with strict security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, hydration-safe `Content-Security-Policy`) and immutable `/_astro/*` asset caching.
  3. Created `.github/workflows/ci.yml` with least-privilege `contents: read` permissions on `ubuntu-latest` (Node 24 + `pnpm/action-setup@v4` + `--frozen-lockfile`) executing all 5 verification gates (`guardrails`, `lint`, `typecheck`, `build`, `budget`).
  4. Authored the founder-facing root `README.md` detailing the monorepo rationale, workspace architecture tree, safe non-engineer AI shipping workflow, local quickstart, and author profile, passed `pnpm check:all` locally, merged `--no-ff` to `main`, synced `root@<ops-vps-host>`, and verified GitHub Actions CI run completion (`conclusion: "success"`).
