import type {FormEvent, ReactElement} from 'react';
import styles from './AddRowModal.module.scss';
import { TAddRowModalProps } from './types';

export function AddRowModal({
    show,
    title = 'Добавить запись',
    submitText = 'Добавить',
    cancelText = 'Отмена',
    fields,
    formValues,
    onClose,
    onChange,
    onSubmit
}: TAddRowModalProps): ReactElement | null {
    if (!show) {
        return null;
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        onSubmit(formValues, event);
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{title}</h2>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <label key={field.name}>
                            {field.label}
                            <input
                                type={field.type ?? 'text'}
                                placeholder={field.placeholder}
                                required={field.required}
                                min={field.min}
                                step={field.step}
                                value={formValues[field.name] ?? ''}
                                onChange={(event) => onChange(field.name, event.target.value)}
                            />
                        </label>
                    ))}

                    <div className={styles.modalButtons}>
                        <button type="submit">{submitText}</button>
                        <button type="button" onClick={onClose}>
                            {cancelText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

