// @genki-alias: [GENKI-UI-BADGE]
import type { ReactNode } from 'react';
import styles from './Badge.module.scss';

export type BadgeVariant = 'neutral' | 'emerald' | 'pass' | 'warn' | 'block';

export interface BadgeProps {
  readonly variant?: BadgeVariant;
  readonly dot?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Badge({
  variant = 'neutral',
  dot = false,
  className,
  children,
}: BadgeProps) {
  const composedClassName = [styles.badge, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={composedClassName}>
      {dot ? <span className={styles.dot} aria-hidden="true" /> : null}
      <span className={styles.label}>{children}</span>
    </span>
  );
}
