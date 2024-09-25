import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { mapOwnerToUser } from "../../utils/mapper";
const getOwners = async (req: Request, res: Response) => {
    const owners = await prisma.owner.findMany({
        include: {
            account: true,
        },
        orderBy: {
            account: {
                createdAt: "desc",
            },
        },
    });
    const mappedOwners = owners.map((owner) =>
        mapOwnerToUser(owner, owner.account)
    );

    res.status(200).json(mappedOwners);
};
export default getOwners;
