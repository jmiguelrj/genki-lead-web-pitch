// @genki-alias: [GENKI-SITE-MIGRATION-STRANGLER]
import type { BlueprintViewConfig } from './MigrationBlueprint.types';

export const STRANGLER_MIGRATION_VIEW: BlueprintViewConfig = {
  id: 'strangler',
  tabLabel: 'Zero-Downtime Strangler Migration Plan',
  tabShortMeta: '3 Phases',
  headline:
    'Incremental Cloudflare Workers/Pages path cutover without freezing velocity',
  summary:
    'Cloudflare edge path routing fronts existing Next.js origins on day one so routes migrate slice-by-slice with sub-5-second rollback and zero feature freeze.',
  metrics: [
    { label: 'Cutover Downtime', value: '0 Seconds' },
    { label: 'Edge Rollback SLA', value: '< 5 Seconds' },
    { label: 'Rollout Structure', value: '3 Pragmatic Phases' },
  ],
  pillars: [
    {
      id: 'phase-1',
      eyebrow: 'Phase 01 · Weeks 1–3',
      title: 'Monorepo, @genki/ui Tokens & Edge Router',
      badgeText: 'Phase 1',
      badgeVariant: 'emerald',
      description:
        'Bootstrap the pnpm monorepo, codify Figma tokens into @genki/ui/tokens.scss, enforce CLAUDE.md + verify-guardrails.mjs in CI, and mount Cloudflare Worker path routing.',
      highlights: [
        'Zero user-facing change while core design tokens and CI gates go live',
        'Shared primitives (Badge, Button, Card, Form fields) built and tested first',
      ],
    },
    {
      id: 'phase-2',
      eyebrow: 'Phase 02 · Weeks 4–8',
      title: 'Incremental Astro Cutover (guide & genki.world)',
      badgeText: 'Phase 2',
      badgeVariant: 'pass',
      description:
        'Migrate guide.genki.world articles and high-traffic genki.world landing routes slice-by-slice to Astro Pages while Cloudflare proxies unmigrated paths to Next.js.',
      highlights: [
        'Immediate Core Web Vitals & organic search lift per migrated route group',
        'Marketing, Design & Ops onboarded onto AI-guarded page creation workflows',
      ],
    },
    {
      id: 'phase-3',
      eyebrow: 'Phase 03 · Weeks 9–14',
      title: 'Member & Claim OS SPA Cutover + Next.js Sunset',
      badgeText: 'Phase 3',
      badgeVariant: 'pass',
      description:
        'Transition authenticated member routes and Wave Claims workflows onto Vite + React Router + GraphQL, verify parity with automated checks, and retire Next.js.',
      highlights: [
        'Legacy Next.js SSR nodes drained to 0% traffic before decommission',
        'Single unified developer and AI-agentic workflow across all web surfaces',
      ],
    },
  ],
  terminal: {
    command: 'wrangler deploy --dry-run --env=strangler-edge-router',
    status: 'pass',
    statusLabel: 'ZERO DOWNTIME · READY',
    summary:
      'Cloudflare Worker routes migrated /guides/* & /products/* to Astro Pages with instant fallback.',
    checks: [
      {
        id: 's-1',
        label: 'Phase 1: Cloudflare Path Router + @genki/ui Baseline',
        detail: 'Edge dispatcher active; CI enforces SCSS tokens and strict TS',
        status: 'pass',
        meta: 'Weeks 1–3',
      },
      {
        id: 's-2',
        label: 'Phase 2: Public & SEO Slices -> Astro Static Edge',
        detail: 'Canonical URLs, redirects, and CWV budgets verified per slice',
        status: 'pass',
        meta: 'Weeks 4–8',
      },
      {
        id: 's-3',
        label: 'Phase 3: Member & Claim OS -> Vite + React Router SPA',
        detail: 'Next.js runtime retired cleanly with zero downtime',
        status: 'pass',
        meta: 'Weeks 9–14',
      },
    ],
  },
};
