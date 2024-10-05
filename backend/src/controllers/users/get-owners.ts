import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { mapOwnerToUser } from "../../utils/mapper";
import { ForbiddenError, subject } from "@casl/ability";
import { Prisma } from "@prisma/client";
const getOwners = async (req: Request, res: Response) => {
    ForbiddenError.from(req.ability).throwUnlessCan(
        "manage",
        subject("User", req.user!)
    );

    const { globalFilter, start, size, filters, sorting } = req.query;

    // PAGINATION
    let startQuery = Number(start) || 0;
    let sizeQuery = Number(size) || 10;

    // COLUMN SORTING
    let sortingQuery: Prisma.OwnerOrderByWithRelationInput[] = [
        { account: { createdAt: "desc" } },
    ];

    if (sorting) {
        sortingQuery = JSON.parse(sorting as string).map(
            (sort: { id: string; desc: boolean }) => ({
                account: {
                    [sort.id]: sort.desc ? "desc" : "asc",
                },
            })
        );
    }

    // COLUMN FILTER | SEARCH
    let filtersQuery: Prisma.AccountWhereInput[] = [];

    if (filters) {
        filtersQuery = JSON.parse(filters as string).map(
            (filter: { id: string; value: string }) => ({
                [filter.id]: {
                    contains: filter.value,
                    mode: "insensitive",
                },
            })
        );
    }

    // GLOBAL FILTER |  SEARCH

    let globalFilteringQuery: Prisma.AccountWhereInput[] = [];

    if (globalFilter) {
        globalFilteringQuery = [
            {
                username: {
                    contains: globalFilter as string,
                    mode: "insensitive",
                },
            },
            {
                location: {
                    contains: globalFilter as string,
                    mode: "insensitive",
                },
            },
        ];
    }

    // Prepare Where Filter
    const whereFilter: Prisma.AccountWhereInput = {
        AND: [
            ...filtersQuery,
            ...(globalFilteringQuery.length > 0
                ? [{ OR: globalFilteringQuery }]
                : []),
        ],
    };

    const totalRowCount = await prisma.owner.count({
        where: {
            account: whereFilter,
        },
    });

    const owners = await prisma.owner.findMany({
        where: {
            account: whereFilter,
        },
        include: {
            account: true,
        },
        skip: startQuery,
        take: sizeQuery,
        orderBy: sortingQuery,
    });

    // map owners
    const mappedOwners = owners.map((owner) =>
        mapOwnerToUser(owner, owner.account)
    );

    // prepare payload
    const payload = {
        data: mappedOwners,
        meta: {
            totalRowCount,
        },
    };

    res.status(200).json(payload);
};
export default getOwners;
