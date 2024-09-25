import { useBookCatalogStatistics } from "@/services/react-query/queries";
import { Box, Stack, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28FDB",
    "#FF6347",
    "#4682B4",
    "#32CD32",
    "#FFD700",
    "#FF4500",
];
const generateCategoryData = (
    categories: { category: string; count: number }[]
) => {
    return categories.map((item, index) => ({
        name: item.category,
        value: item.count,
        color: COLORS[index % COLORS.length],
    }));
};
export default function AvaliableBooks() {
    const { data, isLoading } = useBookCatalogStatistics();

    if (isLoading) {
        return null;
    }
    const formatedData = generateCategoryData(data!);

    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "20px",
                boxShadow: "3px 6px 34px -28px rgba(0,0,0,0.75)",
            }}>
            <Stack
                sx={{}}
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Typography
                    fontSize="16px"
                    color="#656575"
                    variant="h6"
                    component="h1">
                    AvaliableBooks
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
                        Today
                    </Typography>
                </Box>
            </Stack>

            <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                    {data && (
                        <Pie
                            data={formatedData}
                            cx={"50%"}
                            cy={"50%"}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={0}
                            dataKey="value">
                            {!isLoading &&
                                data &&
                                formatedData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                        </Pie>
                    )}
                </PieChart>
            </ResponsiveContainer>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                }}>
                {data &&
                    formatedData.map((item, index) => {
                        return (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                justifyContent="space-between"
                                alignItems="center">
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "2px",
                                    }}>
                                    <CircleDot color={item.color} />
                                    <Typography>{item.name}</Typography>
                                </Box>
                                <Typography>{item.value}</Typography>
                            </Stack>
                        );
                    })}
            </Box>
        </Box>
    );
}

function CircleDot({ color }: { color: string }) {
    return (
        <>
            <Box
                sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: color,
                    display: "inline-block",
                    marginRight: "8px",
                }}
            />
        </>
    );
}
