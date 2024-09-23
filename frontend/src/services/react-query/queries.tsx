import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { getCurrentUser, loginUser, registerUser } from "..";

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
