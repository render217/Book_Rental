import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useGetOwners } from "@/services/react-query/queries";

import { ownerColumns } from "./components/book-owners/owner-column";

export default function BookOwners() {
    const { data, refetch } = useGetOwners();

    const ownersData = data ?? [];

    const table = useMaterialReactTable({
        columns: ownerColumns,
        data: ownersData,
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableDensityToggle: false,
        enableGlobalFilter: true,
        defaultDisplayColumn: {
            maxSize: 50,
            size: 40,
            minSize: 20,
        },
        muiSearchTextFieldProps: {
            size: "small",
            variant: "outlined",
        },
        muiTableProps: {
            size: "small",
        },
        muiPaginationProps: {
            rowsPerPageOptions: [5, 10],
            showFirstButton: false,
            showLastButton: false,
        },

        enableColumnResizing: false,

        initialState: { density: "compact" },
        renderTopToolbarCustomActions: () => (
            <Tooltip arrow title="Refresh Data">
                <IconButton onClick={() => refetch()}>
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
        ),
    });
    return (
        <Box sx={{ paddingInline: "5px" }}>
            <MaterialReactTable table={table} />
        </Box>
    );
}
