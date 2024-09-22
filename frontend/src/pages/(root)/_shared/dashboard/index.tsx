import { Grid2 } from "@mui/material";
import Statistics from "./statistics";
import BookStatus from "./book-status";
import EarningSummary from "./earning-summary";
export default function Dashboard() {
    return (
        <Grid2
            container
            sx={{
                minHeight: "calc(100vh - 95px)",
                width: "100%",
                gap: "10px",
                display: "grid",
                gridTemplateAreas: {
                    xs: `
                            "bookstatus"
                            "statistics"
                            "earning"`,
                    lg: `
                        "statistics bookstatus bookstatus"
                        "statistics bookstatus bookstatus"
                        "statistics earning earning"`,
                },
                gridTemplateColumns: {
                    xs: "1fr",
                    lg: "repeat(3, 1fr)",
                },
            }}>
            <Grid2
                sx={{
                    backgroundColor: "white",
                    gridArea: "statistics",
                    height: {
                        xs: "auto",
                        lg: "calc(100vh - 95px)",
                    },
                    overflowY: "auto",
                }}>
                <Statistics />
            </Grid2>
            <Grid2
                sx={{
                    backgroundColor: "white",
                    gridArea: "bookstatus",
                    height: {
                        xs: "auto",
                        lg: "calc((100vh - 95px) * 3 / 5)",
                    },
                    overflowY: "auto",
                }}>
                <BookStatus />
            </Grid2>
            <Grid2
                sx={{
                    backgroundColor: "white",
                    gridArea: "earning",
                    height: {
                        xs: "auto",
                        lg: "calc((100vh - 95px) * 2 / 5 - 10px)",
                    },
                    overflowY: "auto",
                }}>
                <EarningSummary />
            </Grid2>
        </Grid2>
    );
}
