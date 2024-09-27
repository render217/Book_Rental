import { RentalStatus_Enum } from "@/types";
import apiClient from "./apiClient";

type RentalHistoryResponse = {
    rentalId: string;
    bookId: string;
    book: {
        title: string;
        author: string;
        category: string;
    };
    owner: {
        username: string;
        email: string;
        phoneNumber: string;
        location: string;
    };
    rentedCopies: number;
    totalDays: number;
    totalPrice: number;
    rentalStartDate: string;
    rentalEndDate: string;
    returnDate: string | null;
    status: RentalStatus_Enum;
}[];

export const addRentBook = async (payload: unknown) => {
    const res = await apiClient.post(`/rentals`, payload);
    return res.data;
};

export const getRentalHistory = async () => {
    const res = await apiClient.get<RentalHistoryResponse>("/rentals");
    return res.data;
};

export const getRentalHistoryDetail = async (id: string) => {
    const res = await apiClient.get(`/rentals/${id}`);
    return res.data;
};

export const returnBook = async (id: string) => {
    const res = await apiClient.patch(`/rentals/${id}/return`);
    return res.data;
};
