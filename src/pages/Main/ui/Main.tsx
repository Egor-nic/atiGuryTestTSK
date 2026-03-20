import {Table} from "../../../entity/Table";
import {TableToast} from "../../../entity/Table/ui/TableToast/TableToast";
import styles from './Main.module.scss';
import {useProductsData} from "../model/useProductsData";
import {useProductTableColumns} from "../model/useProductTableColumns";
import {ColumnDef} from "@tanstack/react-table";
import {TProduct} from "../lib/types";

export default function Main() {
    const {
        data,
        total,
        isLoading,
        tableError,
        searchTerm,
        setSearchTerm,
        sorting,
        pagination,
        setPagination,
        formData,
        toast,
        handleAddProduct,
        handleSortingChange,
        handleFormValueChange,
        refresh: onRefresh,
    } = useProductsData();

    const {columns} = useProductTableColumns();
    const addRowFields = [
        {name: 'title', label: 'Наименование', required: true},
        {name: 'brand', label: 'Вендор', required: true},
        {name: 'sku', label: 'Артикул'},
        {name: 'price', label: 'Цена', type: 'number' as const, required: true, min: 0, step: 0.01}
    ];
    const sortOptions = [
        {id: 'price', labelAsc: 'Цена ↑', labelDesc: 'Цена ↓'},
        {id: 'rating', labelAsc: 'Рейтинг ↑', labelDesc: 'Рейтинг ↓'}
    ];

    return (
        <div className={styles.wrapper}>
            <Table
                title="Товары"
                subtitle="Все позиции"
                onRefresh={onRefresh}
                isLoading={isLoading}
                tableError={tableError}
                total={total}
                columns={columns as ColumnDef<TProduct, unknown>[]}
                data={data}
                pagination={pagination}
                searchTerm={searchTerm}
                sorting={sorting}
                sortOptions={sortOptions}
                onPaginationChange={setPagination}
                onSearchTermChange={setSearchTerm}
                onSortingChange={handleSortingChange}
                addRow={{
                    title: 'Добавить товар',
                    buttonText: 'Добавить',
                    submitText: 'Добавить',
                    cancelText: 'Отмена',
                    fields: addRowFields
                }}
                addRowValues={formData}
                onAddRowValuesChange={handleFormValueChange}
                onAddRowSubmit={handleAddProduct}
            />

            <TableToast toast={toast}/>
        </div>

    );
}