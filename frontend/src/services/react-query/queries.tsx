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
import { getBooksInventory } from "../book-inventory.service";

// AUTH
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

// USERS || OWNERS
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

// BOOK CATALOG

export const useBooksCatalog = (query = "") => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BOOKS_CATALOG, { query }],
        queryFn: async () => await getBookCatalogs(query),
        placeholderData: keepPreviousData,
    });
};

export const useBookCatalogStatistics = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BOOKS_STATISTICS],
        queryFn: async () => await getBookCatalogsStatistics(),
        placeholderData: keepPreviousData,
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

// BOOK INVENTORY
export const useGetBooksInventory = (query = "") => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_BOOKS_INVENTORY, { query }],
        queryFn: async () => await getBooksInventory(query),
        placeholderData: keepPreviousData,
    });
};

// BOOK RENTAL

// OWNER REVENUE
