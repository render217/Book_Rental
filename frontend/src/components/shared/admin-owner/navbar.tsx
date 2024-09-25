import useUIStore from "@/store/useUIStore";
import { Box, Stack, Typography, IconButton, Breadcrumbs } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "@/context/auth-provider";
import { Role_Enum } from "@/types";
import { useLocation } from "react-router-dom";
export default function NavBar() {
    const { openSideBar, isMinScreen } = useUIStore();
    const { user } = useAuth();
    const displayRole = user?.role === Role_Enum.ADMIN ? "Admin" : "Owner";

    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const possible_paths = [
        "",
        "dashboard",
        "notifications",
        "book-catalogs",
        "upload-book",
        "settings",
        "owners",
    ];
    const isValid = possible_paths.includes(path);
    const pathName = isValid ? (path === "" ? "dashboard" : path) : "";
    const pathNameText = pathName.charAt(0).toUpperCase() + pathName.slice(1);
    return (
        <Box
            sx={{
                position: "sticky",
                top: "0",
                width: "100%",
                backgroundColor: "#f0f2ff",
                paddingTop: "8px",
                marginBottom: "16px",
                zIndex: "99",
            }}>
            <Box
                sx={{
                    backgroundColor: "white",
                    paddingInline: "16px",
                    paddingBlock: "10px",
                    height: "60px",
                    width: "100%",
                    borderRadius: "10px",
                }}>
                <Stack
                    direction={"row"}
                    sx={{
                        alignItems: "center",
                        gap: "10px",
                    }}>
                    {isMinScreen && (
                        <IconButton onClick={openSideBar}>
                            <MenuIcon
                                sx={{ color: "black", fontSize: "24px" }}
                            />
                        </IconButton>
                    )}
                    <Breadcrumbs>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: "20px",
                                fontWeight: "600",
                                color: "black",
                            }}>
                            {displayRole}
                        </Typography>
                        <Typography variant="h3" sx={{ fontSize: "16px" }}>
                            {pathNameText}
                        </Typography>
                    </Breadcrumbs>

                    {/* just to set the layout consistent */}
                    {!isMinScreen && (
                        <IconButton
                            onClick={() => {}}
                            disableRipple
                            sx={{
                                cursor: "default",
                                opacity: 0,
                                visibility: "hidden",
                            }}>
                            <MenuIcon
                                sx={{
                                    opacity: 0,
                                    fontSize: "24px",
                                    visibility: "hidden",
                                }}
                            />
                        </IconButton>
                    )}
                </Stack>
            </Box>
        </Box>
    );
}
