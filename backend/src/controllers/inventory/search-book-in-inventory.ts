import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus } from "@prisma/client";
import {
    mapOwnerToUser,
    mapRenterToUser,
    mapToPublicUser,
} from "../../utils/mapper";
import { accessibleBy } from "@casl/prisma";
const searchBookInInventory = async (req: Request, res: Response) => {
    const bookId = req.params.id;

    if (!bookId) {
        return res.status(400).json({ message: "Book ID is required." });
    }

    const bookExists = await prisma.bookCatalog.findUnique({
        where: {
            bookId: bookId,
        },
    });

    if (!bookExists) {
        return res.status(404).json({ message: "Book not found." });
    }

    const bookInventory = await prisma.bookInventory.findMany({
        where: {
            AND: [
                accessibleBy(req.ability).BookInventory,
                {
                    bookId: bookId,
                },
                // {
                //     owner: {
                //         status: OwnerStatus.ACTIVE,
                //     },
                // },
            ],
        },
        include: {
            book: true,
            owner: {
                include: {
                    account: true,
                },
            },
        },
    });

    if (!bookInventory) {
        return res.status(404).json({ message: "Book inventory not found." });
    }

    const mappedInventory = bookInventory.map((inventory) => {
        const inventoryData: any = {
            id: inventory.bookInventoryId,
            title: inventory.book.title,
            author: inventory.book.author,
            category: inventory.book.category,
            availableCopies: inventory.availableCopies,
            pricePerDay: inventory.pricePerDay,
            owner: mapToPublicUser(inventory.owner.account),
        };
        return inventoryData;
    });
    return res.status(200).json(mappedInventory);
};

export default searchBookInInventory;
