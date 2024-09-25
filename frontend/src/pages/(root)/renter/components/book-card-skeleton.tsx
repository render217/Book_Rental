import { Box, Grid2, Skeleton } from "@mui/material";
export default function BookSkeleton() {
    return (
        <>
            <Grid2 container spacing={3} sx={{ padding: "20px" }}>
                {[...new Array(6)].map((_, index) => {
                    return (
                        <Grid2
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4,
                            }}
                            key={index}>
                            <Box
                                sx={{
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    textAlign: "center",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                }}>
                                <Skeleton variant="text" width="60%" />
                                <Skeleton variant="text" width="80%" />
                                <Skeleton variant="text" width="50%" />
                            </Box>
                        </Grid2>
                    );
                })}
            </Grid2>
        </>
    );
}
