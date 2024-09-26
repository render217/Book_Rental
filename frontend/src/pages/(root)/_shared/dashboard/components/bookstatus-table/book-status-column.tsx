import { createMRTColumnHelper } from "material-react-table";

import { Box, Typography } from "@mui/material";
import { IBookStatus, Role_Enum } from "@/types";
import BookStatusAction from "./book-status-action";
import { useAuth } from "@/context/auth-provider";
// import VisibilityIcon from "@mui/icons-material/Visibility";

const columnHelper = createMRTColumnHelper<IBookStatus>();

export const bookStatusColumns = [
    columnHelper.display({
        header: "No",
        size: 10,
        enableGlobalFilter: false,
        muiTableHeadCellProps: {
            align: "center",
        },
        muiTableBodyCellProps: {
            align: "center",
        },
        Cell: ({ row }) => {
            return (
                <Typography sx={{ textAlign: "cent" }}>
                    {row.index + 1}
                </Typography>
            );
        },
    }),
    columnHelper.accessor("owner.username", {
        header: "Owner",
        size: 10,
        Cell: ({ row }) => {
            return <OwnerColumnName ownerName={row.original.owner.username} />;
        },
    }),

    columnHelper.accessor("title", {
        header: "Book Name",
        size: 10,
        Cell: ({ row }) => {
            const trimmedName =
                row.original.title.length > 20
                    ? row.original.title.slice(0, 20) + "..."
                    : row.original.title;
            return (
                <Typography sx={{ fontSize: "14px" }}>{trimmedName}</Typography>
            );
        },
    }),
    columnHelper.accessor("totalCopies", {
        header: "Total",
        size: 10,
        Cell: ({ row }) => {
            return (
                <Typography sx={{ fontSize: "14px" }}>
                    {row.original.totalCopies}
                </Typography>
            );
        },
    }),
    columnHelper.accessor("availableCopies", {
        header: "Avaliable",
        size: 5,
        Cell: ({ row }) => {
            const value = row.original.availableCopies;
            const color = "#00ABFF";
            return (
                <Box
                    sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <CircleWithDot color={color} size={18} />
                    <Typography sx={{ fontSize: "14px" }}>
                        {value} Free
                    </Typography>
                </Box>
            );
        },
    }),
    columnHelper.accessor("rentedCopies", {
        header: "Rented",
        size: 5,

        Cell: ({ row }) => {
            const color = "#FF0000";
            const value = row.original.rentedCopies;
            return (
                <Box
                    sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <CircleWithDot color={color} size={18} />
                    <Typography sx={{ fontSize: "14px" }}>
                        {value} Rented
                    </Typography>
                </Box>
            );
        },
    }),
    columnHelper.accessor("pricePerDay", {
        header: "Price/Day",
        size: 5,
        Cell: ({ row }) => {
            return (
                <Typography sx={{ fontSize: "14px" }}>
                    {row.original.pricePerDay}
                </Typography>
            );
        },
    }),
    columnHelper.display({
        header: "Action",
        size: 40,
        Cell: ({ row }) => {
            const book = row.original;
            return <BookStatusAction book={book} />;
        },
    }),
];

const CircleWithDot = ({ color = "blue", size = 20 }) => {
    const innerDotSize = size * 0.6;

    return (
        <Box
            sx={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: "transparent",
                border: `1.5px solid ${color}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}>
            <Box
                sx={{
                    width: innerDotSize,
                    height: innerDotSize,
                    borderRadius: "50%",
                    backgroundColor: color,
                }}
            />
        </Box>
    );
};

function OwnerColumnName({ ownerName }: { ownerName: string }) {
    const { user } = useAuth();
    if (user.role === Role_Enum.OWNER) {
        return <Typography sx={{ fontSize: "14px" }}>You</Typography>;
    }
    return <Typography sx={{ fontSize: "14px" }}>{ownerName}</Typography>;
}
