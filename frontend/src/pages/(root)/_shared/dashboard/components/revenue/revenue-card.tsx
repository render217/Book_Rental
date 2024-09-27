import { RevenueResponse } from "@/services/owner-revenue.services";
import { Box, Divider, Stack, Typography } from "@mui/material";

type RevenueCardProps = {
    data: RevenueResponse | undefined;
};

export default function RevenueCard({ data }: RevenueCardProps) {
    if (!data) {
        return null;
    }

    const currentMonth = data.statistics.currentMonth;
    const lastMonth = data.statistics.lastMonth;
    const percentageDifference = data.statistics.percentageDifference;

    return (
        <>
            <Box
                sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    padding: "20px",
                    boxShadow: "3px 6px 34px -28px rgba(0,0,0,0.75)",
                    marginBottom: "4px",
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
                <Box>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography
                            variant="h5"
                            color=""
                            sx={{
                                fontWeight: "700",
                            }}>
                            ETB {currentMonth.totalRevenue} Birr
                        </Typography>
                        <Typography
                            sx={{
                                color:
                                    percentageDifference.totalRevenueDifference >
                                    0
                                        ? "#4CAF50"
                                        : "#F44336",
                                fontSize: "16px",
                                fontWeight: "400",
                            }}>
                            {percentageDifference.totalRevenueDifference}%{" "}
                            {percentageDifference.totalRevenueDifference > 0
                                ? "inc"
                                : "dec"}
                        </Typography>
                    </Stack>
                    <Typography
                        sx={{
                            color: "#656575",
                            fontSize: "14px",
                            fontWeight: "100",
                        }}>
                        Compared to ETB {lastMonth.totalRevenue} last Month.
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography
                            sx={{
                                color: "#656575",
                                fontSize: "16px",
                                fontWeight: "400",
                            }}>
                            Last Month Income
                        </Typography>
                        <Typography
                            sx={{
                                color: "#656575",
                                fontSize: "16px",
                                fontWeight: "400",
                            }}>
                            ETB {lastMonth.totalRevenue} Birr
                        </Typography>
                    </Stack>
                </Box>
            </Box>

            <Box
                sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    padding: "20px",
                    boxShadow: "3px 6px 34px -28px rgba(0,0,0,0.75)",
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
                        Total Book Rented
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
                <Box>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography
                            variant="h5"
                            color=""
                            sx={{
                                fontWeight: "700",
                            }}>
                            {currentMonth.totalRentals} Rentals
                        </Typography>
                        <Typography
                            sx={{
                                color:
                                    percentageDifference.totalQuantityRentedDifference >
                                    0
                                        ? "#4CAF50"
                                        : "#F44336",
                                fontSize: "16px",
                                fontWeight: "400",
                            }}>
                            {percentageDifference.totalRentalsDifference}%{" "}
                            {percentageDifference.totalRevenueDifference > 0
                                ? "inc"
                                : "dec"}
                        </Typography>
                    </Stack>
                    <Typography
                        sx={{
                            color: "#656575",
                            fontSize: "14px",
                            fontWeight: "100",
                        }}>
                        Compared to {lastMonth.totalRentals} last Month.
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography
                            sx={{
                                color: "#656575",
                                fontSize: "16px",
                                fontWeight: "400",
                            }}>
                            Last Month total rentals
                        </Typography>
                        <Typography
                            sx={{
                                color: "#656575",
                                fontSize: "16px",
                                fontWeight: "400",
                            }}>
                            {lastMonth.totalRentals} Rentals
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </>
    );
}
