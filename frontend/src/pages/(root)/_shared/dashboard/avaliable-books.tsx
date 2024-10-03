/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    // useBookCatalogStatistics,
    useGetBooksInventoryStatistics,
} from "@/services/react-query/queries";
import { Box, Stack, Typography } from "@mui/material";
import AvaliableBooksView from "./components/avaliable-books/avaliable-books-view";
// import { useAuth } from "@/context/auth-provider";
// import { Role_Enum } from "@/types";

export default function AvaliableBooks() {
    // const { user } = useAuth();

    // const isAdmin = user.role === Role_Enum.ADMIN;
    // const isOwner = user.role === Role_Enum.OWNER;

    // const { data: bookCatalogData, isLoading: isCatalogLoading } =
    //     useBookCatalogStatistics(isAdmin);

    // const { data: booksInventoryData, isLoading: isInventoryLoading } =
    //     useGetBooksInventoryStatistics(isOwner);

    // if (isCatalogLoading || isInventoryLoading) {
    //     return null;
    // }
    // const isLoading = isOwner ? isInventoryLoading : isCatalogLoading;
    // const data = isOwner ? booksInventoryData : bookCatalogData;

    const { data: booksInventoryData, isLoading } =
        useGetBooksInventoryStatistics(true);
    const data = booksInventoryData;

    if (isLoading) {
        return null;
    }
    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "20px",
                boxShadow: "3px 6px 34px -28px rgba(0,0,0,0.75)",
            }}>
            <Stack
                sx={{}}
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Typography
                    fontSize="16px"
                    color="#656575"
                    variant="h6"
                    component="h1">
                    AvaliableBooks
                </Typography>
                <Box>
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{
                            padding: "2px",
                            paddingInline: "10px",
                            backgroundColor: "#F8F7F1",
                            border: "1px solid #E0E0E0",
                        }}>
                        Today
                    </Typography>
                </Box>
            </Stack>
            {/* @ts-ignore */}
            <AvaliableBooksView data={data} isLoading={isLoading} />
        </Box>
    );
}
