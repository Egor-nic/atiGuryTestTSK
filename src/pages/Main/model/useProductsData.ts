import {useEffect, useState} from 'react';
import type {PaginationState, SortingState} from '@tanstack/react-table';
import type {TAddRowFormValue, TProduct, TProductsResponse} from '../lib/types';
import {PAGINATION_KEY, SORTING_KEY} from "../lib/constants";
import {safeParse} from "../lib/helpers";

export function useProductsData() {
    const [data, setData] = useState<TProduct[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [tableError, setTableError] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const [sorting, setSorting] = useState<SortingState>(() => {
        const parsed = safeParse<SortingState>(localStorage.getItem(SORTING_KEY));
        return parsed ?? [];
    });

    const [pagination, setPagination] = useState<PaginationState>(() => {
        const parsed = safeParse<PaginationState>(localStorage.getItem(PAGINATION_KEY));
        return parsed ?? {pageIndex: 0, pageSize: 10};
    });

    const [refreshKey, setRefreshKey] = useState(0);

    const [toast, setToast] = useState<{ message: string; visible: boolean }>({message: '', visible: false});

    const [formData, setFormData] = useState<TAddRowFormValue>({
        title: '',
        sku: '',
        price: '',
        brand: ''
    });

    useEffect(() => {
        localStorage.setItem(SORTING_KEY, JSON.stringify(sorting));
    }, [sorting]);

    useEffect(() => {
        localStorage.setItem(PAGINATION_KEY, JSON.stringify(pagination));
    }, [pagination]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPagination((prev) => ({...prev, pageIndex: 0}));
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        setPagination((prev) => ({...prev, pageIndex: 0}));
    }, [pagination.pageSize]);

    const fetchProducts = async (
        query: string,
        pageIndex: number,
        pageSize: number,
        currentSorting: SortingState
    ): Promise<void> => {
        setIsLoading(true);
        setTableError('');

        try {
            let url = `https://dummyjson.com/products?limit=${pageSize}&skip=${pageIndex * pageSize}`;
            if (query) {
                url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${pageSize}&skip=${pageIndex * pageSize}`;
            }


            if (currentSorting.length > 0) {
                const {id: sortBy, desc} = currentSorting[0];
                const order = desc ? 'desc' : 'asc';
                url += `&sortBy=${sortBy}&order=${order}`;
            }

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Не удалось загрузить товары');
            }

            const json: TProductsResponse = await res.json();

            const mapped = (json.products ?? []).map((p) => ({
                ...p,
                // Для совместимости на случай неполных полей.
                sku: p.sku ?? (p as TProduct).sku ?? undefined,
                stock: p.stock ?? 0
            }));

            setData(mapped);
            setTotal(json.total ?? 0);
        } catch (_err) {
            setData([]);
            setTotal(0);
            setTableError('Ошибка загрузки. Попробуйте обновить таблицу.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(debouncedSearch, pagination.pageIndex, pagination.pageSize, sorting);
    }, [debouncedSearch, pagination.pageIndex, pagination.pageSize, sorting, refreshKey]);


    const handleSortingChange = (sortingData: SortingState) => {
        setSorting(sortingData);
        setPagination((prev) => ({...prev, pageIndex: 0}));
    };

    const handleAddProduct = (nextFormData: TAddRowFormValue) => {
        const newProduct: TProduct = {
            id: Date.now(),
            rating: 5,
            stock: 1,
            category: 'Категория',
            thumbnail: '/logo.png',
            ...nextFormData,
            price: Number(nextFormData.price ?? 0)
        };

        setData((prev) => [newProduct, ...prev]);
        setTotal((prev) => prev + 1);

        setFormData({title: '', sku: '', price: '', brand: ''});

        setToast({message: 'Товар успешно добавлен!', visible: true});
        window.setTimeout(() => setToast({message: '', visible: false}), 3000);
    };

    const handleFormValueChange = (fieldName: string, value: string) => {
        setFormData((prev) => ({...prev, [fieldName]: value}));
    };

    return {
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
        setFormData,
        handleFormValueChange,
        toast,
        setToast,
        handleAddProduct,
        handleSortingChange,
        refresh: () => setRefreshKey((prev) => prev + 1)
    };
}