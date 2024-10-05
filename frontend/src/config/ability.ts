import { IUser, Role_Enum } from "@/types";
import {
    AbilityBuilder,
    createMongoAbility,
    MongoAbility,
} from "@casl/ability";

export type Actions = "access-route" | "manage" | "show";
export type Subjects =
    | "admin-owner-layout"
    | "renter-layout"
    | "dashboard"
    | "notifications"
    | "settings"
    | "book-catalogs"
    | "owners"
    | "upload-book"
    | "book-inventory"
    | "owner-status";

export type AppAbility = MongoAbility<[Actions, Subjects]>;
export const AppAbility = createMongoAbility as () => MongoAbility<
    [Actions, Subjects]
>;

export const defaultAbility = () => {
    const { build } = new AbilityBuilder<AppAbility>(createMongoAbility);
    return build();
};

export const defineAbilitiesFor = async (user: IUser) => {
    const { can, build, cannot } = new AbilityBuilder<AppAbility>(
        createMongoAbility
    );

    // Define abilities based on user role
    if (user.role === Role_Enum.ADMIN) {
        can("access-route", "admin-owner-layout");
        can("access-route", "dashboard");
        can("access-route", "notifications");
        can("access-route", "settings");
        can("access-route", "book-catalogs");
        can("access-route", "owners");

        cannot("manage", "book-inventory");
    }

    if (user.role === Role_Enum.OWNER) {
        can("access-route", "admin-owner-layout");
        can("access-route", "dashboard");
        can("access-route", "notifications");
        can("access-route", "settings");
        can("access-route", "upload-book");

        can("manage", "book-inventory");
        can("show", "owner-status");
    }

    if (user.role === Role_Enum.RENTER) {
        can("access-route", "renter-layout");
    }
    return build();
};
