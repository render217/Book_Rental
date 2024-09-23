import { useAuth } from "@/context/auth-provider";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useAuthRedirect() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);
}
