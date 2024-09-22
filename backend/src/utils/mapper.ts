import { Renter, Account, Owner, Admin } from "@prisma/client";
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
