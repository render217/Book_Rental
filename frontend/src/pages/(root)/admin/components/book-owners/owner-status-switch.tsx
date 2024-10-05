import { useActivateDeactivateOwner } from "@/services/react-query/queries";
import { OwnerStatus_Enum } from "@/types";
import { Box, Switch, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { handleError } from "@/utils/error-utils";
import { toast } from "react-toastify";
export default function OwnerStatusSwitch({
    ownerId,
    status,
}: {
    ownerId: string;
    status: OwnerStatus_Enum;
}) {
    const { mutateAsync: updateStatus, isPending } =
        useActivateDeactivateOwner();

    const isActive = status === OwnerStatus_Enum.ACTIVE;

    const handleToggle = async () => {
        try {
            await updateStatus(ownerId);
            const msg = isActive ? "disabled" : "activated";
            toast.success(`Owner is ${msg} successfully`);
        } catch (error) {
            handleError(error);
        }
    };

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
                {isActive ? "Active" : "Disabled"}
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
