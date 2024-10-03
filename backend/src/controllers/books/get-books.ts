import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { mapOwnerToUser } from "../../utils/mapper";
import { Role, ApprovalStatus, Prisma } from "@prisma/client";
import { accessibleBy } from "@casl/prisma";
const getBooks = async (req: Request, res: Response) => {
    const user = req.user!;
    const { q } = req.query;

    // Create search filters based on 'q'
    const filters:
        | Prisma.BookCatalogWhereInput
        | Prisma.BookCatalogWhereInput[] = {
        AND: [accessibleBy(req.ability).BookCatalog],
    };

    if (q) {
        filters.OR = [
            {
                title: {
                    contains: q as string,
                    mode: "insensitive",
                },
            },
            {
                author: {
                    contains: q as string,
                    mode: "insensitive",
                },
            },
            {
                category: {
                    contains: q as string,
                    mode: "insensitive",
                },
            },
        ];
    }

    // ABILITY USED INSTEAD..

    // if (user.role === Role.RENTER || user.role === Role.OWNER) {
    //     // For renters or owners, only return books that are approved
    //     if (Array.isArray(filters.AND)) {
    //         filters.AND.push({
    //             status: ApprovalStatus.APPROVED,
    //         });
    //     } else {
    //         filters.AND = [{ status: ApprovalStatus.APPROVED }];
    //     }
    // }

    const books = await prisma.bookCatalog.findMany({
        where: filters,
        include: {
            uploader: {
                include: {
                    account: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Map books data based on user role
    const mappedBooks = books.map((book) => {
        const bookData: any = {
            id: book.bookId,
            title: book.title,
            author: book.author,
            category: book.category,
            status: book.status,
        };

        // Only include status and uploader for admin
        if (user.role === Role.ADMIN) {
            bookData.status = book.status;
            bookData.uploader = book.uploader
                ? mapOwnerToUser(book.uploader, book.uploader.account)
                : null;
        }

        return bookData;
    });

    res.status(200).json(mappedBooks);
};

export default getBooks;
