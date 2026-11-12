// @genki-alias: [GENKI-SITE-MIGRATION-DATA]
import { STRANGLER_MIGRATION_VIEW } from './MigrationBlueprint.strangler';
import type { BlueprintViewConfig } from './MigrationBlueprint.types';

export type {
  BlueprintPillar,
  BlueprintViewConfig,
  BlueprintViewId,
} from './MigrationBlueprint.types';

export const MIGRATION_VIEWS: readonly BlueprintViewConfig[] = [
  {
    id: 'legacy',
    tabLabel: 'Legacy State: Organic Next.js Sprawl',
    tabShortMeta: 'Pain Points',
    headline:
      'Why organic Next.js sprawl slows down Core Web Vitals and team velocity',
    summary:
      'Coupling static editorial surfaces (genki.world & guide.genki.world) to heavy SSR/hydration runtimes creates payload bloat, cross-repo UI drift, and slow release loops.',
    metrics: [
      { label: 'Content Page JS Payload', value: '~165 KB' },
      { label: 'UI Token Drift Risk', value: 'High (Multi-Repo)' },
      { label: 'SSR Cache Model', value: 'Opaque ISR' },
    ],
    pillars: [
      {
        id: 'legacy-hydration',
        eyebrow: 'genki.world & guide.genki.world',
        title: 'Hydration Payload Bloat on Content Pages',
        badgeText: 'CWV Drag',
        badgeVariant: 'warn',
        description:
          'Shipping a full Next.js runtime onto static country health guides and comparison pages penalizes mobile TTI/INP for global nomads on variable networks.',
        highlights: [
          'Static prose and tables pay React hydration cost on every pageview',
          'Framework upgrades ripple across editorial and app code simultaneously',
        ],
      },
      {
        id: 'legacy-ui-sprawl',
        eyebrow: 'Multi-Repo UI Silos',
        title: 'Duplicated Primitives & Styling Drift',
        badgeText: 'Drift Risk',
        badgeVariant: 'block',
        description:
          'Separate repositories accumulate divergent buttons, cards, and spacing literals—amplified whenever AI assistants generate unbound styles.',
        highlights: [
          'Figma design updates require manual edits across disconnected repos',
          'No deterministic CI gate blocking raw hex colors or unsafe markup',
        ],
      },
      {
        id: 'legacy-caching',
        eyebrow: 'Infrastructure & CI',
        title: 'Opaque SSR Caching & Slow CI Feedback',
        badgeText: 'Bottleneck',
        badgeVariant: 'warn',
        description:
          'Mixing marketing routes with dynamic member logic complicates edge caching, slows preview builds, and queues routine landing-page edits behind engineering.',
        highlights: [
          'Complex ISR cache invalidation instead of immutable static edge assets',
          'Marketing, Design & Ops wait on engineering capacity for page launches',
        ],
      },
    ],
    terminal: {
      command: 'genki-audit inspect --surface=legacy-nextjs-sprawl',
      status: 'warn',
      statusLabel: 'LEGACY · DRIFT RISK',
      summary:
        'Action required: decouple static SEO surfaces from stateful member portals in a guarded monorepo.',
      checks: [
        {
          id: 'l-1',
          label: 'Public JS Payload (genki.world / guide.genki.world)',
          detail:
            'Hydrates full SSR framework runtime on static editorial articles',
          status: 'warn',
          meta: '~165 KB JS',
        },
        {
          id: 'l-2',
          label: 'Cross-Repository UI Token Consistency',
          detail: 'Duplicated primitives across repos invite brand drift',
          status: 'block',
          meta: 'Unguarded',
        },
        {
          id: 'l-3',
          label: 'SSR Cache & CI Feedback Loop',
          detail:
            'Opaque ISR revalidation coupling marketing edits to app releases',
          status: 'warn',
          meta: 'Slow CI',
        },
      ],
    },
  },
  {
    id: 'target',
    tabLabel: 'Target Architecture: Unified Astro + React Router Monorepo',
    tabShortMeta: 'Target State',
    headline:
      'Purpose-built surfaces unified by @genki/ui SCSS tokens and CLAUDE.md guardrails',
    summary:
      'Public/SEO surfaces deploy on Astro + Cloudflare with 0 KB default JS; the authenticated Member & Claim OS Portal runs on Vite + React + React Router + GraphQL.',
    metrics: [
      { label: 'Default Astro Page JS', value: '0 KB' },
      { label: 'Design Token Binding', value: '100% SCSS Vars' },
      { label: 'Member & Claim OS Stack', value: 'Vite + React Router' },
    ],
    pillars: [
      {
        id: 'target-astro',
        eyebrow: 'Public & SEO Surfaces',
        title: 'Astro + Cloudflare Edge (0 KB Default JS)',
        badgeText: '0 KB JS Default',
        badgeVariant: 'pass',
        description:
          'genki.world and guide.genki.world compile to static HTML at the Cloudflare edge, hydrating React 19 islands (client:visible) strictly where stateful calculators are needed.',
        highlights: [
          'Instant LCP/INP worldwide for international travelers and search crawlers',
          'Marketing & Design compose campaign pages safely from @genki/ui blocks',
        ],
      },
      {
        id: 'target-spa',
        eyebrow: 'Authenticated Portal & Claim OS',
        title: 'Vite + React 19 + React Router + GraphQL',
        badgeText: 'Member SPA',
        badgeVariant: 'emerald',
        description:
          'Authenticated member accounts and Wave Claims (Claim OS) run on a crisp Vite + React Router SPA with instant HMR and strictly typed GraphQL operations.',
        highlights: [
          'Zero SSR overhead behind authentication; clean client-side routing',
          'Deterministic multi-step workflows for medical invoice & claim pre-flight',
        ],
      },
      {
        id: 'target-ui',
        eyebrow: 'Shared Workspace Package',
        title: 'Figma-Synced @genki/ui + CLAUDE.md Gates',
        badgeText: 'CODEOWNERS',
        badgeVariant: 'pass',
        description:
          'packages/ui exports semantic --genki-* SCSS Modules and typed React primitives protected by CODEOWNERS, Biome, and verify-guardrails.mjs on every PR.',
        highlights: [
          'Zero Tailwind clutter; 100% scoped *.module.scss bound to var(--genki-*)',
          'Non-engineers ship autonomously with AI agents without risking regressions',
        ],
      },
    ],
    terminal: {
      command: 'pnpm check:all --filter=@genki/monorepo',
      status: 'pass',
      statusLabel: 'EXIT 0 · TARGET VERIFIED',
      summary:
        'Verified: Astro static edge + Vite/React Router portal sharing @genki/ui with 0 violations.',
      checks: [
        {
          id: 't-1',
          label: 'Astro Public & Guide Surface (Cloudflare Pages)',
          detail: '0 KB baseline JS; selective client:visible React 19 islands',
          status: 'pass',
          meta: '0 KB Base JS',
        },
        {
          id: 't-2',
          label: 'Member & Claim OS Portal (Vite + React Router + GraphQL)',
          detail: 'Decoupled SPA build with typed GraphQL schema operations',
          status: 'pass',
          meta: 'SPA Isolated',
        },
        {
          id: 't-3',
          label: 'Figma-Synced @genki/ui + CLAUDE.md Guardrails',
          detail: '100% var(--genki-*) SCSS enforcement + CODEOWNERS active',
          status: 'pass',
          meta: '0 Violations',
        },
      ],
    },
  },
  STRANGLER_MIGRATION_VIEW,
];
