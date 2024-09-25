import apiClient from "./apiClient";

export const getBooksInventory = async (query = "") => {
    const q = query ? `?q=${query}` : "";
    const res = await apiClient.get(`/inventory${q}`);
    return res.data;
};

export const getBookInventoryDetail = async (id: string) => {
    const res = await apiClient.get(`/inventory/${id}`);
    return res.data;
};

export const getBooksInventoryStatistics = async () => {
    const res = await apiClient.get(`/inventory/statistics`);
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

export const searchBookInInventory = async (id: string) => {
    const res = await apiClient.get(`/inventory/books/${id}`);
    return res.data;
};
