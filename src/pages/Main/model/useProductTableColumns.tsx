import React, {useMemo} from "react";
import type {ColumnDef} from "@tanstack/react-table";
import type {TProduct} from "../lib/types";
import styles from "../../../entity/table/ui/Table.module.scss";

type TTableColumnsHookResult = {
    columns: ColumnDef<TProduct, unknown>[];
};

export function useProductTableColumns(): TTableColumnsHookResult {
    const columns = useMemo<ColumnDef<TProduct>[]>(() => [
        {
            accessorKey: 'title',
            header: 'Наименование',
            cell: ({row}) => {
                const p = row.original;
                return (
                    <div className={styles.nameCell}>
                        <img
                            className={styles.productThumb}
                            src={p.thumbnail ?? '/logo.png'}
                            alt={p.title}
                        />
                        <div className={styles.nameText}>
                            <div className={styles.productTitle}>{p.title}</div>
                            <div className={styles.productCategory}>{p.category ?? ''}</div>
                        </div>
                    </div>
                );
            }
        },
        {accessorKey: 'brand', header: 'Вендор'},
        {
            accessorKey: 'sku',
            header: 'Артикул',
            cell: ({row}) => row.original.sku ?? `#${row.original.id}`
        },
        {
            accessorKey: 'rating',
            header: 'Оценка',
            cell: ({row}) => {
                const rating = row.original.rating ?? 0;
                const formatted = rating.toLocaleString('ru-RU', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                });
                return <span className={rating < 3.5 ? styles.red : ''}>{formatted}/5</span>;
            },
        },
        {
            accessorKey: 'price',
            header: 'Цена, ₽',
            cell: ({getValue}) =>
                `${Number(getValue()).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ₽`,
        },
        {
            accessorKey: 'stock',
            header: 'Количество',
            enableSorting: false,
            cell: ({row}) => row.original.stock ?? 0
        },
        {
            id: 'actions',
            header: '',
            enableSorting: false,
            cell: () => (
                <div className={styles.actionCell}>
                    <button type="button" className={styles.plusButton}>+</button>
                    <button type="button" className={styles.stubButton} aria-label="Заглушка действий">...</button>
                </div>
            )
        }
    ], []);

    return {columns};
}