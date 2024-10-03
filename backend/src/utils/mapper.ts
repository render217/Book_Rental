import {
    Renter,
    Account,
    Owner,
    Admin,
    BookInventory,
    BookCatalog,
} from "@prisma/client";
import { IUser, User } from "./types";
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

export const mapUser = (
    account: Account,
    owner?: Owner | null,
    admin?: Admin | null,
    renter?: Renter | null
) => {
    if (owner) {
        return new User(
            // account.accountId,
            owner.ownerId,
            account.username,
            account.email,
            account.phoneNumber,
            account.location,
            account.role,
            null,
            owner.isApproved,
            owner.status
        );
    }
    if (admin) {
        return new User(
            admin.adminId,
            // account.accountId,
            account.username,
            account.email,
            account.phoneNumber,
            account.location,
            account.role
        );
    }
    if (renter) {
        return new User(
            renter.renterId,
            // account.accountId,
            account.username,
            account.email,
            account.phoneNumber,
            account.location,
            account.role,
            renter.address
        );
    }
};
