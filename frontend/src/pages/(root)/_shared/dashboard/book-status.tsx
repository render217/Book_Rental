import { Box } from "@mui/material";
export default function BookStatus() {
    return (
        <Box sx={{ backgroundColor: "white" }}>
            <Box>Book status</Box>
            {[...new Array(10)].map((_, idx) => {
                return <p key={idx}>Lorem ipsum dolor sit.</p>;
            })}
        </Box>
    );
}
