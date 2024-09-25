import { Box } from "@mui/material";
import BookStatusTable from "./components/bookstatus-table";
export default function BookStatus() {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                overflowX: "hidden",
            }}>
            <BookStatusTable />
        </Box>
    );
}
