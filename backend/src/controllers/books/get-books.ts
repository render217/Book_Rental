import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { mapOwnerToUser } from "../../utils/mapper";
import { Role, ApprovalStatus, Prisma } from "@prisma/client";
import { accessibleBy } from "@casl/prisma";
const getBooks = async (req: Request, res: Response) => {
    const user = req.user!;
    const { globalFilter, start, size, filters, sorting } = req.query;

    // let sorting = [{ id: "author", desc: false }];
    // let filters = [{ id: "title", value: "something" }];
    // let globalFilter = "something";

    // PAGINATION
    let startQuery = Number(start) || 0;
    let sizeQuery = Number(size) || 10;

    // COLUMN SORTING
    let sortingQuery: Prisma.BookCatalogOrderByWithRelationInput[] = [];

    if (sorting) {
        sortingQuery = JSON.parse(sorting as string).map((sort: any) => ({
            [sort.id]: sort.desc ? "desc" : "asc",
        }));
    }

    // COLUMN FILTER
    let filtersQuery: Prisma.BookCatalogWhereInput[] = [];

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

    // GLOBAL SEARCH
    let globalFilteringQuery: Prisma.BookCatalogWhereInput[] = [];

    if (globalFilter) {
        globalFilteringQuery = [
            {
                title: {
                    contains: globalFilter as string,
                    mode: "insensitive",
                },
            },
            {
                author: {
                    contains: globalFilter as string,
                    mode: "insensitive",
                },
            },
            {
                category: {
                    contains: globalFilter as string,
                    mode: "insensitive",
                },
            },
        ];
    }

    const where: Prisma.BookCatalogWhereInput = {
        AND: [
            accessibleBy(req.ability).BookCatalog,
            ...filtersQuery,
            ...(globalFilteringQuery.length > 0
                ? [{ OR: globalFilteringQuery }]
                : []),
        ],
    };

    const totalRowCount = await prisma.bookCatalog.count({
        where,
    });

    const books = await prisma.bookCatalog.findMany({
        where: where,
        include: {
            uploader: {
                include: {
                    account: true,
                },
            },
        },
        skip: startQuery,
        take: sizeQuery,
        orderBy: sortingQuery,
    });

    // Map books data
    const mappedBooks = books.map((book) => {
        const bookData: any = {
            id: book.bookId,
            title: book.title,
            author: book.author,
            category: book.category,
            status: book.status,
            uploader: book.uploader
                ? mapOwnerToUser(book.uploader, book.uploader.account)
                : null,
        };
        return bookData;
    });

    // return response.
    const payload = {
        data: mappedBooks,
        meta: {
            totalRowCount,
        },
    };
    res.status(200).json(mappedBooks);
};

export default getBooks;
