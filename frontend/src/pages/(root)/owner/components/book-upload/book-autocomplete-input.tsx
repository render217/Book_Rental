/* eslint-disable @typescript-eslint/no-unused-vars */
import { useBooksCatalog } from "@/services/react-query/queries";
import {
    Box,
    Autocomplete,
    TextField,
    Paper,
    Typography,
    Divider,
    Button,
    Dialog,
    DialogContent,
} from "@mui/material";
import BookCatalogForm from "./book-catalog-form";
import { useState } from "react";
import { BookInventoryFormType } from "./book-inventory-form";
import { useForm, UseFormRegister } from "react-hook-form";
export default function BookAutoCompeleteInput({
    onSelect,
    error,
    register,
}: {
    onSelect: (value: string) => void;
    error?: { message?: string };
    register: UseFormRegister<{
        id: string;
        pricePerDay: number;
        quantity: number;
    }>;
}) {
    const [open, setOpen] = useState(false);
    const { data } = useBooksCatalog();

    const booksCatalogData = data ?? [];

    return (
        <>
            <Autocomplete
                options={booksCatalogData}
                getOptionLabel={(option) => option.title}
                onChange={(_, value) => {
                    if (value) {
                        onSelect(value.id);
                    }
                }}
                renderOption={(props, option) => (
                    <li {...props}>
                        <Typography sx={{ fontSize: "12px" }}>
                            {option.title}
                        </Typography>
                    </li>
                )}
                renderInput={({ size: _, ...params }) => (
                    <TextField
                        size="small"
                        sx={{ fontSize: "12px" }}
                        {...params}
                        // {...register("id", {
                        //     setValueAs: (value) => value,
                        // })}
                        error={!!error}
                        helperText={error?.message}
                        label="Select an option"
                        variant="outlined"
                    />
                )}
                PaperComponent={(props) => (
                    <Paper
                        {...props}
                        sx={{ boxShadow: 3 }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}>
                        {props.children}
                        <Divider sx={{ margin: "4px 0" }} />

                        <Box sx={{ padding: "10px", cursor: "pointer" }}>
                            <Button
                                onClick={() => setOpen(true)}
                                sx={{
                                    width: "200px",
                                    display: "block",
                                    marginInline: "auto",
                                }}
                                variant="outlined"
                                size="small">
                                Add New
                            </Button>
                        </Box>
                    </Paper>
                )}
            />
            <BookCatalogForm open={open} onClose={() => setOpen(false)} />
        </>
    );
}
