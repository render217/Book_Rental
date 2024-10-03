import {
    Account,
    Admin,
    BookCatalog,
    BookInventory,
    BookRental,
    Owner,
    Renter,
    Revenue,
    Role, // user role enum
    ApprovalStatus, // for book catalog
    OwnerStatus, // for owner status
    RentalStatus, // for book rental status.
} from "@prisma/client";
import { PureAbility, AbilityBuilder, subject } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";

type CRUD = "create" | "read" | "update" | "delete";

type AppActions =
    | CRUD
    | "read-book-catalog"
    | "update-book-catalog-status"
    | "create-book-catalog"
    | "create-inventory";

export type AppSubjects =
    | "all"
    | Subjects<{
          Account: Account;
          Admin: Admin;
          Owner: Owner;
          Renter: Renter;

          BookCatalog: BookCatalog;
          BookInventory: BookInventory;
          BookRental: BookRental;
          Revenue: Revenue;
      }>;

export type AppAbility = PureAbility<[AppActions, AppSubjects], PrismaQuery>;

export const defineAbilitiesFor = (userRole: Role) => {
    const { can, build, cannot } = new AbilityBuilder<AppAbility>(
        createPrismaAbility
    );
    switch (userRole) {
        case Role.ADMIN:
            // add book catalog
            can("create-book-catalog", "Admin");
            // read book catalog detail | many..
            can("read", "BookCatalog");

            can("update-book-catalog-status", "Admin");
            break;
        case Role.OWNER:
            can("create-book-catalog", "Owner");
            // to add book catalog owner must be approved.
            cannot("create-book-catalog", "Owner", {
                status: OwnerStatus.DISABLED,
            });
            // to add book catalog owner must not be disabled.
            cannot("create-book-catalog", "Owner", {
                isApproved: false,
            });
            // owner can read approved book catalogs
            can("read", "BookCatalog", {
                status: ApprovalStatus.APPROVED,
            });
            break;
        case Role.RENTER:
            // renter can read approved book catalogs
            can("read", "BookCatalog", {
                status: ApprovalStatus.APPROVED,
            });
            break;
        default:
            break;
    }
    return build();
};
