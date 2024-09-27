import { Box, Typography, Paper } from "@mui/material";
import BookRent from "./book-rent";
type BookInventoryCardProps = {
    book: {
        id: string;
        title: string;
        availableCopies: number;
        pricePerDay: number;
        owner: {
            username: string;
            location: string;
            phoneNumber: string;
        };
    };
};
export default function BookInventoryCard({ book }: BookInventoryCardProps) {
    return (
        <Paper
            sx={{
                padding: "16px",
                border: "1px solid #e0e0e0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                transition: "transform 0.2s ease-in-out",
            }}>
            {/* Available Copies and Price Per Day Section */}
            <Box
                sx={{
                    backgroundColor: "#f9f9f9",
                    padding: "12px",
                    borderRadius: "6px",
                    mt: 2,
                    border: "1px solid #e0e0e0",
                }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#555",
                        mb: 1,
                    }}>
                    Inventory Information
                </Typography>
                {/* Available Copies */}
                <Typography
                    variant="body2"
                    sx={{
                        color: "#3f51b5",
                    }}>
                    Available Copies:{" "}
                    <span
                        style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "#1e88e5",
                        }}>
                        {book.availableCopies}
                    </span>
                </Typography>

                {/* Price Per Day */}
                <Typography
                    variant="body2"
                    sx={{
                        color: "#f57c00",
                    }}>
                    Price Per Day:{" "}
                    <span
                        style={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            color: "#fb8c00",
                        }}>
                        ${book.pricePerDay}
                    </span>
                </Typography>
            </Box>

            {/* Owner Details */}
            <Box
                sx={{
                    backgroundColor: "#f9f9f9",
                    padding: "12px",
                    borderRadius: "6px",
                    mt: 2,
                    border: "1px solid #e0e0e0",
                }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#555",
                        mb: 1,
                    }}>
                    Owner Information
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#424242",
                        mb: 0.5,
                    }}>
                    Username:{" "}
                    <span style={{ fontWeight: "bold", color: "#333" }}>
                        {book.owner.username}
                    </span>
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#424242",
                        mb: 0.5,
                    }}>
                    Location:{" "}
                    <span style={{ fontWeight: "bold", color: "#333" }}>
                        {book.owner.location}
                    </span>
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#424242",
                    }}>
                    Phone:{" "}
                    <span style={{ fontWeight: "bold", color: "#333" }}>
                        {book.owner.phoneNumber}
                    </span>
                </Typography>
            </Box>

            {/* Rent Book Button */}
            <BookRent book={book} />
        </Paper>
    );
}
