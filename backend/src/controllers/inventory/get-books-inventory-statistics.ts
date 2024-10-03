import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus, Prisma } from "@prisma/client";
import { accessibleBy } from "@casl/prisma";
const getBookInventoryStatistics = async (req: Request, res: Response) => {
    const user = req.user!;

    // const where: Prisma.BookInventoryWhereInput = {};

    // if (user.role === Role.OWNER) {
    //     where.ownerId = user.id;
    // }

    const booksInventory = await prisma.bookInventory.findMany({
        // where: where,
        where: accessibleBy(req.ability, "read").BookInventory,
        include: {
            book: true,
            owner: {
                include: {
                    account: true,
                },
            },
        },
    });

    // Create a mapping of categories to counts and total quantity
    const categoryStats: Record<string, { count: number; quantity: number }> =
        {};

    for (const inventory of booksInventory) {
        const category = inventory.book.category; // Get the category of the book
        if (category) {
            if (!categoryStats[category]) {
                categoryStats[category] = { count: 0, quantity: 0 }; // Initialize if it doesn't exist
            }
            categoryStats[category].count += 1; // Increment count for the category
            categoryStats[category].quantity += inventory.totalCopies; // Add to the total quantity
        }
    }

    const response = Object.entries(categoryStats).map(([category, stats]) => ({
        category,
        count: stats.count,
        quantity: stats.quantity,
    }));

    return res.status(200).json(response);
};

export default getBookInventoryStatistics;
