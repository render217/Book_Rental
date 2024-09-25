import { Box, Divider, Stack, Typography } from "@mui/material";
export default function Revenue() {
    return (
        <Box
            sx={{
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
                        ETB 0.00
                    </Typography>
                    <Typography>1.5% inc</Typography>
                </Stack>
                <Typography
                    sx={{
                        color: "#656575",
                        fontSize: "14px",
                        fontWeight: "100",
                    }}>
                    Compared to last Month.
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
                        ETB 0.00
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
}
