import { useAuth } from "@/context/auth-provider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRouteAuth() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <p>loading...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
