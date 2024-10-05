import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnFiltersState,
    type MRT_PaginationState,
    type MRT_SortingState,
} from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, IconButton, Tooltip } from "@mui/material";
import { bookColumns } from "./components/book-catalogs/book-column";
import { BookCatalogType } from "./components/book-catalogs/book-catalog-type";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";
import { QUERY_KEYS } from "@/services/react-query/queryKeys";

type BookCatalogApiResponse = {
    data: BookCatalogType[];
    meta: {
        totalRowCount: number;
    };
};

export default function BookCatalogs() {
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        []
    );
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const {
        data: { data = [], meta } = {},
        isError,
        isRefetching,
        isLoading,
        refetch,
    } = useQuery<BookCatalogApiResponse>({
        queryKey: [
            QUERY_KEYS.GET_BOOKS_CATALOG,
            columnFilters,
            globalFilter,
            sorting,
            pagination.pageIndex,
            pagination.pageSize,
        ],
        queryFn: async () => {
            const params = {
                start: `${pagination.pageIndex * pagination.pageSize}`,
                size: `${pagination.pageSize}`,
                filters: JSON.stringify(columnFilters ?? []),
                globalFilter: globalFilter ?? "",
                sorting: JSON.stringify(sorting ?? []),
            };

            const res = await apiClient.get("/books", { params });
            return res.data as BookCatalogApiResponse;
        },
        placeholderData: keepPreviousData,
    });

    const table = useMaterialReactTable({
        columns: bookColumns,
        data: data,
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableDensityToggle: false,
        enableGlobalFilter: true,
        enableColumnResizing: false,

        //turn of client-side sorting , pagination and filtering
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,

        initialState: { density: "compact" },

        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,

        muiToolbarAlertBannerProps: isError
            ? {
                  color: "error",
                  children: "Error loading data",
              }
            : undefined,
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
            // rowsPerPageOptions: [5, 10],
            showFirstButton: false,
            showLastButton: false,
        },

        renderTopToolbarCustomActions: () => (
            <Tooltip arrow title="Refresh Data">
                <IconButton onClick={() => refetch()}>
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
        ),
        rowCount: meta?.totalRowCount ?? 0,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
        },
    });
    return (
        <Box sx={{ paddingInline: "5px" }}>
            <MaterialReactTable table={table} />
        </Box>
    );
}
