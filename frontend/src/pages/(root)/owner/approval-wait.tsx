import { useAuth } from "@/context/auth-provider";
import { Box, Stack, Typography, Button } from "@mui/material";

const rental_logo = "/assets/svg/rental_logo.svg";

export default function ApprovalWaitPage() {
    const { user, logOutUser } = useAuth();

    return (
        <Box
            sx={{
                height: "100vh",
                paddingInline: "4%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f4f4f4",
                position: "relative",
            }}>
            <Button
                variant="outlined"
                onClick={logOutUser}
                sx={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    color: "#333",
                }}>
                Log Out
            </Button>

            <Box
                sx={{
                    maxWidth: "500px",
                    width: "100%",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                }}>
                <Box
                    sx={{
                        paddingTop: "30px",
                        width: "90%",
                        height: "150px",
                        marginInline: "auto",
                        mb: "20px",
                    }}>
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                        src={rental_logo}
                        alt="Rental Logo"
                    />
                </Box>
                <Stack spacing={2}>
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#333",
                        }}>
                        Welcome to Book Rental 👋
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "2rem",
                            fontWeight: "bold",
                            color: "#333",
                        }}>
                        Hi {user.username},
                    </Typography>

                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "1.25rem",
                            fontWeight: "normal",
                            color: "#555",
                        }}>
                        Your account is pending approval. Please wait for our
                        Administrator to approve your account.
                    </Typography>

                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "1rem",
                            fontWeight: "normal",
                            color: "#888",
                        }}>
                        If you have any questions, feel free to reach out to our
                        support team.
                    </Typography>

                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "1rem",
                            fontWeight: "normal",
                            color: "#333",
                        }}>
                        Email:{" "}
                        <a href="mailto:bookrental@rental.com">
                            bookrental@rental.com
                        </a>
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
}
