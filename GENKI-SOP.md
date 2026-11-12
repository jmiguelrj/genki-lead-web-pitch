<!-- @genki-alias: [GENKI-DOC-SOP] -->
# Standard Operating Procedure (SOP): Genki Lead Web Pitch Monorepo (`genki-lead-web-pitch`)

## 1. Prerequisites
Before executing development, audit, or deployment tasks on `genki-lead-web-pitch`:
- **Local Workspace:** `C:\repos\genki`
- **Remote GitHub Origin:** `https://github.com/jmiguelrj/genki-lead-web-pitch.git` (`main` branch)
- **Remote Operations Host:** `root@<ops-vps-host>:/opt/genki-lead-web-pitch`
- **Tooling Verification:**
  - Local Windows: `node -v` (`>= v20`, currently `v24.13.0`), `pnpm -v` (`10.33.0`), `git --version` (`2.56.0.windows.2`).
  - Remote Hetzner VPS: `ssh -o BatchMode=yes -o ConnectTimeout=10 root@<ops-vps-host> "git --version && docker -v && df -h /"`.
  - GitHub MCP Server (`github-mcp-server`): Verify active token in `<user-home>\.gemini\config\mcp_config.json` and `<user-home>\.gemini\antigravity-ide\mcp_config.json` before invoking repository operations.
- **Clean Working Tree:** Verify `git status` is clean and synchronized with `origin/main` before starting a new task.

---

## 2. Execution Steps

### 2.1 AI-Guardrail Modular Architecture & Line-Count Discipline
1. **Tech Stack Boundaries:**
   - **Framework:** Astro 5 (Islands Architecture) + React + TypeScript (Strict Mode) + Vite + SCSS Modules.
   - **Package Manager:** `pnpm` workspace monorepo.
2. **Enforce `< 250` Lines & Single Responsibility:**
   - Every `.astro`, `.tsx`, `.ts`, `.scss`, and `.md` file must remain strictly under 250 lines (`wc -l`).
   - Isolate interactive UI state into focused React islands; keep static layout shells and content sections in lightweight Astro components.
3. **In-File Header & LF Normalization:**
   - Stamp `@genki-alias: [GENKI-*]` on line 1 of tracked governance and architectural components.
   - Normalize line endings to Unix LF (`\n`) with `git config core.autocrlf false`.

### 2.2 Sequential Task Execution & Event Registry Logging
1. Every task must be logged sequentially in `genki-event-registry.md` with its ISO date (`[YYYY-MM-DD]`), task number, branch/commit reference, and concise architectural summary.
2. Before modifying any configuration file (including IDE MCP configurations), create a `.bak` backup file to guarantee deterministic rollback.

### 2.3 Remote Operations Registry Synchronization (`<ops-vps-host>`)
1. Commit and push verified changes from `C:\repos\genki` to `origin/main`.
2. Synchronize `GENKI-SOP.md` and `genki-event-registry.md` (and repository state) to `/opt/genki-lead-web-pitch` on `root@<ops-vps-host>`:
   ```bash
   ssh -o BatchMode=yes -o ConnectTimeout=10 root@<ops-vps-host> "cd /opt/genki-lead-web-pitch && git pull origin main"
   ```

---

## 3. Expected Output
1. **GitHub MCP Authentication (`get_me`):** Returns authenticated user `"login": "jmiguelrj"` with HTTP 200.
2. **Git Repository & Remote Sync:** `git status` reports a clean working tree on `main` tracking `origin/main` (`https://github.com/jmiguelrj/genki-lead-web-pitch.git`).
3. **Build & Type-Safety Gates (Monorepo):** Zero TypeScript compiler errors (`astro check && tsc --noEmit`), zero SCSS module resolution errors, and zero files `>= 250` lines.
4. **Remote Operations Parity:** `ssh root@<ops-vps-host> "ls -la /opt/genki-lead-web-pitch"` confirms `GENKI-SOP.md` and `genki-event-registry.md` match local `main`.

---

## 4. Rollback
If any step or verification gate fails during execution, execute the following rollback procedures:
- **Local Workspace Rollback (Initial Bootstrap):**
  ```powershell
  Remove-Item -Recurse -Force C:\repos\genki\.git, C:\repos\genki\GENKI-SOP.md, C:\repos\genki\genki-event-registry.md
  ```
- **Local Workspace Rollback (Subsequent Commits):**
  ```powershell
  git -C C:\repos\genki reset --hard <last-good-commit>
  ```
- **Remote VPS Rollback (`<ops-vps-host>`):**
  ```bash
  ssh -o BatchMode=yes root@<ops-vps-host> "rm -rf /opt/genki-lead-web-pitch"
  ```
- **MCP Configuration Rollback:**
  ```powershell
  Copy-Item <user-home>\.gemini\config\mcp_config.json.bak <user-home>\.gemini\config\mcp_config.json -Force
  Copy-Item <user-home>\.gemini\antigravity-ide\mcp_config.json.bak <user-home>\.gemini\antigravity-ide\mcp_config.json -Force
  ```
