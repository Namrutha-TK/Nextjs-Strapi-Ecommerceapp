export interface Category {
    id: number;
    documentId: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface CategoryResponse {
    data: Category[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}