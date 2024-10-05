import apiClient from "@/services/apiClient";
import { Box, CircularProgress, Typography } from "@mui/material";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/services/react-query/queryKeys";

type RevenueSummaryApiResponse = {
    data: [
        {
            name: string;
            thisYear: number;
            lastYear: number;
        }[]
    ];
};

const EarningSummary = () => {
    const { data: { data = [] } = {}, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.GET_REVENUE_SUMMARY],
        queryFn: async () => {
            const res = await apiClient.get<RevenueSummaryApiResponse>(
                "/revenues/summary"
            );
            return res.data as RevenueSummaryApiResponse;
        },
        placeholderData: keepPreviousData,
    });

    if (isLoading) {
        return <EarningSummarySkeleton />;
    }

    return (
        <Box
            sx={{
                backgroundColor: "white",
                paddingInline: "10px",
                paddingBlock: "10px",
            }}>
            <Typography
                sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    marginBottom: "10px",
                }}>
                Total Earning Summary
            </Typography>
            <ResponsiveContainer width="100%" height={190}>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="thisYear"
                        stroke="#0088FE"
                        fill="#99CFFF"
                    />
                    <Area
                        type="monotone"
                        dataKey="lastYear"
                        stroke="#33A0FF"
                        fill="#33A0FF"
                        strokeDasharray="5 5"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default EarningSummary;

function EarningSummarySkeleton() {
    const data = [
        { name: "Jan", thisYear: 0, lastYear: 0 },
        { name: "Feb", thisYear: 0, lastYear: 0 },
        { name: "Mar", thisYear: 0, lastYear: 0 },
        { name: "Apr", thisYear: 0, lastYear: 0 },
        { name: "May", thisYear: 0, lastYear: 0 },
        { name: "Jun", thisYear: 0, lastYear: 0 },
        { name: "Jul", thisYear: 0, lastYear: 0 },
        { name: "Aug", thisYear: 0, lastYear: 0 },
        { name: "Sep", thisYear: 0, lastYear: 0 },
        { name: "Oct", thisYear: 0, lastYear: 0 },
        { name: "Nov", thisYear: 0, lastYear: 0 },
        { name: "Dec", thisYear: 0, lastYear: 0 },
    ];
    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "10px",
                position: "relative",
            }}>
            <CircularProgress
                sx={{
                    zIndex: 100,
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
            <Typography
                sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    marginBottom: "10px",
                }}>
                Total Earning Summary
            </Typography>
            <ResponsiveContainer width="100%" height={190} style={{}}>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Area
                        type="monotone"
                        dataKey="thisYear"
                        stroke="#0088FE"
                        fill="#99CFFF"
                    />
                    <Area
                        type="monotone"
                        dataKey="lastYear"
                        stroke="#33A0FF"
                        fill="#33A0FF"
                        strokeDasharray="5 5"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}
