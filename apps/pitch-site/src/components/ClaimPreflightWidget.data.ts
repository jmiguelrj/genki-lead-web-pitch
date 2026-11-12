// @genki-alias: [GENKI-SITE-CLAIM-WIDGET-DATA]
import { BALI_CLAIM_SAMPLE } from './ClaimPreflightWidget.bali';
import type { ClaimSampleConfig } from './ClaimPreflightWidget.types';

export const CLAIM_SAMPLES: readonly ClaimSampleConfig[] = [
  {
    id: 'bangkok-pass',
    tabCode: 'Sample 01 · PASS',
    statusBadge: 'Instant Claim OS Routing',
    statusVariant: 'pass',
    tabTitle:
      'Bangkok Hospital Outpatient Invoice (THB\u00A04,850 -> EUR\u00A0129.40)',
    providerLocation: 'Bangkok Hospital · Wattana, Bangkok, Thailand',
    planName: 'Genki Traveler · Outpatient Medical',
    billedTotal: 'THB\u00A04,850.00',
    eurTotal: 'EUR\u00A0129.40',
    mathDeltaLabel: 'Δ\u00A00.00 Verified',
    icdContext:
      'A09 — Infectious gastroenteritis & colitis (Attending MD signed)',
    memberGuidanceTitle:
      'Ready to Submit — All Required Documents & Line Items Verified',
    memberGuidanceCopy:
      'Your invoice includes the attending physician diagnosis (ICD-10 A09), itemized hospital charges, and exact mathematical reconciliation (THB\u00A04,850.00 = EUR\u00A0129.40 at ECB mid-market rate). Estimated fast-track payout: < 48 hours.',
    nextStepAction:
      'Ready for 1-Click Wave Claims Submission (Fast-Track Queue)',
    lineItems: [
      {
        id: 'bkk-1',
        description: 'Outpatient Specialist Consultation (Internal Medicine)',
        localAmount: 'THB\u00A01,800.00',
        eurEquivalent: 'EUR\u00A048.02',
        eligibilityLabel: 'Covered',
        eligibilityVariant: 'pass',
      },
      {
        id: 'bkk-2',
        description: 'Comprehensive GI Diagnostic Lab Panel',
        localAmount: 'THB\u00A02,150.00',
        eurEquivalent: 'EUR\u00A057.36',
        eligibilityLabel: 'Covered',
        eligibilityVariant: 'pass',
      },
      {
        id: 'bkk-3',
        description: 'Hospital Outpatient Pharmacy Prescription',
        localAmount: 'THB\u00A0900.00',
        eurEquivalent: 'EUR\u00A024.02',
        eligibilityLabel: 'Covered',
        eligibilityVariant: 'pass',
      },
    ],
    terminal: {
      command:
        'claim-os preflight --invoice=bangkok-hosp-4850.pdf --verify-math',
      status: 'pass',
      statusLabel: 'EXIT 0 · FAST-TRACK ELIGIBLE',
      summary:
        'All Wave Claims pre-flight gates passed at the moment of filing—routed directly to automated payout approval.',
      checks: [
        {
          id: 'bkk-chk-1',
          label:
            'Deterministic Line-Item Math Verification (IntelliBill Engine)',
          detail:
            '1,800 + 2,150 + 900 = THB\u00A04,850.00 (Δ\u00A00.00 against invoice total)',
          status: 'pass',
          meta: 'Δ\u00A00.00',
        },
        {
          id: 'bkk-chk-2',
          label: 'Clinical Diagnosis & ICD-10 Extraction',
          detail:
            'Mapped ICD-10 A09 with attending physician stamp and treatment date',
          status: 'pass',
          meta: 'ICD-10 A09',
        },
        {
          id: 'bkk-chk-3',
          label: 'FX Normalization & Policy Deductible Check',
          detail:
            'THB\u00A04,850.00 -> EUR\u00A0129.40 (ECB rate 0.02668); member deductible cleared',
          status: 'pass',
          meta: 'EUR\u00A0129.40',
        },
      ],
    },
  },
  {
    id: 'lisbon-missing-doc',
    tabCode: 'Sample 02 · ACTION NEEDED',
    statusBadge: 'Missing Diagnosis Sheet',
    statusVariant: 'warn',
    tabTitle: 'Lisbon Walk-In Clinic Card Slip (EUR\u00A095.00)',
    providerLocation: 'Clínica São Bento · Lisbon, Portugal',
    planName: 'Genki Traveler · Outpatient Medical',
    billedTotal: 'EUR\u00A095.00',
    eurTotal: 'EUR\u00A095.00',
    mathDeltaLabel: '0 Itemized Lines',
    icdContext: 'Missing — POS card terminal slip contains merchant total only',
    memberGuidanceTitle:
      '1 Document Needed Before Submitting: Add Your Clinic Treatment Summary',
    memberGuidanceCopy:
      'You uploaded the Visa card payment slip (EUR\u00A095.00), which proves payment but does not list the medical diagnosis or services performed. Snap a photo of the 1-page "Relatório Médico / Fatura Detalhada" handed to you at reception so your claim can be approved on the first pass.',
    nextStepAction: 'Add 1 Photo: Itemized Clinic Invoice / Medical Report',
    lineItems: [
      {
        id: 'lis-1',
        description: 'Multibanco / Visa POS Terminal Payment Slip #8841',
        localAmount: 'EUR\u00A095.00',
        eurEquivalent: 'EUR\u00A095.00',
        eligibilityLabel: 'Proof of Payment Only',
        eligibilityVariant: 'warn',
      },
    ],
    terminal: {
      command: 'claim-os preflight --invoice=lisbon-pos-slip.jpg --verify-math',
      status: 'warn',
      statusLabel: 'ACTION NEEDED · 1 DOC MISSING',
      summary:
        'Wave Claims UX philosophy in action: tell the member in plain language at the moment of filing instead of 10 days later via email.',
      checks: [
        {
          id: 'lis-chk-1',
          label: 'Proof of Payment Detection',
          detail:
            'Verified EUR\u00A095.00 card charge at Clínica São Bento (Lisbon)',
          status: 'pass',
          meta: 'EUR\u00A095.00',
        },
        {
          id: 'lis-chk-2',
          label: 'Itemized Procedure & Cost Breakdown',
          detail: 'POS terminal slip lacks medical procedure line items',
          status: 'warn',
          meta: 'Missing Invoice',
        },
        {
          id: 'lis-chk-3',
          label: 'Attending Physician Diagnosis / ICD-10',
          detail:
            'Prompting member to attach discharge summary before submission',
          status: 'warn',
          meta: 'Guided Prompt',
        },
      ],
    },
  },
  BALI_CLAIM_SAMPLE,
];
