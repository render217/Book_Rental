import { Box } from "@mui/material";
export default function EarningSummary() {
    return (
        <Box sx={{ backgroundColor: "white" }}>
            <Box>Earning status</Box>
            {[...new Array(10)].map((_, idx) => {
                return <p key={idx}>Lorem ipsum dolor sit.</p>;
            })}
        </Box>
    );
}
