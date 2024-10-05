import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { getCurrentUser, loginUser, registerUser } from "../auth.services";
import {
    createBookCatalog,
    getBookCatalogDetail,
    getBookCatalogs,
    getBookCatalogsStatistics,
    updateBookCatalogStatus,
} from "../book-catalog.services";
import {
    activeDeactiveOwner,
    approveOwner,
    deleteOwner,
    getOwnerDetail,
    getOwners,
} from "../users.services";
import {
    addBookInventory,
    getBooksInventory,
    getBooksInventoryStatistics,
    removeBookFromInventory,
    searchBookInInventory,
    updateBookInventory,
} from "../book-inventory.service";
import {
    addRentBook,
    getRentalHistory,
    getRentalHistoryDetail,
    returnBook,
} from "../book-rental.services";
import {
    getAllOwnersRevenue,
    getOwnerRevenue,
} from "../owner-revenue.services";

// ========================================
//             AUTH
// ========================================

export const useLoginUser = () => {
    return useMutation({
        // mutationFn: async (payload: unknown) => await loginUser(payload),
        mutationFn: loginUser,
    });
};
export const useRegisterUser = () => {
    return useMutation({
        mutationFn: async (payload: unknown) => await registerUser(payload),
    });
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser,
        retry: false,
    });
};

// ========================================
//             USERS || OWNERS
// ========================================

export const useGetOwners = (query = "") => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_OWNERS, { query }],
        queryFn: async () => await getOwners(query),
        placeholderData: keepPreviousData,
    });
};

export const useGetOwnerDetail = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_OWNERS, { id }],
        queryFn: async () => await getOwnerDetail(id),
        placeholderData: keepPreviousData,
    });
};

export const useApproveOwner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => await approveOwner(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_OWNERS],
            });
        },
    });
};

export const useActivateDeactivateOwner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => await activeDeactiveOwner(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_OWNERS],
            });
        },
    });
};

export const useDeleteOwner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => await deleteOwner(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_OWNERS],
            });
        },
    });
};

// ========================================
//              BOOK CATALOG
// ========================================

export const useBooksCatalog = (query = "") => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BOOKS_CATALOG_RENTER, { query }],
        queryFn: async () => await getBookCatalogs(query),
        placeholderData: keepPreviousData,
    });
};

export const useGetBookCatalogDetail = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BOOKS_CATALOG_RENTER, { id }],
        queryFn: async () => await getBookCatalogDetail(id),
        enabled: !!id,
        placeholderData: keepPreviousData,
    });
};

export const useBookCatalogStatistics = (isAdmin: boolean) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BOOKS_STATISTICS],
        queryFn: async () => await getBookCatalogsStatistics(),
        placeholderData: keepPreviousData,
        enabled: isAdmin,
    });
};

export const useUpdateBookCatalogStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => await updateBookCatalogStatus(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_BOOKS_CATALOG],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_BOOKS_STATISTICS],
            });
        },
    });
};

export const useCreateBookCatalog = () => {
    return useMutation({
        mutationFn: async (payload: unknown) =>
            await createBookCatalog(payload),
        onSuccess: () => {},
    });
};

// ========================================
//             BOOK INVENTORY
// ========================================

export const useGetBooksInventory = (query = "") => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BOOKS_INVENTORY, { query }],
        queryFn: async () => await getBooksInventory(query),
        placeholderData: keepPreviousData,
    });
};

export const useAddBookInventory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: unknown) => await addBookInventory(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_BOOKS_INVENTORY],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_BOOK_INVENTORY_STATISTICS],
            });
        },
    });
};

export const useUpdateBookInventory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: unknown }) =>
            await updateBookInventory(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_BOOKS_INVENTORY],
            });
        },
    });
};

export const useRemoveBookFromInventory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: unknown }) =>
            await removeBookFromInventory(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_BOOKS_INVENTORY],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_BOOK_INVENTORY_STATISTICS],
            });
        },
    });
};

export const useGetBooksInventoryStatistics = (isOwner: boolean) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BOOK_INVENTORY_STATISTICS],
        queryFn: async () => await getBooksInventoryStatistics(),
        placeholderData: keepPreviousData,
        enabled: isOwner,
    });
};

export const useSearchBookInInventory = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_BOOK_IN_INVENTORY],
        queryFn: async () => await searchBookInInventory(id),
        enabled: !!id,
    });
};

// ========================================
//             BOOK RENTAL
// ========================================

export const useGetRentalHistory = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RENTALS],
        queryFn: async () => await getRentalHistory(),
        placeholderData: keepPreviousData,
    });
};

export const useGetRentalHistoryDetail = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RENTALS, { id }],
        queryFn: async () => await getRentalHistoryDetail(id),
        enabled: !!id,
        placeholderData: keepPreviousData,
    });
};

export const useAddRentBook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: unknown) => await addRentBook(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RENTALS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SEARCH_BOOK_IN_INVENTORY],
            });
        },
    });
};

export const useReturnRentalBook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => await returnBook(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RENTALS],
            });
        },
    });
};

// ========================================
//             REVENUES
// ========================================
export const useGetOwnerRevenue = (isOwner: boolean) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_OWNERS_MINE_REVENUES],
        queryFn: async () => await getOwnerRevenue(),
        placeholderData: keepPreviousData,
        enabled: isOwner,
    });
};

export const useGetAllOwnersRevenues = (isAdmin: boolean) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_OWNERS_REVENUE],
        queryFn: async () => await getAllOwnersRevenue(),
        placeholderData: keepPreviousData,
        enabled: isAdmin,
    });
};
