import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import useUIStore from "@/store/useUIStore";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { SIDEBAR_ITEMS, SIDEBAR_ITEMS_2 } from "@/utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
export default function Sidebar() {
    const { isSideBarCollapsed, toggleSideBar, isMinScreen, closeSideBar } =
        useUIStore();
    return (
        <Box
            sx={{
                width:
                    !isMinScreen && isSideBarCollapsed
                        ? "72px"
                        : !isMinScreen && !isSideBarCollapsed
                        ? "256px"
                        : isMinScreen && isSideBarCollapsed
                        ? "0px"
                        : isMinScreen && !isSideBarCollapsed
                        ? "256px"
                        : "256px",
                opacity: isMinScreen && isSideBarCollapsed ? 0 : 1,
                visibility:
                    isMinScreen && isSideBarCollapsed ? "hidden" : "visible",
                transition: "all .3s ease-in-out",
                position: "fixed",
                top: "0",
                bottom: "0",
                left: "0",
                padding: isMinScreen ? "0px" : "8px",
                backgroundColor: "#f0f2ff",
                zIndex: "100",
            }}>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    background: "#171B36",
                    borderRadius: isMinScreen ? "0px" : "12px",
                    overflowY: "auto",
                    overflowX: "hidden",
                }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "2px",
                        paddingInline: "8px",
                        paddingBlock: "10px",
                        height: "60px",
                    }}>
                    {!isMinScreen && (
                        <IconButton onClick={toggleSideBar}>
                            <MenuIcon sx={{ color: "white" }} />
                        </IconButton>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "2px",
                            opacity: !isSideBarCollapsed ? 1 : 0,
                            transition: "opacity 0.3s ease-in-out ",
                        }}>
                        <IconButton disableRipple>
                            <MenuBookIcon sx={{ color: "#00ABFF" }} />
                        </IconButton>
                        <Typography
                            variant="body1"
                            sx={{
                                alignSelf: "center",
                                display: "block",
                                fontSize: "18px",
                                color: "#00ABFF",
                                whiteSpace: "nowrap",
                                lineHeight: "1.2",
                                marginTop: "5px",
                                opacity: isSideBarCollapsed ? 0 : 1,
                                visibility: isSideBarCollapsed
                                    ? "hidden"
                                    : "visible",
                                transition: "all .3s ease-in-out",
                            }}>
                            Book Rental
                        </Typography>
                    </Box>
                    {isMinScreen && !isSideBarCollapsed && (
                        <IconButton
                            sx={{
                                marginLeft: "auto",
                                color: "white",
                                border: "1px solid white",
                                opacity: ".75",
                            }}
                            onClick={closeSideBar}>
                            <CloseIcon />
                        </IconButton>
                    )}
                </Box>

                <Box mb="16px" px="12px">
                    <Divider color="whitesmoke" />
                </Box>

                <Stack
                    px={"12px"}
                    sx={{
                        height: "calc(100% - 150px)",
                        overflowY: "auto",
                        overflowX: "hidden",
                        paddingInline:
                            !isMinScreen && isSideBarCollapsed ? "2px" : "12px",
                        transition: "padding 0.3s ease-in-out",
                        gap: "6px",
                    }}>
                    {SIDEBAR_ITEMS.map((item, index) => {
                        const { icon, label, path } = item;
                        return (
                            <CustomNavLink
                                key={index}
                                label={label}
                                Icon={icon}
                                path={path}
                            />
                        );
                    })}

                    <Box mt="12px" mb="16px" px="12px">
                        <Divider color="whitesmoke" />
                    </Box>

                    {SIDEBAR_ITEMS_2.map((item, index) => {
                        const { icon, label, path } = item;
                        return (
                            <CustomNavLink
                                key={index}
                                label={label}
                                Icon={icon}
                                path={path}
                            />
                        );
                    })}
                </Stack>
                <Box
                    sx={{
                        bottom: "12px",
                        marginInline:
                            !isMinScreen && isSideBarCollapsed ? "2px" : "12px",
                        transition: "margin .3s ease-in-out",

                        paddingInline: "6px",
                        paddingBlock: "2px",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        color: "white",
                        opacity: ".75",
                        "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.3)",
                            transition: "all .1s ease-in-out",
                            color: "white",
                            opacity: "1",
                        },
                    }}>
                    <IconButton disableRipple sx={{ color: "white" }}>
                        <LogoutIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "16px",
                            whiteSpace: "nowrap",
                            opacity: isSideBarCollapsed ? 0 : 1,
                            visibility: isSideBarCollapsed
                                ? "hidden"
                                : "visible",
                            transition: "all .3s ease-in-out",
                        }}>
                        Log out
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
function CustomNavLink({
    Icon,
    label,
    path,
}: {
    Icon: JSX.Element;
    label: string;
    path: string;
}) {
    const { isSideBarCollapsed } = useUIStore();
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === path;
    return (
        <Box
            onClick={() => navigate(path)}
            sx={{
                paddingInline: "6px",
                paddingBlock: "2px",
                // marginBottom: "12px",
                // height: "40px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                // border: "1px solid white",
                backgroundColor: isActive ? "#00ABFF" : "",
                borderRadius: "8px",
                cursor: "pointer",
                color: "white",
                opacity: isActive ? "1" : ".75",
                "&:hover": {
                    backgroundColor: "#00ABFF",
                    transition: "all .1s ease-in-out",
                    color: "white",
                    opacity: "1",
                },
            }}>
            <IconButton disableRipple sx={{ color: "white" }}>
                {Icon}
            </IconButton>

            <Typography
                variant="h6"
                sx={{
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                    opacity: isSideBarCollapsed ? 0 : 1,
                    visibility: isSideBarCollapsed ? "hidden" : "visible",
                    transition: "all .3s ease-in-out",
                }}>
                {label}
            </Typography>
        </Box>
    );
}
