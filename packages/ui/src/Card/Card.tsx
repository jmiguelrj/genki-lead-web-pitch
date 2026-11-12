// @genki-alias: [GENKI-UI-CARD]
import type { ReactNode } from 'react';
import styles from './Card.module.scss';

export interface CardProps {
  readonly eyebrow?: string;
  readonly title?: string;
  readonly badge?: ReactNode;
  readonly elevated?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Card({
  eyebrow,
  title,
  badge,
  elevated = false,
  className,
  children,
}: CardProps) {
  const composedClassName = [
    styles.card,
    elevated ? styles.elevated : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasMetaRow = Boolean(eyebrow) || badge !== undefined;
  const hasHeader = hasMetaRow || Boolean(title);

  return (
    <article className={composedClassName}>
      {hasHeader ? (
        <header className={styles.header}>
          {hasMetaRow ? (
            <div className={styles.metaRow}>
              {eyebrow ? (
                <span className={styles.eyebrow}>{eyebrow}</span>
              ) : (
                <span />
              )}
              {badge !== undefined ? <div>{badge}</div> : null}
            </div>
          ) : null}
          {title ? <h3 className={styles.title}>{title}</h3> : null}
        </header>
      ) : null}
      <div className={styles.body}>{children}</div>
    </article>
  );
}
