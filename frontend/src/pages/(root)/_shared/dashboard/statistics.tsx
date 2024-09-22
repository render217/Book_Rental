import { Box, Typography } from "@mui/material";
import Revenue from "./revenue";
import AvaliableBooks from "./avaliable-books";
export default function Statistics() {
    return (
        <Box sx={{ backgroundColor: "white" }}>
            <Box>
                <Typography variant="h4">This Month Statistics</Typography>
                <Typography variant="subtitle1">
                    Tue, 14 Nov, 2024, 11.30 AM
                </Typography>
            </Box>
            <Box>
                <Revenue />
                <AvaliableBooks />
                {[...new Array(100)].map((_, idx) => {
                    return <p key={idx}>Lorem ipsum dolor sit.</p>;
                })}
            </Box>
        </Box>
    );
}
