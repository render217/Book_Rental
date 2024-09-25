import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    TextField,
    Typography,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateBookCatalog } from "@/services/react-query/queries";
import { useState } from "react";

const CATEGORIES = [
    "Self-help",
    "Fiction",
    "Non-Fiction",
    "Business",
    "Biography",
    "Programming",
] as const;

const bookSchema = z.object({
    title: z.string().min(2, "Book title must be at least 2 characters long"),
    author: z.string().min(5, "Book Author must be at least 5 characters long"),
    category: z.enum(CATEGORIES, {
        errorMap: () => ({ message: "Please select a valid category" }),
    }),
});

type BookForm = z.infer<typeof bookSchema>;

export default function BookCatalogForm({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const form = useForm<BookForm>({
        resolver: zodResolver(bookSchema),
    });

    const { register, formState, handleSubmit, setValue } = form;
    const { errors } = formState;

    const { mutateAsync: createBookMutaion, isPending } =
        useCreateBookCatalog();
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const handleAddNewBook = async (data: BookForm) => {
        if (isPending) return;
        const payload = {
            title: data.title,
            author: data.author,
            category: data.category.toLowerCase(),
        };
        try {
            await createBookMutaion(payload);
            onClose(); // closes the form dialog
            setOpenSuccessDialog(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Box sx={{ cursor: "pointer" }}>
                <Dialog open={open} onClose={onClose}>
                    <DialogTitle>Add New Book</DialogTitle>
                    <DialogContent>
                        <form
                            noValidate
                            onSubmit={handleSubmit(handleAddNewBook)}>
                            <Box sx={{ maxWidth: "350px" }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Book Name"
                                    variant="filled"
                                    {...register("title")}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                    sx={{ marginBottom: "10px" }}
                                    disabled={isPending}
                                />
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Book Author"
                                    variant="filled"
                                    {...register("author")}
                                    error={!!errors.author}
                                    helperText={errors.author?.message}
                                    sx={{ marginBottom: "10px" }}
                                    disabled={isPending}
                                />

                                {/* Category Select */}
                                <FormControl
                                    fullWidth
                                    size="small"
                                    variant="filled"
                                    sx={{ marginBottom: "10px" }}
                                    disabled={isPending}
                                    error={!!errors.category}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        {...register("category")}
                                        onChange={(e) =>
                                            setValue(
                                                "category",
                                                e.target
                                                    .value as (typeof CATEGORIES)[number]
                                            )
                                        }
                                        defaultValue="">
                                        {CATEGORIES.map((category) => (
                                            <MenuItem
                                                key={category}
                                                value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.category && (
                                        <Typography
                                            variant="caption"
                                            color="error"
                                            sx={{ mt: 1 }}>
                                            {errors.category?.message}
                                        </Typography>
                                    )}
                                </FormControl>
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
                                Add
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Box>
            <SuccessDialog
                openSuccessDialog={openSuccessDialog}
                closeSuccessDialog={() => setOpenSuccessDialog(false)}
            />
        </>
    );
}
const success_svg = "/assets/svg/success_dialog.svg";
function SuccessDialog({
    openSuccessDialog,
    closeSuccessDialog,
}: {
    openSuccessDialog: boolean;
    closeSuccessDialog: () => void;
}) {
    return (
        <Dialog open={openSuccessDialog} onClose={closeSuccessDialog}>
            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                    <img src={success_svg} />
                </Box>
                <Typography
                    variant="body2"
                    marginBlock={"10px"}
                    textAlign="center">
                    Your have uploaded the book successfully. Wait until admin
                    approved it.
                </Typography>
                <Button
                    onClick={closeSuccessDialog}
                    variant="contained"
                    sx={{
                        backgroundColor: "#00ABFF",
                        display: "block",
                        marginInline: "auto",
                    }}>
                    ok
                </Button>
            </DialogContent>
        </Dialog>
    );
}
