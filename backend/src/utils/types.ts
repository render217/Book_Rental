import { Role, OwnerStatus } from "@prisma/client";
export type IUser = {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    location: string;
    role: Role;
    // Optional properties for role-specific fields
    address?: string | null;
    isApproved?: boolean;
    status?: OwnerStatus;
    //
};

class User {
    static get modelName() {
        return "User";
    }
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    location: string;
    role: Role;
    address?: string | null;
    isApproved?: boolean;
    status?: OwnerStatus;

    constructor(
        id: string,
        username: string,
        email: string,
        phoneNumber: string,
        location: string,
        role: Role,
        address?: string | null,
        isApproved?: boolean,
        status?: OwnerStatus
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.location = location;
        this.role = role;
        this.address = address;
        this.isApproved = isApproved;
        this.status = status;
    }
}

export { User };
