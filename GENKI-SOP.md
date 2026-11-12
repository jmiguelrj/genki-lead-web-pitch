<!-- @genki-alias: [GENKI-DOC-SOP] -->
# Standard Operating Procedure (SOP): Genki Lead Web Pitch Monorepo (`genki-lead-web-pitch`)

## 1. Prerequisites

Before executing development, audit, or deployment tasks on `genki-lead-web-pitch`:

- **Local Workspace:** `C:\repos\genki` (`pnpm` workspace root covering `packages/*` and `apps/*`)
- **Remote GitHub Origin:** `https://github.com/jmiguelrj/genki-lead-web-pitch.git` (`main` branch)
- **Remote Operations Host:** `root@<ops-vps-host>:/opt/genki-lead-web-pitch`
- **Tooling Verification:**
  - Local Windows: `node -v` (`>= 24.0.0`, currently `v24.13.0`), `pnpm -v` (`>= 10.0.0`, currently `10.33.0`), `git --version` (`2.56.0.windows.2`).
  - Root Dev Toolchain: `@biomejs/biome` (`^2.6.7`), `typescript` (`^7.0.2`), `@types/node` (`^26.6.6`).
  - Remote Hetzner VPS: `ssh -o BatchMode=yes -o ConnectTimeout=10 root@<ops-vps-host> "git --version && docker -v && df -h /"`.
  - GitHub MCP Server (`github-mcp-server`): Verify active token in `<user-home>\.gemini\config\mcp_config.json` and `<user-home>\.gemini\antigravity-ide\mcp_config.json` before invoking repository operations.
- **Clean Working Tree:** Verify `git status` is clean and synchronized with `origin/main` before branching (`git checkout -b feat/task-<n>-<slug>`).

---

## 2. Execution Steps

### 2.1 AI-Guardrail Modular Architecture & Ownership Boundaries

1. **Tech Stack & Workspace Layout:**
   - **Workspaces (`pnpm-workspace.yaml`):** `packages/*` (shared `@genki-pitch/ui` primitives & design tokens) and `apps/*` (`apps/pitch-site` Astro 5 application).
   - **Framework:** Astro 5 (Zero-JS default + `client:visible` React Islands) + React + Ultra-Strict TypeScript (`tsconfig.base.json`) + Vite + SCSS Modules (`*.module.scss`).
2. **Governance & Role Boundaries (`CLAUDE.md` & `.github/CODEOWNERS`):**
   - Non-engineers and AI agents compose pages inside `apps/pitch-site/src/pages/` using `@genki-pitch/ui` components.
   - Core infrastructure (`/packages/ui/`, `/scripts/`, `/CLAUDE.md`, `/tsconfig.base.json`, `/.github/`) is protected by `.github/CODEOWNERS` (`@jmiguelrj`).
3. **Token, Type, XSS & Line-Count Enforcement:**
   - **Design Tokens Only:** Zero Tailwind CSS, zero raw hex codes (`#...`), and zero `rgb()`/`hsl()` literals in `*.module.scss`; bind exclusively to `var(--genki-*)`.
   - **Type & XSS Safety:** Zero `: any`, `@ts-ignore`, `@ts-expect-error`, `dangerouslySetInnerHTML`, or `set:html` across `.ts`, `.tsx`, and `.astro`.
   - **Modularity & Headers:** Keep every tracked file strictly `< 250` lines (`wc -l`), normalized to Unix LF (`\n`), with `@genki-alias: [GENKI-*]` on line 1 of governance and architectural files.

### 2.2 Mandatory Pre-Merge Verification Suite

1. Run the deterministic verification suite from `C:\repos\genki` before committing or merging:

   ```powershell
   pnpm guardrails
   pnpm lint
   ```

   _(Once workspace packages/apps are populated in Tasks #3+, execute the full `pnpm check:all` pipeline: `pnpm guardrails && pnpm lint && pnpm typecheck && pnpm build`.)_

2. Log every task sequentially in `genki-event-registry.md` with its ISO timestamp, branch reference, and summary.

### 2.3 Git Merge & Remote Operations Synchronization (`<ops-vps-host>`)

1. Merge the verified feature branch into `main` (`git checkout main && git merge --no-ff <branch>`) and push to `origin/main`.
2. Synchronize `/opt/genki-lead-web-pitch` on `root@<ops-vps-host>`:

   ```bash
   ssh -o BatchMode=yes -o ConnectTimeout=10 root@<ops-vps-host> "cd /opt/genki-lead-web-pitch && git pull origin main"
   ```

---

## 3. Expected Output

1. **AI Guardrail Engine (`pnpm guardrails`):** Prints the verification table reporting `0` violations for Rule 1 (`*.module.scss` token enforcement) and Rule 2 (`.ts`/`.tsx`/`.astro` type & XSS safety), exiting with code `0`.
2. **Biome Linter & Formatter (`pnpm lint`):** `biome check .` exits with code `0` (`0` errors, `2`-space indent, single quotes, organized imports, `noExplicitAny: "error"`).
3. **Type-Safety & Build Gates (`pnpm typecheck && pnpm build`):** Zero TypeScript compiler errors (`strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`), zero SCSS module errors, and zero files `>= 250` lines.
4. **Git & Remote VPS Parity:** `git status` reports a clean working tree on `main` tracking `origin/main`, and `ssh root@<ops-vps-host> "cd /opt/genki-lead-web-pitch && git log --oneline -n 4"` matches local `git log --oneline -n 4`.

---

## 4. Rollback

If any verification gate fails during execution, execute the applicable rollback procedure:

- **Feature Branch Rollback (Local Workspace):**

  ```powershell
  git checkout main && git branch -D <feature-branch> && git reset --hard origin/main
  ```

- **Commit Rollback on `main` (Local + Remote VPS):**

  ```powershell
  git -C C:\repos\genki reset --hard <last-good-commit>
  ssh -o BatchMode=yes root@<ops-vps-host> "cd /opt/genki-lead-web-pitch && git reset --hard <last-good-commit>"
  ```

- **MCP Configuration Rollback:**

  ```powershell
  Copy-Item <user-home>\.gemini\config\mcp_config.json.bak <user-home>\.gemini\config\mcp_config.json -Force
  Copy-Item <user-home>\.gemini\antigravity-ide\mcp_config.json.bak <user-home>\.gemini\antigravity-ide\mcp_config.json -Force
  ```
