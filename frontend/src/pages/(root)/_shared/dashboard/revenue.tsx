import {
    useGetAllOwnersRevenues,
    useGetOwnerRevenue,
} from "@/services/react-query/queries";
import RevenueCard from "./components/revenue/revenue-card";
import { useAuth } from "@/context/auth-provider";
import { Role_Enum } from "@/types";
export default function Revenue() {
    const { user } = useAuth();
    const isAdmin = user.role === Role_Enum.ADMIN;
    const isOwner = user.role === Role_Enum.OWNER;
    const { data: ownerRevenueData, isLoading: isOwnerRevenueLoading } =
        useGetOwnerRevenue(isOwner);
    const { data: allOwnersRevenueData, isLoading: isAllOwnersRevenueLoading } =
        useGetAllOwnersRevenues(isAdmin);

    if (isOwner && isOwnerRevenueLoading) {
        return <div>loading...</div>;
    }

    if (isAdmin && isAllOwnersRevenueLoading) {
        return <div>loading...</div>;
    }

    return (
        <RevenueCard data={isOwner ? ownerRevenueData : allOwnersRevenueData} />
    );
}
