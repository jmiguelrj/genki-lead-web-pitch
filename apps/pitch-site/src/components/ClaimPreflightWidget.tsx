// @genki-alias: [GENKI-SITE-CLAIM-WIDGET-ISLAND]
import { Badge, Card, TerminalGate } from '@genki-pitch/ui';
import { useState } from 'react';
import { CLAIM_SAMPLES } from './ClaimPreflightWidget.data';
import styles from './ClaimPreflightWidget.module.scss';
import type {
  ClaimSampleConfig,
  ClaimSampleId,
} from './ClaimPreflightWidget.types';

export function ClaimPreflightWidget() {
  const [activeId, setActiveId] = useState<ClaimSampleId>('bangkok-pass');

  const fallback = CLAIM_SAMPLES[0];
  const activeSample: ClaimSampleConfig | undefined =
    CLAIM_SAMPLES.find((sample) => sample.id === activeId) ?? fallback;

  if (!activeSample) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.sampleTabs}
        role="tablist"
        aria-label="Wave Claims deterministic invoice pre-flight samples"
      >
        {CLAIM_SAMPLES.map((sample) => {
          const isActive = sample.id === activeSample.id;
          const btnClass = [
            styles.sampleButton,
            isActive ? styles.sampleButtonActive : undefined,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={sample.id}
              id={`claim-tab-${sample.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`claim-panel-${sample.id}`}
              className={btnClass}
              onClick={() => setActiveId(sample.id)}
            >
              <div className={styles.tabHeaderRow}>
                <span className={styles.tabCode}>{sample.tabCode}</span>
                <Badge variant={sample.statusVariant} dot>
                  {sample.statusBadge}
                </Badge>
              </div>
              <span className={styles.tabTitle}>{sample.tabTitle}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`claim-panel-${activeSample.id}`}
        role="tabpanel"
        aria-labelledby={`claim-tab-${activeSample.id}`}
        className={styles.panel}
      >
        <div className={styles.splitGrid}>
          <Card
            eyebrow={activeSample.providerLocation}
            title="Normalized Line-Item & FX Reconciliation"
            badge={
              <Badge variant={activeSample.statusVariant} dot>
                {activeSample.mathDeltaLabel}
              </Badge>
            }
          >
            <div className={styles.metaList}>
              <div className={styles.metaPair}>
                <span className={styles.metaKey}>Policy Plan</span>
                <span className={styles.metaVal}>{activeSample.planName}</span>
              </div>
              <div className={styles.metaPair}>
                <span className={styles.metaKey}>Billed Total / EUR</span>
                <span className={styles.metaVal}>
                  {activeSample.billedTotal} ({activeSample.eurTotal})
                </span>
              </div>
              <div className={styles.metaPair}>
                <span className={styles.metaKey}>ICD-10 Context</span>
                <span className={styles.metaVal}>
                  {activeSample.icdContext}
                </span>
              </div>
            </div>

            <div className={styles.lineTable}>
              {activeSample.lineItems.map((item) => (
                <div key={item.id} className={styles.lineRow}>
                  <span className={styles.lineDesc}>{item.description}</span>
                  <div className={styles.lineAmounts}>
                    <span>{item.localAmount}</span>
                    <span className={styles.eurTag}>{item.eurEquivalent}</span>
                    <Badge variant={item.eligibilityVariant}>
                      {item.eligibilityLabel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card
            eyebrow="Wave Claims · Moment-of-Filing UX"
            title={activeSample.memberGuidanceTitle}
            elevated
            badge={
              <Badge variant={activeSample.statusVariant} dot>
                {activeSample.statusBadge}
              </Badge>
            }
          >
            <p className={styles.guidanceCopy}>
              {activeSample.memberGuidanceCopy}
            </p>
            <div className={styles.actionCallout}>
              Next Step: {activeSample.nextStepAction}
            </div>
          </Card>
        </div>

        <TerminalGate
          command={activeSample.terminal.command}
          status={activeSample.terminal.status}
          statusLabel={activeSample.terminal.statusLabel}
          checks={activeSample.terminal.checks}
          summary={activeSample.terminal.summary}
        />
      </div>
    </div>
  );
}
