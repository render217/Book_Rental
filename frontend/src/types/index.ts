export type IUser = {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    location: string;
    role: string;
    // Optional properties for role-specific fields
    address?: string | null;
    isApproved?: boolean;
    status?: string;
};

export type IOwner = IUser & {
    role: Role_Enum.OWNER;
    status: OwnerStatus_Enum;
    isApproved: boolean;
};

export enum Role_Enum {
    OWNER = "OWNER",
    RENTER = "RENTER",
    ADMIN = "ADMIN",
}

export enum ApprovalStatus_Enum {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export enum OwnerStatus_Enum {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED",
}

export enum RentalStatus_Enum {
    RENTED = "RENTED",
    RETURNED = "RETURNED",
}

export type IBookStatus = {
    id: string;
    title: string;
    totalCopies: number;
    availableCopies: number;
    rentedCopies: number;
    pricePerDay: number;
    owner: IOwner;
};
