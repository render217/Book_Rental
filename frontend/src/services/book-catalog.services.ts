import { BookCatalogType } from "@/pages/(root)/admin/components/book-catalogs/book-catalog-type";
import apiClient from "./apiClient";

type GetBookCatalogResponse = BookCatalogType[];

type GetBookCatalogDetailResponse = Omit<
    BookCatalogType,
    "status" | "uploader"
>;

type GetBookStatisticsResponse = {
    category: string;
    count: number;
    quantity?: number;
}[];
export const getBookCatalogs = async (query = "") => {
    const q = query ? `?q=${query}` : "";
    const res = await apiClient.get<GetBookCatalogResponse>(`/books${q}`);
    return res.data;
};

export const getBookCatalogDetail = async (id: string) => {
    const res = await apiClient.get<GetBookCatalogDetailResponse>(
        `/books/${id}`
    );
    return res.data;
};

export const getBookCatalogsStatistics = async () => {
    const res = await apiClient.get<GetBookStatisticsResponse>(
        "/books/statistics"
    );
    return res.data;
};

export const createBookCatalog = async (payload: unknown) => {
    const res = await apiClient.post("/books", payload);
    return res.data;
};

export const updateBookCatalogStatus = async (id: string) => {
    const res = await apiClient.patch(`/books/${id}`);
    return res.data;
};
