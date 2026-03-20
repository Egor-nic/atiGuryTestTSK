import styles from './Pagination.module.scss';
import type { PaginationState } from '@tanstack/react-table';
import { usePagination } from '../../../entity/Table/model/usePagination';

type PaginationProps = {
    pagination: PaginationState;
    total: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
    onSetPageIndex: (pageIndex: number) => void;
};

export function Pagination({
    pagination,
    total,
    onPreviousPage,
    onNextPage,
    onSetPageIndex
}: PaginationProps) {
    const {
        pageCount,
        currentPage,
        pageNumbers,
        shownStart,
        shownEnd,
        canPreviousPage,
        canNextPage
    } = usePagination({ pagination, total });

    if (pageCount <= 0) {
        return null;
    }

    return (
        <div className={styles.pagination}>
            <span className={styles.pageInfo}>
                Показано <b>{shownStart}–{shownEnd}</b> из <b>{total}</b> товаров
            </span>
            <div className={styles.pageControls}>
                <button
                    type="button"
                    onClick={onPreviousPage}
                    disabled={!canPreviousPage}
                    className={styles.pageArrow}
                >
                    ←
                </button>

                <div className={styles.pageNumbers}>
                    {pageNumbers.map((page, index) =>
                        page === '...' ? (
                            <span key={`ellipsis-${index}`} className={styles.ellipsis}>…</span>
                        ) : (
                            <button
                                key={page}
                                type="button"
                                onClick={() => onSetPageIndex(Number(page) - 1)}
                                className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                            >
                                {page}
                            </button>
                        )
                    )}
                </div>

                <button
                    type="button"
                    onClick={onNextPage}
                    disabled={!canNextPage}
                    className={styles.pageArrow}
                >
                    →
                </button>
            </div>
        </div>
    );
}

