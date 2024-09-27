import {
    useGetRentalHistory,
    useReturnRentalBook,
} from "@/services/react-query/queries";
import { RentalStatus_Enum } from "@/types";
import { handleError } from "@/utils/error-utils";

import {
    Box,
    CircularProgress,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid2,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
export default function Rentals() {
    const [clickedId, setClickedId] = useState("");
    const { data, isLoading } = useGetRentalHistory();

    const { mutateAsync: returnBookMutation, isPending } =
        useReturnRentalBook();

    if (isLoading) {
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
    // if empty rentals history
    if (!data) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "50vh",
                }}>
                <Typography variant="h5">No Rental History</Typography>
            </Box>
        );
    }
    // if empty rentals history
    if (data && data?.length === 0) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "50vh",
                }}>
                <Typography variant="h5">No Rental History</Typography>
            </Box>
        );
    }

    const handleReturnBook = async (id: string) => {
        if (isPending) return;
        try {
            setClickedId(id);
            await returnBookMutation(id);
            toast.success("Book returned successfully");
            setClickedId("");
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            <Typography variant="h4" gutterBottom>
                Rental History
            </Typography>

            <Grid2 container spacing={4}>
                {data.map((rental) => (
                    <Grid2
                        size={{
                            xs: 12,
                            sm: 6,
                        }}
                        key={rental.rentalId}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                borderRadius: "10px",
                                backgroundColor: "#f9f9f9",
                                position: "relative",
                            }}>
                            <CardContent>
                                <Box
                                    sx={{
                                        padding: "12px",
                                        border: "1px solid #e0e0e0",
                                        backgroundColor: "#f9f9f9",
                                        marginBottom: "5px",
                                    }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#555",
                                            mb: 1,
                                        }}>
                                        Book Information
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary">
                                        Title: {rental.book.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary">
                                        Author: {rental.book.author}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary">
                                        Category: {rental.book.category}
                                    </Typography>
                                </Box>
                                <Grid2
                                    container
                                    spacing={4}
                                    sx={{
                                        padding: "4px",
                                        borderRadius: "6px",
                                        // border: "1px solid #e0e0e0",
                                    }}>
                                    {/* Rental Information */}
                                    <Grid2
                                        size={{
                                            xs: 12,
                                            md: 6,
                                        }}>
                                        <Box
                                            sx={{
                                                backgroundColor: "#f9f9f9",
                                                padding: "12px",
                                                borderRadius: "6px",
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
                                                Rental Information
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#3f51b5",
                                                }}>
                                                Rented Copies:{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "16px",
                                                        color: "#1e88e5",
                                                    }}>
                                                    {rental.rentedCopies}
                                                </span>
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#f57c00",
                                                }}>
                                                Total Days:{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "16px",
                                                        color: "#fb8c00",
                                                    }}>
                                                    {rental.totalDays}
                                                </span>
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#43a047",
                                                }}>
                                                Total Price:{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "16px",
                                                        color: "#43a047",
                                                    }}>
                                                    ${rental.totalPrice}
                                                </span>
                                            </Typography>
                                            <Typography variant="body2">
                                                Start Date:{" "}
                                                {new Date(
                                                    rental.rentalStartDate
                                                ).toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="body2">
                                                End Date:{" "}
                                                {new Date(
                                                    rental.rentalEndDate
                                                ).toLocaleDateString()}
                                            </Typography>
                                            {rental.returnDate && (
                                                <Typography variant="body2">
                                                    Return Date:{" "}
                                                    {new Date(
                                                        rental.returnDate
                                                    ).toLocaleDateString()}
                                                </Typography>
                                            )}
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color:
                                                        rental.status ===
                                                        RentalStatus_Enum.RENTED
                                                            ? "#f57c00"
                                                            : "#43a047",
                                                    fontWeight: "bold",
                                                    mt: 1,
                                                }}>
                                                Status: {rental.status}
                                            </Typography>
                                        </Box>
                                    </Grid2>
                                    {/* Owner Information */}
                                    <Grid2
                                        size={{
                                            xs: 12,
                                            md: 6,
                                        }}>
                                        <Box
                                            sx={{
                                                backgroundColor: "#f9f9f9",
                                                padding: "12px",
                                                borderRadius: "6px",

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
                                            <Typography variant="body2">
                                                Username:{" "}
                                                {rental.owner.username}
                                            </Typography>
                                            <Typography variant="body2">
                                                Location:{" "}
                                                {rental.owner.location}
                                            </Typography>
                                            <Typography variant="body2">
                                                Phone:{" "}
                                                {rental.owner.phoneNumber}
                                            </Typography>
                                            <Typography variant="body2">
                                                Email: {rental.owner.email}
                                            </Typography>
                                        </Box>
                                    </Grid2>
                                </Grid2>
                            </CardContent>

                            <CardActions
                                sx={{
                                    paddingBottom: "16px",
                                    paddingInline: "18px",
                                }}>
                                {rental.status === RentalStatus_Enum.RENTED && (
                                    <Button
                                        disabled={
                                            isPending &&
                                            rental.rentalId === clickedId
                                        }
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            handleReturnBook(rental.rentalId)
                                        }>
                                        Return Book
                                    </Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
}
