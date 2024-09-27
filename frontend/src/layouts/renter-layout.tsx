import NavBar from "@/components/shared/renter/navbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
export default function RenterLayout() {
    return (
        <Box>
            <NavBar />
            <Box
                component={"main"}
                sx={{
                    marginTop: "20px",
                }}>
                <Outlet />
            </Box>
        </Box>
    );
}
