import { useUpdateBookCatalogStatus } from "@/services/react-query/queries";
import { ApprovalStatus_Enum } from "@/types";
import { Box, Switch, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import { handleError } from "@/utils/error-utils";
export default function StatusSwitch({
    bookId,
    status,
}: {
    bookId: string;
    status: ApprovalStatus_Enum;
}) {
    const { mutateAsync: updateStatus, isPending } =
        useUpdateBookCatalogStatus();
    const handleToggle = async () => {
        try {
            const res = await updateStatus(bookId);
            toast.success(res?.message || "Status Updated");
        } catch (error) {
            handleError(error);
        }
    };

    const isActive = status === ApprovalStatus_Enum.APPROVED;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                backgroundColor: isActive ? "#DAF2DA" : "#FFCCD9",
                borderRadius: "10px",
            }}>
            {isActive ? (
                <CheckIcon sx={{ color: "#008000", fontSize: "18px" }} />
            ) : (
                <ClearIcon sx={{ color: "#FF003F", fontSize: "18px" }} />
            )}

            <Typography
                sx={{
                    minWidth: "58px",
                    textAlign: "center",
                    fontSize: "14px",
                    color: isActive ? "#008000" : "#FF003F",
                }}>
                {isActive ? "Approved" : "Rejected"}
            </Typography>

            <Switch
                disabled={isPending}
                checked={isActive}
                onChange={handleToggle}
                color={isActive ? "success" : "warning"}
                size="small"
                inputProps={{ "aria-label": "controlled" }}
            />
        </Box>
    );
}
