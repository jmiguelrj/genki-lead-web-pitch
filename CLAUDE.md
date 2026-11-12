<!-- @genki-alias: [GENKI-DOC-CLAUDE] -->
# CLAUDE.md — Genki AI-Agentic Development Ruleset (`genki-lead-web-pitch`)

This repository is an AI-guarded monorepo built to empower cross-functional teams (Marketing, Operations, Design) to ship high-converting web experiences safely using AI coding agents without risking brand drift, runtime regressions, or XSS vulnerabilities.

---

## 1. Role & Ownership Boundaries (`CODEOWNERS`)

### Autonomous Contribution Zone (Marketing, Ops, Design + AI Agents)

- **Allowed Paths:** `apps/pitch-site/src/pages/**` and page-level content modules.
- **Permitted Actions:** Assemble new landing pages, pitch decks, and localized campaign routes by composing pre-vetted primitives from `@genki-pitch/ui`.
- **Constraint:** Never create ad-hoc unstyled HTML widgets or override design system tokens locally when a `@genki-pitch/ui` primitive applies.

### Protected Core Infrastructure (`@jmiguelrj` Lead Web Engineer Review Required)

The following paths are protected by `.github/CODEOWNERS` and must not be modified without explicit Lead Web Engineer approval:

- `/packages/ui/` — Shared React/Astro component primitives & `--genki-*` design token definitions.
- `/scripts/` — Automated guardrail & CI verification engines (`verify-guardrails.mjs`, `verify-bundle-budget.mjs`).
- `/CLAUDE.md` — AI-agentic governance contract.
- `/tsconfig.base.json` — Monorepo-wide ultra-strict TypeScript compiler baseline.
- `/.github/` — `CODEOWNERS` and GitHub Actions CI/CD workflows.

---

## 2. Strict Stack & Architectural Rules

1. **Ultra-Strict TypeScript Only (`tsconfig.base.json`):**
   - Every workspace package and app must extend `/tsconfig.base.json` (`strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`, `exactOptionalPropertyTypes: true`).
   - Explicit `: any`, `@ts-ignore`, and `@ts-expect-error` are **strictly forbidden** and blocked by both Biome and `scripts/verify-guardrails.mjs`.

2. **SCSS Modules Bound Exclusively to Design Tokens (`*.module.scss`):**
   - **Zero Tailwind CSS.** All component styling uses scoped SCSS Modules (`*.module.scss`).
   - **Zero Raw Color Literals:** Component `*.module.scss` files must never contain raw hex codes (`#fff`, `#0f172a`, etc.), `rgb(...)`, or `hsl(...)` functions. Every color, spacing, radius, and shadow value must reference semantic `var(--genki-*)` CSS custom properties defined in `@genki-pitch/ui`.

3. **Astro Zero-JS Default & Islands Architecture:**
   - Astro pages and layout sections ship **zero client-side JavaScript** by default.
   - Hydrate stateful React islands (`*.tsx`) exclusively with `client:visible` (never `client:only` or blanket `client:load` unless explicitly documented for above-the-fold interaction).

4. **XSS & Raw HTML Injection Zero-Tolerance:**
   - `dangerouslySetInnerHTML` (React) and `set:html` (Astro) are **strictly banned** across all `.tsx`, `.ts`, and `.astro` files.

5. **File Modularity & Formatting Discipline:**
   - Keep every source and documentation file strictly `< 250` lines (`wc -l`) with Unix LF (`\n`) line endings.
   - Stamp `@genki-alias: [GENKI-*]` on line 1 of tracked governance and architectural files.
   - Code formatting is enforced by Biome (2-space indent, single quotes, organized imports).

---

## 3. Mandatory Pre-PR Verification Command

Before committing, opening a Pull Request, or merging to `main`, every developer and AI agent **MUST** execute and pass the full verification suite from the monorepo root:

```bash
pnpm check:all
```

`pnpm check:all` sequentially executes:

1. `pnpm guardrails` (`node scripts/verify-guardrails.mjs`) — Verifies zero raw colors in `*.module.scss` and zero unsafe TypeScript/XSS patterns across `packages/` and `apps/`.
2. `pnpm lint` (`biome check .`) — Verifies formatting, import sorting, `noExplicitAny`, and static lint rules.
3. `pnpm typecheck` (`pnpm -r typecheck`) — Runs strict TypeScript & Astro type checking across all workspaces.
4. `pnpm build` (`pnpm -r build`) — Confirms clean production builds across all packages and apps.
5. `pnpm budget` (`node scripts/verify-bundle-budget.mjs`) — Enforces `< 25 KB` per React 19 feature island chunk and `< 40 KB` compiled CSS ceiling in `apps/pitch-site/dist/_astro/`.
