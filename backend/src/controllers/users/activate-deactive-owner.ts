import { Request, Response } from "express";
import { prisma } from "../../../prisma/db";
import { OwnerStatus } from "@prisma/client";
import { mapOwnerToUser } from "../../utils/mapper";
const activateDeactivateOwner = async (req: Request, res: Response) => {
    const ownerId = req.params.id;

    const targetOwner = await prisma.owner.findUnique({
        where: {
            ownerId: ownerId,
        },
        include: {
            account: true,
        },
    });

    if (!targetOwner) {
        return res.status(404).json({ message: "Owner not found" });
    }

    if (!targetOwner.isApproved) {
        return res.status(400).json({ message: "Owner not approved yet" });
    }

    const updatedOwner = await prisma.owner.update({
        where: {
            ownerId: ownerId,
        },
        data: {
            status:
                targetOwner.status === OwnerStatus.ACTIVE
                    ? OwnerStatus.DISABLED
                    : OwnerStatus.ACTIVE,
        },
        include: {
            account: true,
        },
    });

    const mappedOwner = mapOwnerToUser(updatedOwner, updatedOwner.account);
    return res.status(200).json(mappedOwner);
};
export default activateDeactivateOwner;
