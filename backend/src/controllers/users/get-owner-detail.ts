import { Request, Response } from "express";
import { prisma } from "../../../prisma/db";
import { mapOwnerToUser } from "../../utils/mapper";
const getOwnersDetail = async (req: Request, res: Response) => {
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

    const mappedOwner = mapOwnerToUser(targetOwner, targetOwner.account);
    return res.status(200).json(mappedOwner);
};

export default getOwnersDetail;
