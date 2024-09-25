import {
    createMRTColumnHelper, // <--- import createMRTColumnHelper
} from "material-react-table";

import { Typography } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import OwnerStatusSwitch from "./owner-status-switch";
import { OwnerType } from "./owner-type";
import OwnerActions from "./owner-actions";
import OwnerApproveButton from "./owner-approve-button";

const columnHelper = createMRTColumnHelper<OwnerType>();

export const ownerColumns = [
    columnHelper.display({
        header: "No",
        size: 5,
        enableGlobalFilter: false,
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
    columnHelper.accessor("username", {
        header: "Owner",
        size: 20,
        muiTableHeadCellProps: {
            align: "center",
        },
        muiTableBodyCellProps: {
            align: "center",
        },
        Cell: ({ row }) => {
            return (
                <Typography sx={{ fontSize: "14px" }}>
                    {row.original.username}
                </Typography>
            );
        },
    }),
    // columnHelper.display({
    //     header: "Upload",
    //     size: 5,
    //     muiTableHeadCellProps: {
    //         align: "center",
    //     },
    //     muiTableBodyCellProps: {
    //         align: "center",
    //     },
    // }),
    columnHelper.accessor("location", {
        header: "Location",
        size: 10,
        muiTableHeadCellProps: {
            align: "center",
        },
        muiTableBodyCellProps: {
            align: "center",
        },
        Cell: ({ row }) => {
            return (
                <Typography sx={{ fontSize: "14px" }}>
                    {row.original.location}
                </Typography>
            );
        },
    }),
    columnHelper.accessor("status", {
        header: "Status",
        size: 10,
        muiTableHeadCellProps: {
            align: "center",
        },
        muiTableBodyCellProps: {
            align: "center",
        },
        Cell: ({ row }) => {
            return (
                <OwnerStatusSwitch
                    ownerId={row.original.id}
                    status={row.original.status}
                />
            );
        },
    }),
    columnHelper.display({
        header: "Actions",
        size: 10,
        muiTableHeadCellProps: {
            align: "center",
        },
        muiTableBodyCellProps: {
            align: "center",
        },
        Cell: ({ row }) => {
            const owner = row.original;
            return <OwnerActions owner={owner} />;
        },
    }),
    columnHelper.display({
        header: " ",
        size: 10,
        muiTableHeadCellProps: {
            align: "center",
        },
        muiTableBodyCellProps: {
            align: "center",
        },
        Cell: ({ row }) => {
            const ownerId = row.original.id;
            const isApproved = row.original.isApproved;
            return (
                <OwnerApproveButton ownerId={ownerId} isApproved={isApproved} />
            );
        },
    }),
];
