import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { mapOwnerToUser } from "../../utils/mapper";
import { ForbiddenError, subject } from "@casl/ability";
const deleteOwner = async (req: Request, res: Response) => {
    const ownerId = req.params.id;

    ForbiddenError.from(req.ability).throwUnlessCan(
        "manage",
        subject("User", req.user!)
    );

    const targetOwner = await prisma.owner.findUnique({
        where: {
            ownerId: ownerId,
        },
    });

    if (!targetOwner) {
        return res.status(404).json({ message: "Owner not found" });
    }

    await prisma.$transaction([
        prisma.owner.delete({
            where: { ownerId },
        }),
        prisma.account.delete({
            where: { accountId: targetOwner.accountId },
        }),
        prisma.bookInventory.deleteMany({
            where: { ownerId },
        }),
    ]);
};

export default deleteOwner;
