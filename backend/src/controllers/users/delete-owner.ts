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

    // Check if the owner has any books in their inventory
    const inventoryCount = await prisma.bookInventory.count({
        where: {
            ownerId: ownerId,
        },
    });

    if (inventoryCount > 0) {
        return res.status(400).json({
            message:
                "Cannot delete owner with existing inventory\n Disable the owner if you want to delete ",
        });
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

    return res.status(200).json({ message: "Successfully deleted" });
};

export default deleteOwner;
