// @genki-alias: [GENKI-UI-TERMINAL-GATE]
import type { ReactNode } from 'react';
import { Badge } from '../Badge/Badge';
import styles from './TerminalGate.module.scss';

export type TerminalGateStatus = 'pass' | 'warn' | 'block';

export interface TerminalGateCheck {
  readonly id: string;
  readonly label: string;
  readonly detail?: string;
  readonly status: TerminalGateStatus;
  readonly meta?: string;
}

export interface TerminalGateProps {
  readonly command: string;
  readonly status: TerminalGateStatus;
  readonly statusLabel?: string;
  readonly checks: readonly TerminalGateCheck[];
  readonly summary?: string;
  readonly className?: string;
  readonly children?: ReactNode;
}

const DEFAULT_STATUS_LABEL: Record<TerminalGateStatus, string> = {
  pass: 'EXIT 0 · PASS',
  warn: 'WARN · REVIEW',
  block: 'EXIT 1 · BLOCKED',
};

const ROW_STATUS_TOKEN: Record<TerminalGateStatus, string> = {
  pass: '[PASS]',
  warn: '[WARN]',
  block: '[FAIL]',
};

export function TerminalGate({
  command,
  status,
  statusLabel,
  checks,
  summary,
  className,
  children,
}: TerminalGateProps) {
  const composedClassName = [styles.terminal, className]
    .filter(Boolean)
    .join(' ');

  const getRowStatusClass = (rowStatus: TerminalGateStatus): string => {
    if (rowStatus === 'pass') return styles.statusPass ?? '';
    if (rowStatus === 'warn') return styles.statusWarn ?? '';
    return styles.statusBlock ?? '';
  };

  return (
    <section
      className={composedClassName}
      aria-label={`Verification gate: ${command}`}
    >
      <header className={styles.chrome}>
        <div className={styles.titleGroup}>
          <span className={styles.lights} aria-hidden="true">
            <span
              className={`${styles.light ?? ''} ${styles.lightRed ?? ''}`}
            />
            <span
              className={`${styles.light ?? ''} ${styles.lightAmber ?? ''}`}
            />
            <span
              className={`${styles.light ?? ''} ${styles.lightGreen ?? ''}`}
            />
          </span>
          <code className={styles.command}>
            <span className={styles.prompt}>$</span>
            {command}
          </code>
        </div>
        <Badge variant={status} dot>
          {statusLabel ?? DEFAULT_STATUS_LABEL[status]}
        </Badge>
      </header>

      <ul className={styles.rows}>
        {checks.map((check) => (
          <li key={check.id} className={styles.row}>
            <div className={styles.rowMain}>
              <div className={styles.rowHeader}>
                <span
                  className={`${styles.rowStatus ?? ''} ${getRowStatusClass(check.status)}`}
                >
                  {ROW_STATUS_TOKEN[check.status]}
                </span>
                <span className={styles.rowLabel}>{check.label}</span>
              </div>
              {check.detail ? (
                <p className={styles.rowDetail}>{check.detail}</p>
              ) : null}
            </div>
            {check.meta ? (
              <span className={styles.rowMeta}>{check.meta}</span>
            ) : null}
          </li>
        ))}
      </ul>

      {children !== undefined ? (
        <div className={styles.slot}>{children}</div>
      ) : null}

      {summary ? <footer className={styles.footer}>{summary}</footer> : null}
    </section>
  );
}
