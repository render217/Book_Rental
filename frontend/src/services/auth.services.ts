import apiClient from "./apiClient";
import { IUser } from "@/types";

type LoginResponse = {
    token: string;
    user: IUser;
    rules: string[];
};

export const loginUser = async (payload: unknown) => {
    const res = await apiClient.post<LoginResponse>("/auth/login", payload);
    return res.data;
};

export const registerUser = async (payload: unknown) => {
    return apiClient.post("/auth/register", payload);
};

export const getCurrentUser = async () => {
    const res = await apiClient.get<IUser>("/users/me");
    return res.data;
};
