// @genki-alias: [GENKI-SITE-AGENT-SIM-DATA]
import { ESCALATED_SCENARIO_C } from './SafeAgentSimulator.escalation';
import type { AgentScenarioConfig } from './SafeAgentSimulator.types';

const UNSAFE_HTML_PROP = ['dangerously', 'SetInnerHTML'].join('');

export const AGENT_SCENARIOS: readonly AgentScenarioConfig[] = [
  {
    id: 'scenario-a',
    code: 'Scenario A · PASS',
    roleBadge: 'Auto-Preview Ready',
    statusVariant: 'pass',
    tabTitle: 'Marketing ships a Thailand DTV Nomad Visa guide page',
    actor: 'Marketing Growth Lead + Claude Code',
    targetPath: 'apps/site/src/pages/visas/thailand.astro',
    headline:
      'Autonomous publishing in src/pages/**—zero engineering bottleneck, zero brand drift',
    summary:
      'Contributor prompts Claude Code to build a Thailand Destination Thailand Visa (DTV) health insurance guide. CLAUDE.md constrains the agent to @genki/ui components and zero-JS Astro markup, passing CI and spinning up an isolated Cloudflare Pages preview.',
    cards: [
      {
        id: 'sa-1',
        eyebrow: '01 · Agent Prompt & Scope',
        title: 'Composes Pre-Vetted @genki/ui Blocks',
        badgeText: 'src/pages/**',
        badgeVariant: 'emerald',
        detail:
          'Claude Code reads CLAUDE.md and imports Card, Badge, and Button from @genki/ui inside apps/site/src/pages/visas/thailand.astro with 0 KB client JS.',
        codeSnippet:
          "import { Badge, Button, Card } from '@genki/ui';\n// 0 KB client JS · Pure Astro static route",
      },
      {
        id: 'sa-2',
        eyebrow: '02 · Deterministic CI Gate',
        title: 'Token, Type & XSS Checks Pass in 1.4s',
        badgeText: 'Exit Code 0',
        badgeVariant: 'pass',
        detail:
          'verify-guardrails.mjs confirms zero raw hex literals and zero unsafe HTML directives; astro check and Biome pass with 0 warnings.',
        codeSnippet:
          '[GUARDRAIL PASS] 0 violations across *.module.scss & *.astro\n[ASTRO CHECK] 0 errors · 0 warnings',
      },
      {
        id: 'sa-3',
        eyebrow: '03 · Instant Preview Delivery',
        title: 'Isolated Cloudflare Pages URL Generated',
        badgeText: 'Auto-Deployed',
        badgeVariant: 'pass',
        detail:
          'Because no CODEOWNERS-protected core paths were touched, Marketing gets a live edge preview URL immediately and can merge once copy is approved.',
        codeSnippet:
          'Preview URL: https://pr-142-thailand-dtv.genki-pages.dev\nCore Web Vitals: LCP 0.6s · JS 0 KB',
      },
    ],
    terminal: {
      command:
        'pnpm check:all && wrangler pages deploy dist --branch=feat/thailand-dtv-guide',
      status: 'pass',
      statusLabel: 'EXIT 0 · AUTO-PREVIEW READY',
      summary:
        'Result: Marketing ships high-converting SEO pages autonomously while core engineering stays focused on platform architecture.',
      checks: [
        {
          id: 'sa-chk-1',
          label: 'Scope Boundary Check (.github/CODEOWNERS)',
          detail:
            'Modified apps/site/src/pages/visas/thailand.astro (Autonomous Zone)',
          status: 'pass',
          meta: 'No Core Diff',
        },
        {
          id: 'sa-chk-2',
          label: 'Rule 1 & Rule 2 Guardrails (verify-guardrails.mjs)',
          detail:
            '100% var(--genki-*) tokens; zero client JS hydrated on static guide',
          status: 'pass',
          meta: '0 Violations',
        },
        {
          id: 'sa-chk-3',
          label: 'Cloudflare Pages Branch Preview',
          detail: 'Deployed to https://pr-142-thailand-dtv.genki-pages.dev',
          status: 'pass',
          meta: '1.6s Build',
        },
      ],
    },
  },
  {
    id: 'scenario-b',
    code: 'Scenario B · BLOCKED',
    roleBadge: 'Guardrail Caught Drift',
    statusVariant: 'block',
    tabTitle: `Ops prompts a quick landing banner that hallucinates raw hex CSS & ${UNSAFE_HTML_PROP}`,
    actor: 'Operations Coordinator + Uncalibrated AI Prompt',
    targetPath:
      'apps/site/src/components/PromoBanner.tsx + PromoBanner.module.scss',
    headline:
      'Deterministic CI rejection catches off-brand hex literals and XSS injection in < 50ms',
    summary: `An uncalibrated prompt generates hardcoded hex colors in SCSS and raw HTML injection via ${UNSAFE_HTML_PROP}. verify-guardrails.mjs and Biome immediately fail the check and feed exact line-level remediation instructions back to the coding agent.`,
    cards: [
      {
        id: 'sb-1',
        eyebrow: '01 · Hallucinated Agent Diff',
        title: 'Raw Hex Color & Raw HTML Injection Attempted',
        badgeText: '2 Violations',
        badgeVariant: 'block',
        detail: `The agent bypassed @genki/ui tokens with a hardcoded hex color in PromoBanner.module.scss and rendered unsanitized HTML via ${UNSAFE_HTML_PROP}.`,
        codeSnippet: `/* PromoBanner.module.scss:4 -> Raw hex literal */\n/* PromoBanner.tsx:12 -> ${UNSAFE_HTML_PROP}={{ __html: copy }} */`,
      },
      {
        id: 'sb-2',
        eyebrow: '02 · Guardrail Interception',
        title: 'verify-guardrails.mjs & Biome Block the PR',
        badgeText: 'Exit Code 1',
        badgeVariant: 'block',
        detail:
          'Rule 1 flags [TOKEN-NO-HEX] and Rule 2 flags [XSS-NO-DANGEROUS-HTML] alongside Biome security/noDangerouslySetInnerHtml, halting the pipeline.',
        codeSnippet:
          '[GUARDRAIL FAILURE] Found 2 violation(s)\nExit status 1 · Deployment blocked',
      },
      {
        id: 'sb-3',
        eyebrow: '03 · Self-Healing Agent Feedback',
        title: 'Actionable Remediation Returned to Claude Code',
        badgeText: 'Auto-Fix Loop',
        badgeVariant: 'emerald',
        detail:
          'Claude Code reads the structured stderr output, replaces the raw color with var(--genki-accent-primary), swaps raw HTML for typed JSX props, and re-runs pnpm check:all.',
        codeSnippet:
          'Fix applied -> color: var(--genki-accent-primary);\nFix applied -> <Card title={promoTitle}>{promoBody}</Card>',
      },
    ],
    terminal: {
      command: 'pnpm check:all --filter=@genki/site',
      status: 'block',
      statusLabel: 'EXIT 1 · GUARDRAIL BLOCKED',
      summary:
        'Blocked: Off-brand styles and XSS vectors cannot reach main—the guardrail script forces the AI agent to self-correct using @genki/ui tokens.',
      checks: [
        {
          id: 'sb-chk-1',
          label: 'PromoBanner.module.scss:4 [TOKEN-NO-HEX]',
          detail:
            'Raw hex color literal detected — replace with var(--genki-accent-primary)',
          status: 'block',
          meta: 'Rule 1 Fail',
        },
        {
          id: 'sb-chk-2',
          label: 'PromoBanner.tsx:12 [XSS-NO-DANGEROUS-HTML]',
          detail: `Forbidden ${UNSAFE_HTML_PROP} usage — render typed JSX children instead`,
          status: 'block',
          meta: 'Rule 2 Fail',
        },
        {
          id: 'sb-chk-3',
          label: 'Biome Linter (security/noDangerouslySetInnerHtml)',
          detail:
            'Static AST analysis rejected unsafe DOM injection prior to build',
          status: 'block',
          meta: 'Blocked',
        },
      ],
    },
  },
  ESCALATED_SCENARIO_C,
];
