// @genki-alias: [GENKI-SITE-CLAIM-WIDGET-BALI]
import type { ClaimSampleConfig } from './ClaimPreflightWidget.types';

export const BALI_CLAIM_SAMPLE: ClaimSampleConfig = {
  id: 'bali-math-flag',
  tabCode: 'Sample 03 · MATH / COVERAGE CHECK',
  statusBadge: 'Line-Item Mismatch',
  statusVariant: 'block',
  tabTitle: 'Bali Dental & Urgent Care Receipt (IDR 2,450,000)',
  providerLocation: 'Canggu Medical & Dental Clinic · Bali, Indonesia',
  planName: 'Genki Native · Comprehensive Global Health',
  billedTotal: 'IDR 2,450,000',
  eurTotal: 'EUR 143.68',
  mathDeltaLabel: 'Δ IDR 150,000 Unaccounted',
  icdContext:
    'S01.8 / K08.8 — Acute laceration dressing + emergency dental pain relief',
  memberGuidanceTitle:
    'IntelliBill Math Engine Flagged a Δ IDR 150,000 Discrepancy + 1 Non-Covered Item',
  memberGuidanceCopy:
    'The three scanned line items sum to IDR 2,300,000, leaving IDR 150,000 unaccounted for compared to the IDR 2,450,000 receipt total (likely clinic admin fee on page 2). Additionally, the cosmetic whitening kit is separated automatically so your eligible IDR 1,950,000 medical and emergency dental items process without delay.',
  nextStepAction:
    'Confirm Eligible IDR 1,950,000 (EUR 114.36) or Upload Page 2 for Remaining IDR 150,000',
  lineItems: [
    {
      id: 'bali-1',
      description: 'Urgent Wound Dressing & Tetanus Booster',
      localAmount: 'IDR 850,000',
      eurEquivalent: 'EUR 49.85',
      eligibilityLabel: 'Covered 100%',
      eligibilityVariant: 'pass',
    },
    {
      id: 'bali-2',
      description: 'Emergency Dental Crown Re-Cementing (Pain Relief)',
      localAmount: 'IDR 1,100,000',
      eurEquivalent: 'EUR 64.51',
      eligibilityLabel: 'Covered · Dental Cap',
      eligibilityVariant: 'emerald',
    },
    {
      id: 'bali-3',
      description: 'Take-Home Cosmetic Teeth Whitening Gel Kit',
      localAmount: 'IDR 350,000',
      eurEquivalent: 'EUR 20.52',
      eligibilityLabel: 'Excluded · Cosmetic',
      eligibilityVariant: 'warn',
    },
  ],
  terminal: {
    command: 'claim-os preflight --invoice=bali-canggu-091.pdf --verify-math',
    status: 'block',
    statusLabel: 'PRE-FLIGHT HOLD · MATH DELTA',
    summary:
      'Deterministic math check prevented an incomplete/mismatched invoice from entering the human adjudication queue.',
    checks: [
      {
        id: 'bl-chk-1',
        label: 'Deterministic Line-Item Math Verification (IntelliBill Engine)',
        detail:
          'Sum(items) = IDR 2,300,000 vs Billed Total = IDR 2,450,000 (Δ IDR 150,000 missing)',
        status: 'block',
        meta: 'Δ IDR 150k',
      },
      {
        id: 'bl-chk-2',
        label: 'Genki Native Benefit & Dental Sub-Limit Check',
        detail:
          'Separated IDR 350,000 cosmetic item; verified IDR 1,950,000 acute care eligibility',
        status: 'warn',
        meta: '1 Item Split',
      },
      {
        id: 'bl-chk-3',
        label: 'Instant Member Self-Resolution Prompt',
        detail:
          'Member offered 1-click confirmation or page-2 upload before reviewer handoff',
        status: 'pass',
        meta: 'Zero Ping-Pong',
      },
    ],
  },
};
