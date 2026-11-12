<!-- @genki-alias: [GENKI-DOC-SOP] -->
# Standard Operating Procedure (SOP): Genki Lead Web Pitch Monorepo (`genki-lead-web-pitch`)

## 1. Prerequisites

Before executing development, audit, or deployment tasks on `genki-lead-web-pitch`:

- **Local Workspace:** `C:\repos\genki` (`pnpm` workspace root covering `packages/*` and `apps/*`)
- **Remote GitHub Origin:** `https://github.com/jmiguelrj/genki-lead-web-pitch.git` (`main` branch)
- **Remote Operations Host:** `root@<ops-vps-host>:/opt/genki-lead-web-pitch`
- **Tooling & Workspace Dependencies:**
  - Local Windows: `node -v` (`>= 24.0.0`, currently `v24.13.0`), `pnpm -v` (`>= 10.0.0`, currently `10.33.0`), `git --version` (`2.56.0.windows.2`).
  - Root Dev Toolchain: `@biomejs/biome` (`^2.6.7`), `typescript` (`^6.0.3`), `@types/node` (`^26.6.6`), and `@emnapi/*` / `@tybys/wasm-util` WASI peers.
  - `@genki-pitch/ui` (`packages/ui`): `react` (`^19.3.1`), `react-dom` (`^19.3.1`), `@types/react` (`^19.3.0`), `@types/react-dom` (`^19.3.0`), `sass-embedded` (`^1.108.2`).
  - `@genki-pitch/site` (`apps/pitch-site`): `astro` (`^7.4.11`, `output: 'static'`), `@astrojs/react` (`^7.1.8`), `@astrojs/check` (`^0.9.12`), `@genki-pitch/ui` (`workspace:*`).
  - Remote Hetzner VPS: `ssh -o BatchMode=yes -o ConnectTimeout=10 root@<ops-vps-host> "git --version && docker -v && df -h /"`.
- **Clean Working Tree:** Verify `git status` is clean and synchronized with `origin/main` before branching (`git checkout -b feat/task-<n>-<slug>`).

---

## 2. Execution Steps

### 2.1 AI-Guardrail Modular Architecture & Astro Islands

1. **Tech Stack & Workspace Layout:**
   - **`packages/ui` (`@genki-pitch/ui`):** Exports single-source-of-truth semantic tokens (`@genki-pitch/ui/tokens.scss`) and strictly typed React 19 primitives (`Badge`, `Button`, `Card`, `TerminalGate`).
   - **`apps/pitch-site` (`@genki-pitch/site`):** Static-first Astro application (`output: 'static'` with `vite.ssr.noExternal: ['@genki-pitch/ui']`) rendering zero-JS editorial shells (`BaseLayout.astro`, `index.astro`) and selective `client:visible` React 19 islands (`MigrationBlueprint.tsx`, `SafeAgentSimulator.tsx`, `ClaimPreflightWidget.tsx`).
2. **Governance & Role Boundaries (`CLAUDE.md` & `.github/CODEOWNERS`):**
   - Non-engineers and AI agents compose pages inside `apps/pitch-site/src/pages/` using `@genki-pitch/ui` components.
   - Core infrastructure (`/packages/ui/`, `/scripts/`, `/CLAUDE.md`, `/tsconfig.base.json`, `/.github/`) is protected by `.github/CODEOWNERS` (`@jmiguelrj`).
3. **Token, Type, XSS & Line-Count Enforcement:**
   - **Single Source of Truth Tokens:** Raw color primitives are permitted ONLY in `packages/ui/src/tokens/tokens.scss`. Every `*.module.scss` file across `packages/` and `apps/` must bind exclusively to `var(--genki-*)` with zero hex codes (`#...`) and zero `rgb()`/`hsl()` literals.
   - **Type & XSS Safety:** Zero `: any`, `@ts-ignore`, `@ts-expect-error`, `dangerouslySetInnerHTML`, or `set:html` across `.ts`, `.tsx`, and `.astro`. All props must satisfy `exactOptionalPropertyTypes: true` and `noUncheckedIndexedAccess: true`.
   - **Modularity & Headers:** Keep every tracked file strictly `< 250` lines (`wc -l`), normalized to Unix LF (`\n`), with `@genki-alias: [GENKI-*]` on line 1 of governance and architectural files.

### 2.2 Mandatory Pre-Merge Verification Suite (`pnpm check:all`)

1. Run the full deterministic verification suite from `C:\repos\genki` before committing or merging:

   ```powershell
   pnpm check:all
   ```

   _(`pnpm check:all` executes `pnpm guardrails && pnpm lint && pnpm typecheck && pnpm build`, running `astro check && tsc --noEmit` and `astro build` across `@genki-pitch/site`.)_

2. Log every task sequentially in `genki-event-registry.md` with its ISO timestamp, branch reference, and summary.

### 2.3 Git Merge & Remote Operations Synchronization (`<ops-vps-host>`)

1. Merge the verified feature branch into `main` (`git checkout main && git merge --no-ff <branch>`) and push to `origin/main`.
2. Synchronize `/opt/genki-lead-web-pitch` on `root@<ops-vps-host>`:

   ```bash
   ssh -o BatchMode=yes -o ConnectTimeout=10 root@<ops-vps-host> "cd /opt/genki-lead-web-pitch && git pull origin main"
   ```

---

## 3. Expected Output

1. **AI Guardrail Engine (`pnpm guardrails`):** Scans all `*.module.scss` and `.ts`/`.tsx`/`.astro` files across `packages/` and `apps/`, reporting `0` violations and exiting with code `0`.
2. **Biome Linter & Formatter (`pnpm lint`):** `biome check .` exits with code `0` (`0` errors across TS, TSX, Astro, JSON, SVG, YAML, and Markdown).
3. **Type-Safety & Static Build Gates (`pnpm typecheck && pnpm build`):** `astro check` reports `0 errors, 0 warnings, 0 hints`, `tsc --noEmit` passes with `0` errors, and `astro build` emits clean static HTML and hydrated island bundles into `apps/pitch-site/dist/`.
4. **Git & Remote VPS Parity:** `git status` reports a clean working tree on `main` tracking `origin/main`, and `ssh root@<ops-vps-host> "cd /opt/genki-lead-web-pitch && git log --oneline -n 5"` matches local `git log --oneline -n 5`.

---

## 4. Rollback

If any verification gate fails during execution, execute the applicable rollback procedure:

- **Feature Branch Rollback (Local Workspace):**

  ```powershell
  git checkout main && git branch -D <feature-branch> && git reset --hard origin/main && pnpm install
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
