import {
    useGetBookCatalogDetail,
    useSearchBookInInventory,
} from "@/services/react-query/queries";
import { Box, CircularProgress, Typography, Grid2 } from "@mui/material";
import { useParams } from "react-router-dom";
import BookInventoryCard from "./components/bookInventory-card";

export default function BookDetail() {
    const params = useParams();
    const bookId = params.bookId as string;
    const { isLoading: isBookDetailLoading, data: bookDetail } =
        useGetBookCatalogDetail(bookId);

    const { isLoading: isSearching, data: booksInventory } =
        useSearchBookInInventory(bookId);

    if (isBookDetailLoading || isSearching) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "50vh",
                }}>
                <CircularProgress />
            </Box>
        );
    }
    // If no book details are found
    if (!bookDetail) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "50vh",
                }}>
                <Typography variant="h5">Book Not Found</Typography>
            </Box>
        );
    }
    return (
        <Box
            sx={{
                padding: "20px",
                maxWidth: "1400px",
                marginInline: "auto",
            }}>
            {/* Book Details */}
            <Box mb={4}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    {bookDetail.title}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Author: {bookDetail.author}
                </Typography>
                <Typography variant="body1">
                    Category: {bookDetail.category}
                </Typography>
            </Box>

            {/* Inventory Grid */}
            <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    Available Inventory
                </Typography>

                {booksInventory && booksInventory.length > 0 ? (
                    <Grid2 container spacing={2}>
                        {booksInventory.map((book) => (
                            <Grid2
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 4,
                                }}
                                key={book.id}>
                                <BookInventoryCard book={book} />
                            </Grid2>
                        ))}
                    </Grid2>
                ) : (
                    <Typography>No inventory available</Typography>
                )}
            </Box>
        </Box>
    );
}
