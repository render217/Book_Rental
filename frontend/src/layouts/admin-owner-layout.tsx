import useUIStore from "@/store/useUIStore";
import SideBarProvider from "@/context/sidebar-context";
import { Box } from "@mui/material";
import { Navbar, Sidebar } from "@/components/shared/admin-owner";
import { Outlet } from "react-router-dom";
export default function AdminOwnerLayout() {
    const { isSideBarCollapsed, isMinScreen } = useUIStore();
    return (
        <SideBarProvider>
            <Box
                display="flex"
                flexDirection={"row"}
                minHeight={"100vh"}
                sx={{
                    backgroundColor: "#f0f2ff",
                }}>
                {/* ===========================
                        Sidebar
                    ==========================*/}
                <Sidebar />

                {/* ===========================
                        Main Content Wrapper
                    ==========================*/}
                <Box
                    sx={{
                        width: "100%",
                        marginLeft:
                            !isMinScreen && isSideBarCollapsed
                                ? "78px"
                                : !isMinScreen && !isSideBarCollapsed
                                ? "262px"
                                : "8px",
                        transition: "margin 300ms ease-in-out",
                    }}>
                    {/* ========================
                            Main Content
                        ======================*/}
                    <Box width="100%" height="100%" paddingRight="8px">
                        <Navbar />
                        <Box
                            component={"main"}
                            sx={{
                                minHeight: "calc(100vh - 95px)",
                                maxWidth: "1500px",
                                marginInline: "auto",
                            }}>
                            <Outlet />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </SideBarProvider>
    );
}
