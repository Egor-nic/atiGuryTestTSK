import React from 'react';
import styles from './CheckBox.module.scss';
import classNames from 'classnames';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked?: boolean;
  // onChange: (checked: boolean) => void;
  className?: string; // Пропс для внешних стилей родителя
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className
}) => {
  return (
    <label className={classNames(styles.checkboxContainer, className)}>
      <input
        type="checkbox"
        className={styles.hiddenInput}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.checkmark} />
      {label && <span style={{ marginLeft: '8px' }}>{label}</span>}
    </label>
  );
};