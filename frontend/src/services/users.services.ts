import { IOwner } from "@/types";
import apiClient from "./apiClient";

export const getOwners = async (query = "") => {
    const q = query ? `?q=${query}` : "";
    const res = await apiClient.get<IOwner[]>(`/users/owners${q}`);
    return res.data;
};

export const getOwnerDetail = async (id: string) => {
    const res = await apiClient.get(`/users/owners/${id}`);
    return res.data;
};

export const approveOwner = async (id: string) => {
    const res = await apiClient.patch(`/users/owners/${id}/approve`);
    return res.data;
};

export const activeDeactiveOwner = async (id: string) => {
    const res = await apiClient.patch(`/users/owners/${id}/activate`);
    return res.data;
};

export const deleteOwner = async (id: string) => {
    const res = await apiClient.delete(`/users/owners/${id}`);
    return res.data;
};
