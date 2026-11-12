// @genki-alias: [GENKI-SITE-MIGRATION-ISLAND]
import { Badge, Card, TerminalGate } from '@genki-pitch/ui';
import { type KeyboardEvent, useState } from 'react';
import {
  type BlueprintViewConfig,
  type BlueprintViewId,
  MIGRATION_VIEWS,
} from './MigrationBlueprint.data';
import styles from './MigrationBlueprint.module.scss';

export function MigrationBlueprint() {
  const [activeId, setActiveId] = useState<BlueprintViewId>('target');

  const fallbackView = MIGRATION_VIEWS[0];
  const activeView: BlueprintViewConfig | undefined =
    MIGRATION_VIEWS.find((view) => view.id === activeId) ?? fallbackView;

  if (!activeView) {
    return null;
  }

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const count = MIGRATION_VIEWS.length;
    if (count === 0) return;
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % count;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + count) % count;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = count - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const nextView = MIGRATION_VIEWS[nextIndex];
    if (!nextView) return;
    setActiveId(nextView.id);
    document.getElementById(`blueprint-tab-${nextView.id}`)?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <div
          className={styles.tabList}
          role="tablist"
          aria-label="Web architecture comparison and strangler migration views"
        >
          {MIGRATION_VIEWS.map((view, idx) => {
            const isActive = view.id === activeView.id;
            const btnClass = [
              styles.tabButton,
              isActive ? styles.tabButtonActive : undefined,
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={view.id}
                id={`blueprint-tab-${view.id}`}
                type="button"
                role="tab"
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                aria-controls={`blueprint-panel-${view.id}`}
                className={btnClass}
                onClick={() => setActiveId(view.id)}
                onKeyDown={(event) => handleTabKeyDown(event, idx)}
              >
                <span className={styles.tabMeta}>
                  0{idx + 1} · {view.tabShortMeta}
                </span>
                <span className={styles.tabTitle}>{view.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`blueprint-panel-${activeView.id}`}
        role="tabpanel"
        aria-labelledby={`blueprint-tab-${activeView.id}`}
        className={styles.topBar}
      >
        <div className={styles.summaryBanner}>
          <div className={styles.summaryCopy}>
            <h3 className={styles.viewHeadline}>{activeView.headline}</h3>
            <p className={styles.viewSummary}>{activeView.summary}</p>
          </div>
          <div className={styles.metricsStrip}>
            {activeView.metrics.map((metric) => (
              <div key={metric.label} className={styles.metricChip}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pillarGrid}>
          {activeView.pillars.map((pillar) => (
            <Card
              key={pillar.id}
              eyebrow={pillar.eyebrow}
              title={pillar.title}
              badge={
                <Badge variant={pillar.badgeVariant} dot>
                  {pillar.badgeText}
                </Badge>
              }
            >
              <p className={styles.pillarDescription}>{pillar.description}</p>
              <ul className={styles.highlightList}>
                {pillar.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <TerminalGate
          command={activeView.terminal.command}
          status={activeView.terminal.status}
          statusLabel={activeView.terminal.statusLabel}
          checks={activeView.terminal.checks}
          summary={activeView.terminal.summary}
        />
      </div>
    </div>
  );
}
