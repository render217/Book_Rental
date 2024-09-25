import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
import { prisma } from "../../prisma/db";
import { Role, ApprovalStatus } from "@prisma/client";
import { mapOwnerToUser } from "../../utils/mapper";

const searchBooks = async (req: Request, res: Response) => {
    const user = req.user!;
    const { q } = req.query;

    // Create search filters based on 'q'
    const filters: any = {
        AND: [],
    };

    if (q) {
        filters.AND.push({
            OR: [
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
            ],
        });
    }

    // Add role-based filtering
    if (user.role === Role.RENTER || user.role === Role.OWNER) {
        // For renters or owners, only return books that are approved
        filters.AND.push({
            status: ApprovalStatus.APPROVED,
        });
    }

    const books = await prisma.bookCatalog.findMany({
        where: filters,
        include: {
            uploader: {
                include: {
                    account: true,
                },
            },
        },
    });

    // Map books data based on user role
    const mappedBooks = books.map((book) => {
        const bookData: any = {
            id: book.bookId,
            title: book.title,
            author: book.author,
            category: book.category,
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
export default searchBooks;
