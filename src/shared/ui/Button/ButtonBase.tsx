import type { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  className?: string;
}
export default function ButtonBase({ leftIcon, rightIcon, text, className, ...props }: ButtonBaseProps) {
  return (
    <button className={classNames(styles.button, className)} {...props}>
      {leftIcon && leftIcon}
      {text && text}
      {rightIcon && rightIcon}
    </button>
  )
}