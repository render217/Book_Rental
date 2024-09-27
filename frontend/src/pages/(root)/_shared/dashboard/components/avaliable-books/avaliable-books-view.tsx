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
    categories: { category: string; count: number; quantity?: number }[]
) => {
    return categories.map((item, index) => ({
        name: item.category,
        value: item.count,
        total: item?.quantity ? item.quantity : 0,
        color: COLORS[index % COLORS.length],
    }));
};

type AvaliableBooksViewProps = {
    isLoading: boolean;
    data: { category: string; count: number; quantity?: number }[];
};

export default function AvaliableBooksView({
    data,
    isLoading,
}: AvaliableBooksViewProps) {
    const formatedData = generateCategoryData(data!);
    return (
        <Box>
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
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: "10px",
                                    }}>
                                    {item.total !== 0 && (
                                        <Typography
                                            sx={{
                                                color: "#3f51b5",
                                                fontWeight: "500",
                                            }}>
                                            Quantity:{" "}
                                            <span
                                                style={{
                                                    fontWeight: "bold",
                                                }}>
                                                {item.total}
                                            </span>
                                        </Typography>
                                    )}
                                    <Typography sx={{ color: "#555" }}>
                                        Types:{" "}
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                            }}>
                                            {item.value}
                                        </span>
                                    </Typography>
                                </Box>
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
