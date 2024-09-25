import {
    Renter,
    Account,
    Owner,
    Admin,
    BookInventory,
    BookCatalog,
} from "@prisma/client";
import { IUser } from "./types";
export const mapRenterToUser = (renter: Renter, account: Account): IUser => {
    return {
        id: renter.renterId,
        username: account.username,
        email: account.email,
        phoneNumber: account.phoneNumber,
        location: account.location,
        role: account.role,
        address: renter.address,
    };
};

export const mapOwnerToUser = (owner: Owner, account: Account): IUser => {
    return {
        id: owner.ownerId,
        username: account.username,
        email: account.email,
        phoneNumber: account.phoneNumber,
        location: account.location,
        role: account.role,
        isApproved: owner.isApproved,
        status: owner.status,
    };
};

export const mapAdminToUser = (admin: Admin, account: Account): IUser => {
    return {
        id: admin.adminId,
        username: account.username,
        email: account.email,
        phoneNumber: account.phoneNumber,
        location: account.location,
        role: account.role,
    };
};

export const mapToPublicUser = (account: Account) => {
    return {
        username: account.username,
        email: account.email,
        phoneNumber: account.phoneNumber,
        location: account.location,
    };
};

export const mapBookInventory = (
    inventory: BookInventory,
    book: BookCatalog,
    owner: Owner,
    account: Account
) => {
    return {
        id: inventory.bookInventoryId,
        title: book.title,
        totalCopies: inventory.totalCopies,
        rentedCopies: inventory.rentedCopies,
        pricePerDay: inventory.pricePerDay,
        owner: mapOwnerToUser(owner, account),
    };
};
