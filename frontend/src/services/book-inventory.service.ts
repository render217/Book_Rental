import { IBookStatus } from "@/types";
import apiClient from "./apiClient";

type BookStatusApiResponse = {
    data: IBookStatus[];
    meta: {
        totalRowCount: number;
    };
};

export const getBooksInventory = async (query = "") => {
    const q = query ? `?q=${query}` : "";
    const res = await apiClient.get<BookStatusApiResponse>(`/inventory${q}`);
    return res.data;
};

export const getBookInventoryDetail = async (id: string) => {
    const res = await apiClient.get(`/inventory/${id}`);
    return res.data;
};

type GetBookInventoryStatisticsResponse = {
    category: string;
    count: number;
    quantity: number;
}[];
export const getBooksInventoryStatistics = async () => {
    const res = await apiClient.get<GetBookInventoryStatisticsResponse>(
        `/inventory/statistics`
    );
    return res.data;
};

export const addBookInventory = async (payload: unknown) => {
    const res = await apiClient.post(`/inventory`, payload);
    return res.data;
};

export const updateBookInventory = async (id: string, payload: unknown) => {
    const res = await apiClient.patch(`/inventory/${id}`, payload);
    return res.data;
};

export const removeBookFromInventory = async (id: string, payload: unknown) => {
    const res = await apiClient.patch(`/inventory/${id}/remove`, payload);
    return res.data;
};

type SearchBookResponse = {
    id: string;
    title: string;
    author: string;
    category: string;
    availableCopies: number;
    pricePerDay: number;
    owner: {
        id: string;
        username: string;
        location: string;
        phoneNumber: string;
    };
}[];

export const searchBookInInventory = async (id: string) => {
    const res = await apiClient.get<SearchBookResponse>(
        `/inventory/books/${id}`
    );
    return res.data;
};
