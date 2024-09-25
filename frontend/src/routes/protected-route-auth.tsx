import { useAuth } from "@/context/auth-provider";
import InitialLoad from "@/pages/(root)/intial-load";
import ApprovalWaitPage from "@/pages/(root)/owner/approval-wait";

import { Role_Enum } from "@/types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRouteAuth() {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <InitialLoad />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    if (user.role === Role_Enum.OWNER && !user.isApproved) {
        return <ApprovalWaitPage />;
    }

    return <Outlet />;
}
