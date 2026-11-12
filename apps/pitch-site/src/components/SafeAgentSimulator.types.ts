// @genki-alias: [GENKI-SITE-AGENT-SIM-TYPES]
import type {
  BadgeVariant,
  TerminalGateCheck,
  TerminalGateStatus,
} from '@genki-pitch/ui';

export type AgentScenarioId = 'scenario-a' | 'scenario-b' | 'scenario-c';

export interface AgentScenarioStepCard {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly badgeText: string;
  readonly badgeVariant: BadgeVariant;
  readonly detail: string;
  readonly codeSnippet: string;
}

export interface AgentScenarioConfig {
  readonly id: AgentScenarioId;
  readonly code: string;
  readonly roleBadge: string;
  readonly statusVariant: BadgeVariant;
  readonly tabTitle: string;
  readonly actor: string;
  readonly targetPath: string;
  readonly headline: string;
  readonly summary: string;
  readonly cards: readonly AgentScenarioStepCard[];
  readonly terminal: {
    readonly command: string;
    readonly status: TerminalGateStatus;
    readonly statusLabel: string;
    readonly summary: string;
    readonly checks: readonly TerminalGateCheck[];
  };
}
