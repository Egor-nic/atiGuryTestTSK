import {useMemo} from 'react';
import type {PaginationState} from '@tanstack/react-table';

type TUsePaginationHookParameters = {
    pagination: PaginationState;
    total: number;
};

type TUsePaginationHookResult = {
    pageCount: number;
    currentPage: number;
    pageNumbers: Array<number | string>;
    shownStart: number;
    shownEnd: number;
    canPreviousPage: boolean;
    canNextPage: boolean;
};

export function usePagination({
    pagination,
    total
}: TUsePaginationHookParameters): TUsePaginationHookResult {
    const pageCount = Math.ceil(total / pagination.pageSize) || 0;
    const currentPage = pagination.pageIndex + 1;

    const pageNumbers = useMemo<Array<number | string>>(() => {
        const pages: Array<number | string> = [];

        if (pageCount <= 7) {
            for (let index = 1; index <= pageCount; index += 1) {
                pages.push(index);
            }

            return pages;
        }

        pages.push(1);
        if (currentPage > 4) {
            pages.push('...');
        }

        const start = Math.max(2, currentPage - 2);
        const end = Math.min(pageCount - 1, currentPage + 2);
        for (let index = start; index <= end; index += 1) {
            pages.push(index);
        }

        if (currentPage < pageCount - 3) {
            pages.push('...');
        }

        if (pageCount > 1) {
            pages.push(pageCount);
        }

        return pages;
    }, [currentPage, pageCount]);

    const shownStart = total > 0 ? pagination.pageIndex * pagination.pageSize + 1 : 0;
    const shownEnd = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total);
    const canPreviousPage = pagination.pageIndex > 0;
    const canNextPage = pageCount > 0 && pagination.pageIndex + 1 < pageCount;

    return {
        pageCount,
        currentPage,
        pageNumbers,
        shownStart,
        shownEnd,
        canPreviousPage,
        canNextPage
    };
}
