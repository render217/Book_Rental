import { Box, Button, CircularProgress, Grid2, TextField } from "@mui/material";
import BookAutoCompeleteInput from "./book-autocomplete-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddBookInventory } from "@/services/react-query/queries";
import { toast } from "react-toastify";
import { handleError } from "@/utils/error-utils";

const bookSchema = z.object({
    id: z.string().min(1, "Please select a book"),
    pricePerDay: z.number().min(0.01, "Price must be greater than 0"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
});

export type BookInventoryFormType = z.infer<typeof bookSchema>;

export default function BookInventoryForm() {
    const form = useForm<BookInventoryFormType>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            id: "",
            pricePerDay: 0,
            quantity: 1,
        },
    });
    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors },
    } = form;

    const handleOnSelect = (id: string) => {
        setValue("id", id);
    };

    const { mutateAsync: addBookInventoryMutation, isPending } =
        useAddBookInventory();

    const onFormSubmission = async (data: BookInventoryFormType) => {
        const payload = {
            bookId: data.id,
            pricePerDay: data.pricePerDay,
            totalCopies: data.quantity,
        };

        try {
            const res = await addBookInventoryMutation(payload);
            setValue("id", "");
            reset();
            toast.success(res?.message || "book added successfully");
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Box>
            <form noValidate onSubmit={handleSubmit(onFormSubmission)}>
                <BookAutoCompeleteInput
                    onSelect={handleOnSelect}
                    // register={register}
                    error={errors.id}
                />
                <Box sx={{ minHeight: "100px", display: "block" }}></Box>
                <Grid2 container spacing={2}>
                    <Grid2
                        size={{
                            xs: 6,
                        }}>
                        <TextField
                            type={"number"}
                            fullWidth
                            size="small"
                            label="Book Quantity"
                            {...register("quantity", {
                                setValueAs: (value) => Number(value),
                            })}
                            error={!!errors.quantity}
                            helperText={errors.quantity?.message}
                        />
                    </Grid2>
                    <Grid2
                        size={{
                            xs: 6,
                        }}>
                        <TextField
                            type={"number"}
                            fullWidth
                            size="small"
                            label="Price Per Day"
                            {...register("pricePerDay", {
                                setValueAs: (value) => Number(value),
                            })}
                            error={!!errors.pricePerDay}
                            helperText={errors.pricePerDay?.message}
                        />
                    </Grid2>
                </Grid2>
                <Button
                    disabled={isPending}
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: "30px",
                        display: "block",
                        padding: "10px",
                        backgroundColor: "#00ABFF",
                        width: "100%",
                        marginInline: "auto",
                    }}>
                    {isPending ? (
                        <CircularProgress color="inherit" size={16} />
                    ) : (
                        "Submit"
                    )}
                </Button>
            </form>
        </Box>
    );
}
