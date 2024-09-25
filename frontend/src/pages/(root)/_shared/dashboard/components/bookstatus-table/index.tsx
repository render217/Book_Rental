import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, IconButton, Tooltip } from "@mui/material";
import { bookStatusColumns } from "./book-status-column";
import { useGetBooksInventory } from "@/services/react-query/queries";
export default function BookStatusTable() {
    const { data, refetch } = useGetBooksInventory();
    const bookStatusData = data ?? [];
    const table = useMaterialReactTable({
        columns: bookStatusColumns,
        data: bookStatusData,
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableDensityToggle: false,
        enableGlobalFilter: true,
        defaultDisplayColumn: {
            size: 20,
            minSize: 20,
            maxSize: 50,
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
