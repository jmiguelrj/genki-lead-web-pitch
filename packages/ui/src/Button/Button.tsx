// @genki-alias: [GENKI-UI-BUTTON]
import type { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly href?: string;
  readonly external?: boolean;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly disabled?: boolean;
  readonly ariaLabel?: string;
  readonly ariaPressed?: boolean;
  readonly className?: string;
  readonly onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  readonly children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  type = 'button',
  disabled = false,
  ariaLabel,
  ariaPressed,
  className,
  onClick,
  children,
}: ButtonProps) {
  const composedClassName = [
    styles.button,
    styles[size],
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={composedClassName}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(ariaLabel !== undefined ? { 'aria-label': ariaLabel } : {})}
        {...(onClick !== undefined ? { onClick } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={composedClassName}
      {...(ariaLabel !== undefined ? { 'aria-label': ariaLabel } : {})}
      {...(ariaPressed !== undefined ? { 'aria-pressed': ariaPressed } : {})}
      {...(onClick !== undefined ? { onClick } : {})}
    >
      {children}
    </button>
  );
}
