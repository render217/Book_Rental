import apiClient from "./apiClient";

type IRevenue = {
    month: number;
    totalQuantityRented: number;
    totalRentals: number;
    totalRevenue: number;
    year: number;
};

type IPercentage = {
    totalQuantityRentedDifference: number;
    totalRentalsDifference: number;
    totalRevenueDifference: number;
};

export type RevenueResponse = {
    statistics: {
        currentMonth: IRevenue;
        lastMonth: IRevenue;
        percentageDifference: IPercentage;
    };
};

export const getAllOwnersRevenue = async () => {
    const res = await apiClient.get<RevenueResponse>(`/revenues`);
    return res.data;
};

export const getOwnerRevenue = async () => {
    const res = await apiClient.get<RevenueResponse>(`/revenues/me`);
    return res.data;
};
