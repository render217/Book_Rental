import {
    useGetAllOwnersRevenues,
    // useGetOwnerRevenue,
} from "@/services/react-query/queries";
import RevenueCard from "./components/revenue/revenue-card";
import {
    Box,
    CircularProgress,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
// import { useAuth } from "@/context/auth-provider";
// import { Role_Enum } from "@/types";
export default function Revenue() {
    // const { user } = useAuth();
    // const isAdmin = user.role === Role_Enum.ADMIN;
    // const isOwner = user.role === Role_Enum.OWNER;
    // const { data: ownerRevenueData, isLoading: isOwnerRevenueLoading } =
    //     useGetOwnerRevenue(isOwner);
    // const { data: allOwnersRevenueData, isLoading: isAllOwnersRevenueLoading } =
    //     useGetAllOwnersRevenues(isAdmin);

    // if (isOwner && isOwnerRevenueLoading) {
    //     return <div>loading...</div>;
    // }

    // if (isAdmin && isAllOwnersRevenueLoading) {
    //     return <div>loading...</div>;
    // }

    const { data: revenueData, isLoading } = useGetAllOwnersRevenues(true);

    if (isLoading) {
        return <RevenueSkeleton />;
    }
    return (
        // <RevenueCard data={isOwner ? ownerRevenueData : allOwnersRevenueData} />
        <RevenueCard data={revenueData} />
    );
}

function RevenueSkeleton() {
    return (
        <Box
            sx={{
                borderRadius: "5px",
                backgroundColor: "white",
                padding: "20px",
                marginBottom: "4px",
                minHeight: "150px",
            }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Typography
                    fontSize="16px"
                    color="#656575"
                    variant="h6"
                    component="h1">
                    Income
                </Typography>
                <Box>
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{
                            padding: "2px",
                            paddingInline: "10px",
                            backgroundColor: "#F8F7F1",
                            border: "1px solid #E0E0E0",
                        }}>
                        This Month
                    </Typography>
                </Box>
            </Stack>
            <Divider
                sx={{
                    marginTop: "8px",
                    marginBottom: "8px",
                }}
            />
            <Box
                sx={{
                    minHeight: "100px",
                    display: "grid",
                    placeContent: "center",
                }}>
                <CircularProgress />
            </Box>
        </Box>
    );
}
