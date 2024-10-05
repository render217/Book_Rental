import { useApproveOwner } from "@/services/react-query/queries";
import { handleError } from "@/utils/error-utils";
import { Button } from "@mui/material";

export default function OwnerApproveButton({
    ownerId,
    isApproved,
}: {
    ownerId: string;
    isApproved: boolean;
}) {
    const { mutateAsync, isPending } = useApproveOwner();

    const handleApprove = async () => {
        if (isPending) return;
        try {
            await mutateAsync(ownerId);
        } catch (error) {
            handleError(error);
        }
    };
    return (
        <>
            <Button
                disabled={isPending || isApproved}
                onClick={handleApprove}
                size={"small"}
                variant="contained"
                sx={{
                    fontSize: "14px",
                    marginInline: "center",
                }}>
                {isApproved ? "Approved" : "Approve"}
            </Button>
        </>
    );
}
