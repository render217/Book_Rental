import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useBooksCatalog } from "@/services/react-query/queries";
import { bookColumns } from "./components/book-catalogs/book-column";
export default function BookCatalogs() {
    const { data, refetch } = useBooksCatalog();

    const booksCatalogData = data ?? [];

    const table = useMaterialReactTable({
        columns: bookColumns,
        data: booksCatalogData,
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableDensityToggle: false,
        enableGlobalFilter: true,
        defaultDisplayColumn: {
            maxSize: 100,
            size: 40,
            minSize: 40,
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
