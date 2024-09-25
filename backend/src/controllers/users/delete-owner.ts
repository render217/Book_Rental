import { Request, Response } from "express";
import { prisma } from "../../../prisma/db";
import { mapOwnerToUser } from "../../utils/mapper";
const deleteOwner = async (req: Request, res: Response) => {
    const ownerId = req.params.id;
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
