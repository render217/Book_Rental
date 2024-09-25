import { Box, Typography, CircularProgress } from "@mui/material";

const bookRentalLogo = "/assets/svg/rental_logo.svg";

export default function InitialLoad() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f0f0f0",
                padding: "20px",
            }}>
            <img
                src={bookRentalLogo}
                alt="Book Rental Logo"
                style={{
                    width: "150px",
                    marginBottom: "20px",
                }}
            />
            <Typography
                variant="h5"
                sx={{ marginBottom: "20px", color: "#333", fontSize: "18px" }}>
                Loading...
            </Typography>
            <CircularProgress color="primary" />
        </Box>
    );
}
