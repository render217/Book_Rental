import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { mapOwnerToUser } from "../../utils/mapper";
import { OwnerStatus } from "@prisma/client";
import { ForbiddenError, subject } from "@casl/ability";

const approveOwner = async (req: Request, res: Response) => {
    const ownerId = req.params.id;

    ForbiddenError.from(req.ability).throwUnlessCan(
        "manage",
        subject("User", req.user!)
    );

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

    if (targetOwner.isApproved) {
        return res.status(400).json({ message: "Owner already approved" });
    }

    const updatedOwner = await prisma.owner.update({
        where: {
            ownerId: ownerId,
        },
        data: {
            isApproved: true,
            status: OwnerStatus.ACTIVE,
        },
        include: {
            account: true,
        },
    });

    const mappedOwner = mapOwnerToUser(updatedOwner, updatedOwner.account);
    return res.status(200).json(mappedOwner);
};
export default approveOwner;
