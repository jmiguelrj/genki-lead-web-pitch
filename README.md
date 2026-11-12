<!-- @genki-alias: [GENKI-DOC-README] -->
# Genki Lead Web Pitch — Architectural Blueprint & AI-Guardrail Monorepo

[![Genki Architectural Guardrails & CI](https://github.com/jmiguelrj/genki-lead-web-pitch/actions/workflows/ci.yml/badge.svg)](https://github.com/jmiguelrj/genki-lead-web-pitch/actions/workflows/ci.yml)

**Live Cloudflare Pages Production Demo:** [https://genki-lead-web-pitch.pages.dev](https://genki-lead-web-pitch.pages.dev)

**Systems over screens. Guardrails for speed.**

---

## Why This Repository Exists

Built specifically for **Genki's Lead Web Engineer** role, this monorepo is an executable proof-of-architecture rather than a static slide deck. Every constraint advocated inside the pitch is actively enforced on this codebase itself:

- **Cross-Project Monorepo Consolidation:** Shares a single strictly typed React 19 + SCSS Module component library (`@genki-pitch/ui`) across static marketing surfaces and interactive product workflows via `pnpm` workspaces.
- **Next.js -> Astro + Vite / React Router Strangler Strategy:** Demonstrates zero-JS static-first HTML delivery (`output: 'static'`) paired with selective `client:visible` React 19 islands for stateful UI—eliminating unnecessary hydration payloads on editorial routes while keeping portal/claim flows modular.
- **Zero-Tailwind SCSS Module Token Discipline:** Every component stylesheet (`*.module.scss`) binds exclusively to semantic `:root` CSS Custom Properties (`var(--genki-*)`) defined in a single source of truth (`packages/ui/src/tokens/tokens.scss`).
- **Safe Non-Engineer AI Shipping:** Pairs an explicit AI-agentic contract (`CLAUDE.md`) with `.github/CODEOWNERS` and deterministic CI gates so Growth, Operations, and Product teammates can ship pages with Claude/Cursor without risking brand drift, type erosion, or XSS vulnerabilities.

---

## Workspace Architecture Tree

```text
genki-lead-web-pitch/
├── .github/
│   ├── CODEOWNERS                       # Protects core UI, tokens, scripts & CI under @jmiguelrj
│   └── workflows/
│       └── ci.yml                       # 5-gate GitHub Actions pipeline (Node 24 + pnpm 10)
├── apps/
│   └── pitch-site/                      # @genki-pitch/site — Astro + Vite + React 19 Islands
│       ├── public/
│       │   └── _headers                 # Cloudflare Pages edge security & immutable cache headers
│       ├── src/
│       │   ├── components/              # 3 modular client:visible React 19 architectural islands
│       │   │   ├── MigrationBlueprint.* # 01: Legacy Next.js -> Astro + React Router blueprint
│       │   │   ├── SafeAgentSimulator.* # 02: Interactive CLAUDE.md + CI guardrail simulator
│       │   │   └── ClaimPreflightWidget.* # 03: Genki Traveler/Native claim pre-flight validator
│       │   ├── layouts/
│       │   │   └── BaseLayout.astro     # Zero-JS editorial shell & global token stylesheet
│       │   └── pages/
│       │       └── index.astro          # Autonomous composition surface for pages & islands
│       ├── astro.config.mjs             # Static output + workspace SSR bundling config
│       └── wrangler.jsonc               # Cloudflare Pages Wrangler v4 deployment config
├── packages/
│   └── ui/                              # @genki-pitch/ui — Shared React 19 + SCSS Module primitives
│       └── src/
│           ├── tokens/tokens.scss       # Single source of truth for --genki-* CSS Custom Properties
│           ├── Badge/                   # Status & taxonomy badge primitive
│           ├── Button/                  # Polymorphic button / anchor primitive
│           ├── Card/                    # Structural editorial surface primitive
│           └── TerminalGate/            # CI & guardrail verification readout primitive
├── scripts/
│   ├── verify-guardrails.mjs            # Blocks raw hex/rgb/hsl in SCSS & XSS/any/@ts-ignore in code
│   └── verify-bundle-budget.mjs         # Enforces < 25 KB per feature island & < 40 KB CSS ceiling
├── CLAUDE.md                            # AI-agentic contributor boundaries & stack rules
├── GENKI-SOP.md                         # 4-part Standard Operating Procedure & rollback runbook
├── biome.json                           # Biome formatter, import sorter & static security linter
└── tsconfig.base.json                   # Ultra-strict TypeScript baseline (exactOptionalPropertyTypes)
```

---

## How Safe Non-Engineer Shipping Works

1. **Explicit Agent Boundaries ([`CLAUDE.md`](./CLAUDE.md)):** Defines the autonomous contribution zone (`apps/pitch-site/src/pages/**`) where Marketing, Ops, and Design compose pages from `@genki-pitch/ui` primitives without inventing ad-hoc styles or bypassing strict types.
2. **Cryptographic Ownership Gates ([`.github/CODEOWNERS`](./.github/CODEOWNERS)):** Any Pull Request touching `/packages/ui/`, `/scripts/`, `/CLAUDE.md`, `/tsconfig.base.json`, or `/.github/` automatically requires Lead Web Engineer (`@jmiguelrj`) approval before merge.
3. **Deterministic Token & XSS Guardrails ([`scripts/verify-guardrails.mjs`](./scripts/verify-guardrails.mjs)):** Fails locally and in CI on any raw `#hex`/`rgb()`/`hsl()` literal inside `*.module.scss` or any `dangerouslySetInnerHTML`, `set:html`, `: any`, `@ts-ignore`, or `@ts-expect-error` across `.ts`, `.tsx`, and `.astro` files.
4. **Automated Island Bundle Ceilings ([`scripts/verify-bundle-budget.mjs`](./scripts/verify-bundle-budget.mjs)):** Inspects `apps/pitch-site/dist/_astro/` on every build to guarantee individual React feature islands stay strictly `< 25 KB` and compiled CSS stays `< 40 KB`.

---

## Local Quickstart

**Prerequisites:** Node.js `>= 24.0.0` and `pnpm` `>= 10.0.0` (`pnpm@10.33.0`).

```bash
# 1. Install workspace dependencies
pnpm install

# 2. Start the Astro + Vite local development server
pnpm --filter @genki-pitch/site dev

# 3. Run all 5 architectural gates (guardrails + lint + typecheck + build + budget)
pnpm check:all
```

To deploy the static output (`apps/pitch-site/dist`) to Cloudflare Pages via Wrangler v4:

```bash
pnpm --filter @genki-pitch/site run deploy
```

---

## Author

**João Miguel** — Senior Full-Stack & Frontend Systems Engineer

- **Location:** Rio de Janeiro, Brazil (`UTC-3`) — dedicated daily synchronous overlap with EU / CET engineering & leadership hours.
- **Repository Governance:** [`GENKI-SOP.md`](./GENKI-SOP.md) · [`genki-event-registry.md`](./genki-event-registry.md)
