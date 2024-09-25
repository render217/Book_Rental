import { useActivateDeactivateOwner } from "@/services/react-query/queries";
import { OwnerStatus_Enum } from "@/types";
import { Box, Switch, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
export default function OwnerStatusSwitch({
    ownerId,
    status,
}: {
    ownerId: string;
    status: OwnerStatus_Enum;
}) {
    const { mutateAsync: updateStatus, isPending } =
        useActivateDeactivateOwner();
    const handleToggle = async () => {
        await updateStatus(ownerId);
    };

    const isActive = status === OwnerStatus_Enum.ACTIVE;

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
                {isActive ? "Active" : "Deactive"}
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
