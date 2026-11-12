// @genki-alias: [GENKI-SITE-AGENT-SIM-ISLAND]
import { Badge, Card, TerminalGate } from '@genki-pitch/ui';
import { useState } from 'react';
import { AGENT_SCENARIOS } from './SafeAgentSimulator.data';
import styles from './SafeAgentSimulator.module.scss';
import type {
  AgentScenarioConfig,
  AgentScenarioId,
} from './SafeAgentSimulator.types';

export function SafeAgentSimulator() {
  const [activeId, setActiveId] = useState<AgentScenarioId>('scenario-b');

  const fallback = AGENT_SCENARIOS[0];
  const activeScenario: AgentScenarioConfig | undefined =
    AGENT_SCENARIOS.find((scenario) => scenario.id === activeId) ?? fallback;

  if (!activeScenario) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.scenarioTabs}
        role="tablist"
        aria-label="Cross-department AI coding agent guardrail scenarios"
      >
        {AGENT_SCENARIOS.map((scenario) => {
          const isActive = scenario.id === activeScenario.id;
          const btnClass = [
            styles.scenarioButton,
            isActive ? styles.scenarioButtonActive : undefined,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={scenario.id}
              id={`agent-tab-${scenario.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`agent-panel-${scenario.id}`}
              className={btnClass}
              onClick={() => setActiveId(scenario.id)}
            >
              <div className={styles.tabHeaderRow}>
                <span className={styles.tabCode}>{scenario.code}</span>
                <Badge variant={scenario.statusVariant} dot>
                  {scenario.roleBadge}
                </Badge>
              </div>
              <span className={styles.tabTitle}>{scenario.tabTitle}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`agent-panel-${activeScenario.id}`}
        role="tabpanel"
        aria-labelledby={`agent-tab-${activeScenario.id}`}
        className={styles.panel}
      >
        <div className={styles.metaBanner}>
          <div className={styles.metaTop}>
            <span className={styles.actorLabel}>
              Actor: {activeScenario.actor}
            </span>
            <code className={styles.targetPath}>
              {activeScenario.targetPath}
            </code>
          </div>
          <h3 className={styles.headline}>{activeScenario.headline}</h3>
          <p className={styles.summary}>{activeScenario.summary}</p>
        </div>

        <div className={styles.cardsGrid}>
          {activeScenario.cards.map((card) => (
            <Card
              key={card.id}
              eyebrow={card.eyebrow}
              title={card.title}
              badge={
                <Badge variant={card.badgeVariant} dot>
                  {card.badgeText}
                </Badge>
              }
            >
              <p className={styles.cardDetail}>{card.detail}</p>
              <pre className={styles.codeBlock}>
                <code>{card.codeSnippet}</code>
              </pre>
            </Card>
          ))}
        </div>

        <TerminalGate
          command={activeScenario.terminal.command}
          status={activeScenario.terminal.status}
          statusLabel={activeScenario.terminal.statusLabel}
          checks={activeScenario.terminal.checks}
          summary={activeScenario.terminal.summary}
        />
      </div>
    </div>
  );
}
