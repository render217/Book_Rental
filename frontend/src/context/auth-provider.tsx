import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/types";

import { useCurrentUser } from "@/services/react-query/queries";
import Cookies from "js-cookie";
import { COOKIE_TOKEN } from "@/utils/constants";

const INITAL_USER: IUser = {
    id: "",
    username: "",
    email: "",
    phoneNumber: "",
    location: "",
    role: "",

    // Optional properties for role-specific fields
    isApproved: false,
    status: "",
    address: null,
};

const INITIAL_STATE = {
    user: INITAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    logOutUser: () => {},
};

type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    logOutUser: () => void;
};
const AuthContext = createContext<IContextType>(INITIAL_STATE);

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<IUser>(INITAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { isFetching, isLoading, data: userData } = useCurrentUser();
    const [localLoading, setLocalLoading] = useState(true);

    useEffect(() => {
        // Update the local loading state and authentication status
        if (!isFetching) {
            if (userData) {
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false); // User is not authenticated
            }
            // Once fetching is done, set local loading to false
            setLocalLoading(false);
        }
    }, [isFetching, userData]);

    const logOutUser = () => {
        setUser(INITAL_USER);
        setIsAuthenticated(false);
        Cookies.remove(COOKIE_TOKEN);
    };

    const value = {
        user,
        setUser,
        isLoading: localLoading || isLoading,
        isAuthenticated,
        setIsAuthenticated,
        logOutUser,
    };
    return (
        <AuthContext.Provider value={value}>
            {isLoading ? null : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
