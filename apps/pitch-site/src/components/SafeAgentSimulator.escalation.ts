// @genki-alias: [GENKI-SITE-AGENT-SIM-ESCALATION]
import type { AgentScenarioConfig } from './SafeAgentSimulator.types';

export const ESCALATED_SCENARIO_C: AgentScenarioConfig = {
  id: 'scenario-c',
  code: 'Scenario C · ESCALATED',
  roleBadge: 'CODEOWNERS Review',
  statusVariant: 'warn',
  tabTitle:
    'Designer updates global spacing & emerald contrast tokens in @genki/ui',
  actor: 'Senior Product Designer + Claude Code',
  targetPath: 'packages/ui/src/tokens/tokens.scss',
  headline:
    'Shared design-system mutations pass CI and automatically route to Lead Web Engineer review',
  summary:
    'When a Designer updates root --genki-* tokens in packages/ui, all automated lint and type checks pass, and .github/CODEOWNERS automatically requires Lead Web Engineer sign-off with a multi-app visual diff preview.',
  cards: [
    {
      id: 'sc-1',
      eyebrow: '01 · Design Token Evolution',
      title: 'Semantic Token Update in packages/ui',
      badgeText: 'tokens.scss',
      badgeVariant: 'emerald',
      detail:
        'Designer refines --genki-accent-primary contrast and --genki-space-6 scale inside packages/ui/src/tokens/tokens.scss to match updated Figma variables.',
      codeSnippet:
        '/* packages/ui/src/tokens/tokens.scss */\n--genki-accent-primary: var(--figma-emerald-600);',
    },
    {
      id: 'sc-2',
      eyebrow: '02 · CODEOWNERS Governance',
      title: 'Protected Path Triggers @jmiguelrj Review',
      badgeText: 'Protected Path',
      badgeVariant: 'warn',
      detail:
        'Because /packages/ui/ affects both genki.world and the Member & Claim OS Portal, GitHub enforces Lead Web Engineer approval before merge.',
      codeSnippet:
        '# .github/CODEOWNERS match:\n/packages/ui/   @jmiguelrj (Review Required)',
    },
    {
      id: 'sc-3',
      eyebrow: '03 · Cross-Surface Verification',
      title: 'Both Astro Site & Member SPA Built in CI',
      badgeText: '2 Apps Verified',
      badgeVariant: 'pass',
      detail:
        'pnpm -r build compiles both public Astro routes and authenticated React Router views so the Lead Web Engineer can inspect cross-app impact in one click.',
      codeSnippet:
        'packages/ui: PASS · apps/pitch-site: PASS\nVisual regression preview attached to PR #143',
    },
  ],
  terminal: {
    command: 'pnpm check:all && gh pr status --check-codeowners',
    status: 'warn',
    statusLabel: 'ESCALATED · CODEOWNERS REVIEW',
    summary:
      'All automated gates passed (Exit 0). PR merge is gated on @jmiguelrj approval because /packages/ui/ is protected by CODEOWNERS.',
    checks: [
      {
        id: 'sc-chk-1',
        label: 'Guardrails, Biome Lint & Workspace Typecheck',
        detail:
          'All *.module.scss consumers and TypeScript contracts compile cleanly',
        status: 'pass',
        meta: 'Exit 0',
      },
      {
        id: 'sc-chk-2',
        label: 'Cross-Workspace Build (Astro + Member Portal)',
        detail: 'Zero broken imports or layout shifts across downstream apps',
        status: 'pass',
        meta: '2 Apps Built',
      },
      {
        id: 'sc-chk-3',
        label: '.github/CODEOWNERS Protection Gate (/packages/ui/)',
        detail:
          'Shared infrastructure change escalated to @jmiguelrj (Lead Web Engineer)',
        status: 'warn',
        meta: 'Review Required',
      },
    ],
  },
};
