import { Navigate, Outlet } from "react-router-dom";
import { useAppAbility } from "@/context/ability-provider";

import { Subjects } from "@/config/ability";

type ProtectedRouteAbilityProps = {
    subject: Subjects;
    fallbackRoute?: string;
};

export default function ProtectedRouteAbility({
    subject,
    fallbackRoute,
}: ProtectedRouteAbilityProps) {
    const ability = useAppAbility();

    //If the user does not have the ability to access the subject, render null or return fallbackRoute
    if (!ability.can("access-route", subject)) {
        if (fallbackRoute) {
            // If no access, render the fallback route if defined
            return <Navigate to={fallbackRoute} replace />;
        }

        // If no access and no fallback route, render null
        return null;
    }

    // If user is authenticated and has access, render the child routes/components
    return <Outlet />;
}
