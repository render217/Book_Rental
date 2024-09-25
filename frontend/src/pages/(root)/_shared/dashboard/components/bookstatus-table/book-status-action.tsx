/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBookStatus } from "@/types";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function BookStatusAction({ book }: { book: IBookStatus }) {
    return (
        <>
            <Stack direction="row" spacing={2} justifyContent="center">
                <EditBook book={book} />
                <DeleteBook book={book} />
            </Stack>
        </>
    );
}

function EditBook({ book }: { book: IBookStatus }) {
    const [openDialog, setOpenDialog] = useState(false);
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
                    <Stack spacing={2}>
                        <TextField
                            sx={{ fontSize: "12px", color: "black" }}
                            size="small"
                            label="Book Title"
                            value={book.title}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
}

function DeleteBook({ book }: { book: IBookStatus }) {
    const [open, setOpen] = useState(false);

    const handleOk = async () => {
        try {
            // await mutateAsync(owner.id);
            // toast.success("Owner deleted successfully");
            // setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };
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
                <DialogTitle>Are you sure you want to delete</DialogTitle>

                <DialogActions>
                    <Button
                        variant={"outlined"}
                        size="small"
                        color="warning"
                        autoFocus
                        onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        size="small"
                        variant={"outlined"}
                        onClick={handleOk}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
