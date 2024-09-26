import { IOwner } from "@/types";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDeleteOwner } from "@/services/react-query/queries";
import { toast } from "react-toastify";
export default function OwnerActions({ owner }: { owner: IOwner }) {
    return (
        <>
            <Stack direction="row" spacing={2} justifyContent="center">
                <ViewOwner owner={owner} />
                <DeleteOwner owner={owner} />
            </Stack>
        </>
    );
}

function ViewOwner({ owner }: { owner: IOwner }) {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <>
            <IconButton size="small" onClick={() => setOpenDialog(true)}>
                <VisibilityIcon
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
                            label="Username"
                            value={owner.username}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                        <TextField
                            sx={{ fontSize: "12px", color: "black" }}
                            size="small"
                            label="Email"
                            value={owner.email}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                        <TextField
                            sx={{ fontSize: "12px", color: "black" }}
                            size="small"
                            label="Phone Number"
                            value={owner.phoneNumber}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                        <TextField
                            sx={{ fontSize: "12px", color: "black" }}
                            size="small"
                            label="Location"
                            value={owner.location}
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

function DeleteOwner({ owner }: { owner: IOwner }) {
    const [open, setOpen] = useState(false);

    const { mutateAsync, isPending } = useDeleteOwner();

    const handleOk = async () => {
        if (isPending) return;
        try {
            await mutateAsync(owner.id);
            toast.success("Owner deleted successfully");
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleCancel = () => {
        if (isPending) return;
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
                        disabled={isPending}
                        variant={"outlined"}
                        size="small"
                        color="warning"
                        autoFocus
                        onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        disabled={isPending}
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
