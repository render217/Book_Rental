import useUIStore from "@/store/useUIStore";
import { Box, Stack, Typography, IconButton, Breadcrumbs } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
export default function NavBar() {
    const { openSideBar, isMinScreen } = useUIStore();
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
                            Admin
                        </Typography>
                        <Typography variant="h3" sx={{ fontSize: "16px" }}>
                            Dashboard
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
