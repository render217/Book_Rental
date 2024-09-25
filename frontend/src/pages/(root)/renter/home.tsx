import { useAuth } from "@/context/auth-provider";
import { useBooksCatalog } from "@/services/react-query/queries";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid2,
    AppBar,
    Toolbar,
} from "@mui/material";
import BookCard from "./components/book-card";
import BookSkeleton from "./components/book-card-skeleton";

const bookRentalLogo = "/assets/svg/rental_logo.svg";

export default function Home() {
    const { logOutUser } = useAuth();
    const { data, isLoading } = useBooksCatalog();

    const booksData = data || [];

    return (
        <Box>
            <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
                <Toolbar>
                    <img
                        src={bookRentalLogo}
                        alt="Book Rental Logo"
                        style={{ height: "50px", marginRight: "16px" }}
                    />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Book Rental
                    </Typography>
                    <Button color="inherit">My Rentals</Button>
                    <Button color="inherit" onClick={logOutUser}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Search Input */}
            <Box sx={{ padding: "40px", textAlign: "center" }}>
                <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Search by name, category"
                    fullWidth
                    sx={{ maxWidth: "600px" }}
                />
            </Box>

            {isLoading ? (
                <BookSkeleton />
            ) : (
                <Grid2
                    container
                    spacing={3}
                    sx={{
                        padding: "20px",
                        maxWidth: "1400px",
                        marginInline: "auto",
                    }}>
                    {booksData &&
                        booksData.map((book, index) => {
                            return (
                                <Grid2
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                        md: 4,
                                    }}
                                    key={index}>
                                    <BookCard key={index} {...book} />
                                </Grid2>
                            );
                        })}
                </Grid2>
            )}
        </Box>
    );
}
