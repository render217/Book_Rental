import { ApprovalStatus_Enum, OwnerStatus_Enum, Role_Enum } from "@/types";

export type BookCatalogType = {
    id: string;
    title: string;
    author: string;
    category: string;
    status: ApprovalStatus_Enum;
    uploader: IUploader | null;
};

type IUploader = {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    location: string;
    role: Role_Enum;
    isApproved: boolean;
    status: OwnerStatus_Enum;
};
