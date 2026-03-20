import React from 'react';
import styles from './TableToast.module.scss';

export type TableToastProps = {
  toast: { message: string; visible: boolean };
};

export function TableToast({ toast }: TableToastProps) {
  if (!toast.visible) return null;
  return <div className={styles.toast}>{toast.message}</div>;
}

