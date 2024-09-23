import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import useAuthRedirect from "@/hooks/use-auth-redirect";

const bookLogo = "/assets/images/rental_logo_big.png";
export default function AuthLayout() {
    const match = useMediaQuery("(min-width: 840px)");
    useAuthRedirect();

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                maxHeight: "100vh",
                overflow: "hidden",
                display: "flex",
            }}>
            <Box
                sx={{
                    width: match ? "50%" : "0%",

                    opacity: match ? "1" : "0",
                    backgroundColor: "#171B36",
                    transition:
                        "width 0.3s ease-in-out, opacity 0.2s ease-in-out",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingInline: "33%",
                    }}>
                    <Box>
                        <img
                            style={{
                                width: "100%",
                                minWidth: "100%",
                                height: "auto",
                                objectFit: "contain",
                            }}
                            src={bookLogo}
                            alt="Book Logo"
                        />
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    // backgroundColor: "#F5F5F5",
                    backgroundColor: "white",
                    padding: match ? "24px" : "",
                    marginInline: "auto",
                    maxWidth: match ? "100%" : "80%",
                    height: "100%",
                    width: match ? "50%" : "100%",
                    transition: "all 0.3s ease-in-out",
                }}>
                <Outlet />
            </Box>
        </Box>
    );
}
