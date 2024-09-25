import { Box } from "@mui/material";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "May", thisYear: 250000, lastYear: 120000 },
    { name: "Jun", thisYear: 200000, lastYear: 180000 },
    { name: "Jul", thisYear: 230000, lastYear: 150000 },
    { name: "Aug", thisYear: 210000, lastYear: 170000 },
    { name: "Sep", thisYear: 240000, lastYear: 160000 },
    { name: "Oct", thisYear: 270000, lastYear: 180000 },
];

const EarningSummary = () => {
    return (
        <Box sx={{ backgroundColor: "white", padding: "10px" }}>
            <ResponsiveContainer width="100%" height={210}>
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
