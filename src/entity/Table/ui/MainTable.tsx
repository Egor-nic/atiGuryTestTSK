import {type ReactElement, useState} from 'react';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type PaginationState,
} from '@tanstack/react-table';
import ButtonBase from '../../../shared/ui/Button/ButtonBase';
import InputBase from '../../../shared/ui/Input/InputBase';
import {Pagination} from '../../../shared/ui/Pagination/Pagination';
import styles from './Table.module.scss';
import { TTableProps } from '../types';
import { DEFAULT_PAGINATION } from '../lib/constants';
import { AddRowModal } from './AddRowModal/AddRowModal';

// type TSortOption = {
//     id: string;
//     labelAsc: string;
//     labelDesc: string;
// };

// type TAddRowConfig = {
//     title?: string;
//     submitText?: string;
//     cancelText?: string;
//     buttonText?: string;
//     fields: TAddRowFieldConfig[];
// };

// type TTableProps<TData extends object> = {
//     data: TData[];
//     columns: ColumnDef<TData, unknown>[];
//     title?: string;
//     subtitle?: string;
//     isLoading?: boolean;
//     tableError?: string;
//     sorting?: SortingState;
//     pagination?: PaginationState;
//     searchTerm?: string;
//     sortOptions?: TSortOption[];
//     onSortingChange?: (sortingState: SortingState) => void;
//     onPaginationChange?: React.Dispatch<React.SetStateAction<PaginationState>>;
//     onSearchTermChange?: (searchTermValue: string) => void;
//     onRefresh?: () => void;
//     total?: number;
//     addRow?: TAddRowConfig;
//     addRowValues?: TAddRowFormValues;
//     onAddRowValuesChange?: (fieldName: string, value: string) => void;
//     onAddRowSubmit?: (values: TAddRowFormValues) => void;
// };

// export const DEFAULT_PAGINATION = {
//     pageIndex: 0,
//     pageSize: 20
// };

function Table<TData extends object>({
    data,
    columns,
    title = 'Таблица',
    subtitle = 'Все позиции',
    isLoading,
    tableError,
    sorting,
    pagination,
    sortOptions = [],
    onSortingChange,
    onPaginationChange,
    onSearchTermChange,
    total = 0,
    searchTerm = '',
    onRefresh,
    addRow,
    addRowValues,
    onAddRowValuesChange,
    onAddRowSubmit
}: TTableProps<TData>): ReactElement {
    const [paginationLocal, setPaginationLocal] =
        useState<PaginationState>(pagination || DEFAULT_PAGINATION);
    const [showModal, setShowModal] = useState(false);
    const currentPagination = pagination || paginationLocal;
    const canSort = Boolean(onSortingChange) && sortOptions.length > 0;
    const canSearch = Boolean(onSearchTermChange);
    const canPaginate = Boolean(onPaginationChange) && total > 0;
    const canAddRows = Boolean(addRow && addRowValues && onAddRowValuesChange && onAddRowSubmit);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting: sorting || [],
            pagination: currentPagination
        },
        onSortingChange: (updater) => {
            if (!onSortingChange) {
                return;
            }

            const nextSorting = typeof updater === 'function' ? updater(sorting || []) : updater;
            onSortingChange(nextSorting);
        },
        onPaginationChange: onPaginationChange || setPaginationLocal,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: canPaginate,
        manualSorting: Boolean(onSortingChange),
        pageCount: total ? Math.ceil(total / currentPagination.pageSize) : 0
    });

    const applySort = (column: string, desc: boolean): void => {
        onSortingChange?.([{id: column, desc}]);
    };

    return (
        <div className={styles.container}>
            {isLoading && (
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}/>
                </div>
            )}

            <div className={styles.controls}>
                <h3>{title}</h3>
                {canSearch ? (
                    <InputBase
                        type="text"
                        placeholder="Найти"
                        value={searchTerm}
                        onChange={(event) => onSearchTermChange?.(event.target.value)}
                        className={styles.searchInput}
                        wrapperClassName={styles.searchInputWrapper}
                        leftIcon={<img src="./search.svg" alt="search icon"/>}
                    />
                ) : null}
            </div>

            <div className={styles.tableWrapper}>
                <div className={styles.tableHeader}>
                    <h4>{subtitle}</h4>
                    <div className={styles.tableHeaderRight}>
                        {onRefresh ? (
                            <button
                                type="button"
                                className={styles.iconAction}
                                onClick={onRefresh}
                                aria-label="Обновить"
                            >
                                ↻
                            </button>
                        ) : null}

                        {canSort ? (
                            <div className={styles.sortGroup} aria-label="Сортировка">
                                {sortOptions.map((option) => (
                                    <div key={option.id} className={styles.sortPair}>
                                        <button
                                            type="button"
                                            className={styles.iconAction}
                                            onClick={() => applySort(option.id, false)}
                                            aria-label={option.labelAsc}
                                        >
                                            {option.labelAsc}
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.iconAction}
                                            onClick={() => applySort(option.id, true)}
                                            aria-label={option.labelDesc}
                                        >
                                            {option.labelDesc}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        {canAddRows ? (
                            <ButtonBase
                                onClick={() => setShowModal(true)}
                                className={styles.addButton}
                                text={addRow?.buttonText ?? 'Добавить'}
                                leftIcon={<span className={styles.addPlusIcon}>+</span>}
                            />
                        ) : null}
                    </div>
                </div>
                {tableError && <p className={styles.errorText}>{tableError}</p>}

                <table className={styles.table}>
                    <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className={styles.th}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{asc: ' ↑', desc: ' ↓'}[header.column.getIsSorted() as string] ?? null}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className={styles.row}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className={styles.td}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {canPaginate ? (
                <Pagination
                    pagination={currentPagination}
                    total={total}
                    onPreviousPage={() =>
                        onPaginationChange?.((prev) => ({...prev, pageIndex: prev.pageIndex - 1}))
                    }
                    onNextPage={() =>
                        onPaginationChange?.((prev) => ({...prev, pageIndex: prev.pageIndex + 1}))
                    }
                    onSetPageIndex={(pageIndex) => onPaginationChange?.((prev) => ({...prev, pageIndex}))}
                />
            ) : null}

            {canAddRows && addRow && addRowValues ? (
                <AddRowModal
                    show={showModal}
                    title={addRow.title}
                    submitText={addRow.submitText}
                    cancelText={addRow.cancelText}
                    fields={addRow.fields}
                    formValues={addRowValues}
                    onClose={() => setShowModal(false)}
                    onChange={onAddRowValuesChange!}
                    onSubmit={(values) => {
                        onAddRowSubmit!(values);
                        setShowModal(false);
                    }}
                />
            ) : null}

        </div>
    );
}

export default Table;
