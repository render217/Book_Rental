import { createMRTColumnHelper } from "material-react-table";
import { BookCatalogType } from "./book-catalog-type";
import { Typography } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import StatusSwitch from "./status-switch";
const columnHelper = createMRTColumnHelper<BookCatalogType>();

export const bookColumns = [
    columnHelper.display({
        header: "No",
        size: 5,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableHeadCellProps: {
            align: "center",
        },

        Cell: ({ row }) => {
            return (
                <Typography sx={{ textAlign: "center" }}>
                    {row.index + 1}
                </Typography>
            );
        },
    }),
    columnHelper.accessor("title", {
        header: "Book Name",
        maxSize: 20,
        Cell: ({ row }) => {
            const trimmedName =
                row.original.title.length > 30
                    ? row.original.title.slice(0, 30) + "..."
                    : row.original.title;
            return (
                <Typography sx={{ fontSize: "14px" }}>{trimmedName}</Typography>
            );
        },
    }),
    columnHelper.accessor("category", {
        header: "Book Category",
        maxSize: 20,
        Cell: ({ row }) => {
            return (
                <Typography sx={{ fontSize: "14px" }}>
                    {row.original.category}
                </Typography>
            );
        },
    }),
    columnHelper.accessor("author", {
        header: "Book Author",
        maxSize: 20,
        Cell: ({ row }) => {
            const trimmedAuthor =
                row.original.title.length > 20
                    ? row.original.author.slice(0, 20) + "..."
                    : row.original.author;
            return (
                <Typography sx={{ fontSize: "14px" }}>
                    {trimmedAuthor}
                </Typography>
            );
        },
    }),
    columnHelper.accessor("uploader.username", {
        header: "Uploader",
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableColumnActions: false,
        enableSorting: false,
        maxSize: 20,
        Cell: ({ row }) => {
            const uploader =
                row.original.uploader !== null
                    ? row.original.uploader?.username
                    : "Admin";
            return (
                <Typography sx={{ fontSize: "14px" }}>{uploader}</Typography>
            );
        },
    }),
    columnHelper.accessor("status", {
        header: "Status",
        maxSize: 20,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
            return (
                <StatusSwitch
                    bookId={row.original.id}
                    status={row.original.status}
                />
            );
        },
    }),

    // columnHelper.display({
    //     header: "View",
    //     size: 5,
    //     enableGlobalFilter: false,
    //     enableColumnFilter: false,
    //     enableColumnActions: false,
    //     Cell: ({ row }) => {
    //         return (
    //             <VisibilityIcon
    //                 onClick={() => alert(row.original.id)}
    //                 sx={{
    //                     fontSize: "20px",
    //                     display: "block",
    //                     marginInline: "auto",
    //                     color: "gray",
    //                     cursor: "pointer",
    //                 }}
    //             />
    //         );
    //     },
    // }),
];
