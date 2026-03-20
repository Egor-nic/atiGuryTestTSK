import type { InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  wrapperClassName?: string;
}
export default function InputBase({
  labelText,
  rightIcon,
  leftIcon,
  wrapperClassName,
  id,
  onChange,
  className,
  ...props

}: InputBaseProps) {
  return (
    <div className={classNames(styles.wrapper, wrapperClassName)}>

      {labelText && <label className={styles.label} htmlFor={id}>{labelText}</label>}
      <div className={styles.inputWrapper}>
        {leftIcon && <div className={styles.leftIconWrapper}>{leftIcon}</div>}

        <input
          onChange={onChange}
          className={classNames(styles.input, className)}
          id={id}
          {...props}
        />
        {rightIcon && <div className={styles.rightIconWrapper}>{rightIcon}</div>}
      </div>
    </div>
  )
}