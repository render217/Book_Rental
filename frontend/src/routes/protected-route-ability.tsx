import { Navigate, Outlet } from "react-router-dom";
import { useAppAbility } from "@/context/ability-provider"; // Adjust import paths as needed

import { Subjects } from "@/config/ability";

type ProtectedRouteAbilityProps = {
    subject: Subjects;
    fallbackRoute?: string; // Optional fallback route
};

export default function ProtectedRouteAbility({
    subject,
    fallbackRoute,
}: ProtectedRouteAbilityProps) {
    const ability = useAppAbility();

    //If the user does not have the ability to access the subject, render null or return fallbackRoute
    if (!ability.can("access-route", subject)) {
        console.log("No access to subject", subject);
        if (fallbackRoute) {
            // If no access, render the fallback route if defined
            return <Navigate to={fallbackRoute} replace />;
        }

        // If no fallbackRoute is defined, render null (this will cause the router to continue checking other routes)
        return null;
    }

    // If user is authenticated and has access, render the child routes/components
    return <Outlet />;
}
