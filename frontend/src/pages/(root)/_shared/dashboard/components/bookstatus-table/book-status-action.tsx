import { IBookStatus, Role_Enum } from "@/types";
import {
    Button,
    Dialog,
    DialogContent,
    FormControlLabel,
    Grid2,
    IconButton,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
    useRemoveBookFromInventory,
    useUpdateBookInventory,
} from "@/services/react-query/queries";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { handleError } from "@/utils/error-utils";
import { useAuth } from "@/context/auth-provider";
export default function BookStatusAction({ book }: { book: IBookStatus }) {
    const { user } = useAuth();
    if (user.role === Role_Enum.ADMIN) {
        return null;
    }
    return (
        <>
            <Stack direction="row" spacing={2} justifyContent="center">
                <EditBook book={book} />
                <DeleteBook book={book} />
            </Stack>
        </>
    );
}

const bookUpdateSchema = z.object({
    pricePerDay: z.number().min(0.01, "Price must be greater than 0"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
});

type BookUpateFormType = z.infer<typeof bookUpdateSchema>;

function EditBook({ book }: { book: IBookStatus }) {
    const form = useForm<BookUpateFormType>({
        resolver: zodResolver(bookUpdateSchema),
        defaultValues: {
            quantity: 1,
            pricePerDay: 0,
        },
    });
    const {
        handleSubmit,
        register,

        formState: { errors },
    } = form;

    const [openDialog, setOpenDialog] = useState(false);
    const { mutateAsync: updateBookInventoryMutation } =
        useUpdateBookInventory();

    const handleUpdate = async (data: BookUpateFormType) => {
        try {
            const payload = {
                pricePerDay: data.pricePerDay,
                noOfCopies: data.quantity,
            };
            console.log(typeof data.pricePerDay);
            const res = await updateBookInventoryMutation({
                id: book.id,
                payload,
            });
            toast.success(res?.message || "Book updated successfully");
            setOpenDialog(false);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <>
            <IconButton size="small" onClick={() => setOpenDialog(true)}>
                <EditIcon
                    sx={{
                        fontSize: "21px",
                        cursor: "pointer",
                    }}
                />
            </IconButton>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                {/* <DialogTitle>Hello</DialogTitle> */}
                <DialogContent
                    sx={{
                        padding: "20px",
                        minWidth: "400px",
                        minHeight: "200px",
                    }}>
                    <Typography
                        variant="h6"
                        mb={4}
                        sx={{ textAlign: "center" }}>
                        Update Book
                    </Typography>
                    <form noValidate onSubmit={handleSubmit(handleUpdate)}>
                        <Grid2 container spacing={2}>
                            <Grid2
                                size={{
                                    xs: 6,
                                }}>
                                <TextField
                                    type={"number"}
                                    fullWidth
                                    size="small"
                                    label="New Quantity to add"
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
                                    label="New Price per day"
                                    {...register("pricePerDay", {
                                        setValueAs: (value) => Number(value),
                                    })}
                                    error={!!errors.pricePerDay}
                                    helperText={errors.pricePerDay?.message}
                                />
                            </Grid2>
                        </Grid2>
                        <Button
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
                            Update
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

const bookDeleteSchema = z
    .object({
        allCopies: z.boolean().optional(),
        quantity: z.number(),
    })
    .superRefine((values, ctx) => {
        if (values.allCopies === false && values.quantity < 1) {
            ctx.addIssue({
                message: "Quantity must be at least 1",
                path: ["quantity"],
                code: "invalid_type",
                expected: "number",
                received: typeof values.quantity,
            });
        }
    });

type BookDeleteFormType = z.infer<typeof bookDeleteSchema>;
function DeleteBook({ book }: { book: IBookStatus }) {
    const [open, setOpen] = useState(false);
    const handleCancel = () => setOpen(false);
    const form = useForm<BookDeleteFormType>({
        resolver: zodResolver(bookDeleteSchema),
        defaultValues: {
            allCopies: false,
            quantity: 1,
        },
    });

    const {
        setValue,
        watch,
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = form;

    const { mutateAsync: removeBookMutation, isPending } =
        useRemoveBookFromInventory();

    const handleDeleteSubmit = async (values: BookDeleteFormType) => {
        if (isPending) return;
        const payload = {
            allCopies: values.allCopies,
            noOfCopiesToRemove: values.quantity,
        };
        try {
            const res = await removeBookMutation({
                id: book.id,
                payload,
            });
            if (res?.message) {
                toast.success(res?.message);
                setOpen(false);
                reset();
            }
        } catch (error) {
            handleError(error);
        }
    };
    const allCopies = watch("allCopies");
    return (
        <>
            <IconButton size="small" onClick={() => setOpen(true)}>
                <DeleteIcon
                    sx={{
                        fontSize: "21px",
                        cursor: "pointer",
                        color: "#FF0000",
                    }}
                />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent
                    sx={{
                        padding: "20px",
                        minWidth: "400px",
                        minHeight: "200px",
                    }}>
                    <Typography
                        variant="h6"
                        mb={4}
                        sx={{ textAlign: "center" }}>
                        Choose the quantity to remove
                    </Typography>
                    <form
                        noValidate
                        onSubmit={handleSubmit(handleDeleteSubmit)}>
                        <Grid2 container spacing={2}>
                            <Grid2
                                size={{
                                    xs: 6,
                                }}>
                                <TextField
                                    disabled={allCopies}
                                    type={"number"}
                                    fullWidth
                                    size="small"
                                    label="Quantity to remove"
                                    {...register("quantity", {
                                        setValueAs: (value) => Number(value),
                                    })}
                                    error={!!errors.quantity}
                                    // helperText={errors.quantity?.message}
                                    helperText={errors.quantity?.message}
                                />
                            </Grid2>
                            <Grid2
                                size={{
                                    xs: 6,
                                }}>
                                <FormControlLabel
                                    label="Delete all copies?"
                                    control={
                                        <Controller
                                            control={control}
                                            name="allCopies"
                                            render={({ field }) => (
                                                <Switch
                                                    checked={
                                                        field.value || false
                                                    }
                                                    onChange={(e) => {
                                                        field.onChange(
                                                            e.target.checked
                                                        );
                                                        if (e.target.checked) {
                                                            setValue(
                                                                "quantity",
                                                                0
                                                            );
                                                        }
                                                    }}
                                                    color="primary"
                                                />
                                            )}
                                        />
                                    }
                                />
                            </Grid2>
                        </Grid2>
                        <Stack
                            direction="row"
                            sx={{
                                mt: "30px",
                                justifyContent: "center",
                                gap: "20px",
                            }}>
                            <Button
                                onClick={handleCancel}
                                sx={{
                                    padding: "5px",
                                    width: "200px",
                                }}
                                variant="outlined"
                                color="warning">
                                Cancel
                            </Button>
                            <Button
                                disabled={isPending}
                                type="submit"
                                variant="contained"
                                sx={{
                                    padding: "5px",
                                    backgroundColor: "#00ABFF",
                                    width: "200px",
                                }}>
                                Procceed
                            </Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
