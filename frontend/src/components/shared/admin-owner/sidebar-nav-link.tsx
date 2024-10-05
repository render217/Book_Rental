import { Subjects } from "@/config/ability";
import { Can } from "@/context/ability-provider";
import { useAuth } from "@/context/auth-provider";
import useUIStore from "@/store/useUIStore";
import { INavItem } from "@/utils/constants";
import { Box, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const protectedPaths = ["/upload-book", "/owners", "/book-catalogs"];

export default function SideBarNavLink({
    icon: Icon,
    label,
    path,
    name,
}: INavItem) {
    const { isSideBarCollapsed, isMinScreen, closeSideBar } = useUIStore();
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === path;
    const { logOutUser } = useAuth();

    const handleClick = () => {
        if (name === "logout") {
            logOutUser();
            return;
        }
        navigate(path);
        if (isMinScreen) {
            closeSideBar();
        }
    };

    // Function to render the link content
    const renderNavLink = () => (
        <Box
            onClick={handleClick}
            sx={{
                paddingInline: "6px",
                paddingBlock: "2px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
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

    // check if the path is protected
    if (protectedPaths.includes(path)) {
        const subject = path.slice(1) as Subjects;

        return (
            <Can I="access-route" a={subject}>
                {renderNavLink()}
            </Can>
        );
    }

    return renderNavLink();
}
