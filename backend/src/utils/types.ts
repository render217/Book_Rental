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
    //
};
