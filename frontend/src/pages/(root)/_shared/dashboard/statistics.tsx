import { Box, Grid2, Typography } from "@mui/material";
import Revenue from "./revenue";
import AvaliableBooks from "./avaliable-books";
export default function Statistics() {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "8px",
            }}>
            <Box
                sx={{
                    marginBottom: "10px",
                    paddingInline: "20px",
                    paddingTop: "20px",
                }}>
                <Typography
                    variant="h4"
                    color="#525256"
                    sx={{
                        fontSize: "20px",
                    }}>
                    This Month Statistics
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "300",
                        color: "#656575",
                    }}>
                    Tue, 14 Nov, 2024, 11.30 AM
                </Typography>
            </Box>

            <Grid2
                container
                spacing={2}
                sx={{
                    flexDirection: {
                        xs: "column",
                        md: "row",
                        lg: "column",
                    },
                }}>
                <Grid2
                    size={{
                        xs: 12,
                        md: 6,
                        lg: 12,
                    }}>
                    <Revenue />
                </Grid2>

                <Grid2
                    size={{
                        xs: 12,
                        md: 6,
                        lg: 12,
                    }}>
                    <AvaliableBooks />
                </Grid2>
            </Grid2>
        </Box>
    );
}
