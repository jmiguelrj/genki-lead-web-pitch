// @genki-alias: [GENKI-SITE-MIGRATION-TYPES]
import type {
  BadgeVariant,
  TerminalGateCheck,
  TerminalGateStatus,
} from '@genki-pitch/ui';

export type BlueprintViewId = 'legacy' | 'target' | 'strangler';

export interface BlueprintPillar {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly badgeText: string;
  readonly badgeVariant: BadgeVariant;
  readonly description: string;
  readonly highlights: readonly string[];
}

export interface BlueprintViewConfig {
  readonly id: BlueprintViewId;
  readonly tabLabel: string;
  readonly tabShortMeta: string;
  readonly headline: string;
  readonly summary: string;
  readonly metrics: readonly {
    readonly label: string;
    readonly value: string;
  }[];
  readonly pillars: readonly BlueprintPillar[];
  readonly terminal: {
    readonly command: string;
    readonly status: TerminalGateStatus;
    readonly statusLabel: string;
    readonly summary: string;
    readonly checks: readonly TerminalGateCheck[];
  };
}
