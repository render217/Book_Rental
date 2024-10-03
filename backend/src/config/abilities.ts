import {
    Account,
    Admin,
    BookCatalog,
    BookInventory,
    BookRental,
    Owner,
    Renter,
    Revenue,
    // Enums
    Role,
    ApprovalStatus,
    OwnerStatus,
    RentalStatus,
} from "@prisma/client";
import { PureAbility, AbilityBuilder, subject } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";
import { User } from "../utils/types";

type CRUD = "create" | "read" | "update" | "delete";

type AppActions =
    | CRUD
    | "manage"
    | "read-book-catalog"
    | "update-book-catalog-status"
    | "create-book-catalog"
    | "create-inventory";

export type AppSubjects =
    | "all"
    | typeof User
    | "User"
    | User
    | Subjects<{
          Account: Account;
          Admin: Admin;
          BookCatalog: BookCatalog;
          BookInventory: BookInventory;
          BookRental: BookRental;
          Revenue: Revenue;
      }>;

export type AppAbility = PureAbility<[AppActions, AppSubjects], PrismaQuery>;

export const defineAbilitiesFor = (user: User) => {
    const { can, build, cannot } = new AbilityBuilder<AppAbility>(
        createPrismaAbility
    );
    switch (user.role) {
        case Role.ADMIN:
            // add book catalog
            can("create-book-catalog", "User");
            // read book catalog
            can("read", "BookCatalog");
            // update book catalog status
            can("update-book-catalog-status", "User");

            // can read all owners book inventory
            can("read", "BookInventory");

            // can read all owners revenue
            can("read", "Revenue");

            // can active/deactivate owners | delete owners..... all things..
            can("manage", "User");

            break;
        case Role.OWNER:
            can("create-book-catalog", "User");

            // to add book catalog owner must be approved.
            cannot("create-book-catalog", "User", {
                isApproved: false,
            }).because("Access Denied.");

            // to add book catalog owner must be active.
            cannot("create-book-catalog", "User", {
                status: OwnerStatus.DISABLED,
            }).because("Access Denied. Your account is disabled.");

            // owner can read approved book catalogs
            can("read", "BookCatalog", {
                status: ApprovalStatus.APPROVED,
            });

            can("create-inventory", "User");

            cannot("create-inventory", "User", {
                isApproved: false,
            }).because("Access Denied.");

            cannot("create-inventory", "User", {
                status: OwnerStatus.DISABLED,
            }).because("Access Denied. Your account is disabled.");

            // read book inventory of their own
            can("read", "BookInventory", {
                ownerId: user.id,
            });

            // can delete book inventory of their own
            can("delete", "BookInventory", {
                ownerId: user.id,
                owner: {
                    is: {
                        status: OwnerStatus.ACTIVE,
                    },
                },
            });

            // can update book inventory of their own
            can("update", "BookInventory", {
                ownerId: user.id,
                owner: {
                    is: {
                        status: OwnerStatus.ACTIVE,
                    },
                },
            });

            // can read there own rentals
            can("read", "Revenue", {
                ownerId: user.id,
            });

            break;
        case Role.RENTER:
            // renter can read approved book catalogs
            can("read", "BookCatalog", {
                status: ApprovalStatus.APPROVED,
            });

            // renters can read book inventory of active owners.
            can("read", "BookInventory", {
                owner: {
                    is: {
                        status: OwnerStatus.ACTIVE,
                    },
                },
            });

            // can read there own rentals
            can("read", "BookRental", {
                renterId: user.id,
            });

            // can create rentals
            can("create", "BookRental");

            // can update there own rentals.. they can only update rented rentals.
            can("update", "BookRental", {
                renterId: user.id,
                status: RentalStatus.RENTED,
            });

            break;
        default:
            break;
    }
    return build();
};
