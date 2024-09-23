import { createContext, useContext, useEffect, useState } from "react";
import { createContextualCan } from "@casl/react";
import { useAuth } from "./auth-provider";
import {
    AppAbility,
    defaultAbility,
    defineAbilitiesFor,
} from "@/config/ability";

const AbilityContext = createContext<AppAbility>(defaultAbility());

export default function AbilityProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useAuth();
    const [ability, setAbility] = useState<AppAbility>(defaultAbility());

    useEffect(() => {
        if (user) {
            defineAbilitiesFor(user).then(setAbility);
        }
    }, [user]);

    if (!ability) return <div>Loading abilities...</div>;

    return (
        <AbilityContext.Provider value={ability}>
            {children}
        </AbilityContext.Provider>
    );
}

export const useAppAbility = () => {
    const context = useContext(AbilityContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};

export const Can = createContextualCan(AbilityContext.Consumer);
