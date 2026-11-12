// @genki-alias: [GENKI-SITE-CLAIM-WIDGET-TYPES]
import type {
  BadgeVariant,
  TerminalGateCheck,
  TerminalGateStatus,
} from '@genki-pitch/ui';

export type ClaimSampleId =
  | 'bangkok-pass'
  | 'lisbon-missing-doc'
  | 'bali-math-flag';

export interface ClaimLineItem {
  readonly id: string;
  readonly description: string;
  readonly localAmount: string;
  readonly eurEquivalent: string;
  readonly eligibilityLabel: string;
  readonly eligibilityVariant: BadgeVariant;
}

export interface ClaimSampleConfig {
  readonly id: ClaimSampleId;
  readonly tabCode: string;
  readonly statusBadge: string;
  readonly statusVariant: BadgeVariant;
  readonly tabTitle: string;
  readonly providerLocation: string;
  readonly planName: string;
  readonly billedTotal: string;
  readonly eurTotal: string;
  readonly mathDeltaLabel: string;
  readonly icdContext: string;
  readonly memberGuidanceTitle: string;
  readonly memberGuidanceCopy: string;
  readonly nextStepAction: string;
  readonly lineItems: readonly ClaimLineItem[];
  readonly terminal: {
    readonly command: string;
    readonly status: TerminalGateStatus;
    readonly statusLabel: string;
    readonly summary: string;
    readonly checks: readonly TerminalGateCheck[];
  };
}
