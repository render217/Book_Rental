import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus, Prisma } from "@prisma/client";
import { mapOwnerToUser } from "../../utils/mapper";
import { accessibleBy } from "@casl/prisma";
const getBooksInventory = async (req: Request, res: Response) => {
    const user = req.user!;

    const { globalFilter, start, size, filters, sorting } = req.query;

    // PAGINATION
    let startQuery = Number(start) || 0;
    let sizeQuery = Number(size) || 10;

    // COLUMN SORTING
    let sortingQuery: Prisma.BookInventoryOrderByWithRelationInput[] = [];

    if (sorting) {
        sortingQuery = JSON.parse(sorting as string).map(
            (sort: { id: string; desc: boolean }) => {
                switch (sort.id) {
                    case "title":
                        return {
                            book: {
                                title: sort.desc ? "desc" : "asc",
                            },
                        };
                    //changed the id -> owner.username.
                    case "username":
                        return {
                            owner: {
                                account: {
                                    username: sort.desc ? "desc" : "asc",
                                },
                            },
                        };
                    case "totalCopies":
                        return {
                            totalCopies: sort.desc ? "desc" : "asc",
                        };
                    case "availableCopies":
                        return {
                            availableCopies: sort.desc ? "desc" : "asc",
                        };
                    case "rentedCopies":
                        return {
                            rentedCopies: sort.desc ? "desc" : "asc",
                        };
                    case "pricePerDay":
                        return {
                            pricePerDay: sort.desc ? "desc" : "asc",
                        };
                    default:
                        return {
                            createdAt: "desc",
                        };
                }
            }
        );
    }

    // COLUMN FILTER | SEARCH
    let filtersQuery: Prisma.BookInventoryWhereInput[] = [];

    if (filters) {
        filtersQuery = JSON.parse(filters as string).map(
            (filter: { id: string; value: string }) => {
                switch (filter.id) {
                    case "title":
                        return {
                            book: {
                                title: {
                                    contains: filter.value,
                                    mode: "insensitive",
                                },
                            },
                        };
                    case "username":
                        return {
                            owner: {
                                account: {
                                    username: {
                                        contains: filter.value,
                                        mode: "insensitive",
                                    },
                                },
                            },
                        };
                    default:
                        return null;
                }
            }
        );
    }

    // GLOBAL SEARCH | FILTER
    let globalFilteringQuery: Prisma.BookInventoryWhereInput[] = [];

    if (globalFilter) {
        globalFilteringQuery = [
            {
                book: {
                    title: {
                        contains: globalFilter as string,
                        mode: "insensitive",
                    },
                },
            },
            {
                owner: {
                    account: {
                        username: {
                            contains: globalFilter as string,
                            mode: "insensitive",
                        },
                    },
                },
            },
        ];
    }

    // Prepare the where filter
    const whereFilter: Prisma.BookInventoryWhereInput = {
        AND: [
            accessibleBy(req.ability, "read").BookInventory,
            ...filtersQuery,
            ...(globalFilteringQuery.length > 0
                ? [{ OR: globalFilteringQuery }]
                : []),
        ],
    };

    const totalRowCount = await prisma.bookInventory.count({
        where: whereFilter,
    });

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
        orderBy: sortingQuery,
        skip: startQuery,
        take: sizeQuery,
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

    // prepare payload
    const payload = {
        data: mappedInventory,
        meta: {
            totalRowCount,
        },
    };

    return res.status(200).json(mappedInventory);
};

export default getBooksInventory;
