export type TProduct = {
    id: number;
    title?: string;
    price?: number;
    rating?: number;
    brand?: string;
    sku?: string;
    stock?: number;
    category?: string;
    thumbnail?: string;
};

export type TProductsResponse = {
    products: TProduct[];
    total: number;
};

export type TAddRowFormValue = Record<string, string>;

