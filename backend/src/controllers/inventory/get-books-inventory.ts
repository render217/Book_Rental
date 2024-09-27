import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus, Prisma } from "@prisma/client";
import { mapOwnerToUser } from "../../utils/mapper";
const getBooksInventory = async (req: Request, res: Response) => {
    const user = req.user!;

    const whereFilter: Prisma.BookInventoryWhereInput = {};

    // If the user is an owner, only fetch their own inventory
    if (user.role === Role.OWNER) {
        whereFilter.ownerId = user.id;
    }

    // Fetch the books inventory based on the user's role
    const booksInventory = await prisma.bookInventory.findMany({
        where: whereFilter,
        include: {
            book: true,
            owner: {
                include: {
                    account: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Map the data for response
    const mappedInventory = booksInventory.map((inventory) => {
        const inventoryData: any = {
            id: inventory.bookInventoryId,
            title: inventory.book.title,
            totalCopies: inventory.totalCopies,
            availableCopies: inventory.availableCopies,
            rentedCopies: inventory.rentedCopies,
            pricePerDay: inventory.pricePerDay,
            owner: mapOwnerToUser(inventory.owner, inventory.owner.account),
        };
        return inventoryData;
    });

    return res.status(200).json(mappedInventory);
};

export default getBooksInventory;
