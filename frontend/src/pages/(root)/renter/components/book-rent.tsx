import {
    Dialog,
    Box,
    DialogContent,
    Button,
    TextField,
    DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleError } from "@/utils/error-utils";
import { useAddRentBook } from "@/services/react-query/queries";
import { toast } from "react-toastify";
type BookRentProps = {
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

// Modify the schema to check if the quantity exceeds availableCopies
const rentBookSchema = (availableCopies: number) =>
    z.object({
        quantity: z
            .number()
            .min(1, "Quantity must be at least 1")
            .refine((val) => val <= availableCopies, {
                message: `There are only ${availableCopies} book in inventory try less number.`,
            }),
        noOfDays: z.number().min(1, "Number of days must be at least 1"),
    });
type RentBookForm = z.infer<ReturnType<typeof rentBookSchema>>;

export default function BookRent({ book }: BookRentProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    // form for rentboook
    const form = useForm<RentBookForm>({
        resolver: zodResolver(rentBookSchema(book.availableCopies)),
        defaultValues: {
            quantity: 1,
            noOfDays: 1,
        },
    });
    const {
        watch,
        handleSubmit,
        register,
        formState: { errors },
    } = form;

    // request to rent a book

    const watchNoOfDays = watch("noOfDays");
    const watchQuantity = watch("quantity");

    const totalPrice = watchNoOfDays * watchQuantity * book.pricePerDay;

    const { mutateAsync: addRentMutation, isPending } = useAddRentBook();

    const handleRentSubmission = async (values: RentBookForm) => {
        const payload = {
            bookInventoryId: book.id,
            noOfDays: values.noOfDays,
            quantity: values.quantity,
        };
        try {
            await addRentMutation(payload);
            toast.success("Book Rented Successfully");
            handleClose();
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <>
            <Box onClick={handleOpen} mt={3} textAlign="center">
                <button
                    style={{
                        backgroundColor: "#4caf50",
                        color: "white",
                        padding: "10px 16px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#43a047")
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#4caf50")
                    }>
                    Rent Book
                </button>
            </Box>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>
                    Please fill the following details to rent
                </DialogTitle>
                <DialogContent>
                    <form
                        noValidate
                        onSubmit={handleSubmit(handleRentSubmission)}>
                        <Box sx={{ maxWidth: "350px", mt: "10px" }}>
                            <TextField
                                fullWidth
                                size="small"
                                type="number"
                                label="Number of Quantity to Rent"
                                variant="outlined"
                                {...register("quantity", {
                                    setValueAs: (value) => Number(value),
                                })}
                                error={!!errors.quantity}
                                helperText={errors.quantity?.message}
                                sx={{ marginBottom: "15px" }}
                                disabled={isPending}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                label="Number of Days to Rent For"
                                type="number"
                                variant="outlined"
                                {...register("noOfDays", {
                                    setValueAs: (value) => Number(value),
                                })}
                                error={!!errors.noOfDays}
                                helperText={errors.noOfDays?.message}
                                sx={{ marginBottom: "15px" }}
                                disabled={isPending}
                            />
                            <TextField
                                fullWidth
                                disabled={true}
                                size="small"
                                label="Total Price of purchase"
                                type="number"
                                variant="standard"
                                value={totalPrice}
                                helperText={`Total Price = Price / Day(${book.pricePerDay}) * quantity * totalDays`}
                                sx={{ marginBottom: "10px" }}
                            />
                        </Box>
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: "10px",
                                backgroundColor: "#00ABFF",
                                width: "100%",
                                display: "block",
                                marginInline: "auto",
                                py: "12px",
                            }}>
                            Rent Book
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
