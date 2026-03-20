import { FormEvent } from "react";

export type TAddRowFormValues = Record<string, string>;

export type TAddRowFieldConfig = {
    name: string;
    label: string;
    type?: 'text' | 'number' | 'email' | 'password';
    required?: boolean;
    placeholder?: string;
    min?: number;
    step?: number;
};

export type TAddRowModalProps = {
    show: boolean;
    title?: string;
    submitText?: string;
    cancelText?: string;
    fields: TAddRowFieldConfig[];
    formValues: TAddRowFormValues;
    onClose: () => void;
    onChange: (fieldName: string, value: string) => void;
    onSubmit: (values: TAddRowFormValues, event: FormEvent<HTMLFormElement>) => void;
};
