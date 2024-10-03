import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { mapOwnerToUser } from "../../utils/mapper";

import { Role } from "@prisma/client";
import { accessibleBy } from "@casl/prisma";
import ApiError from "../../utils/api-error";
const getBookDetail = async (req: Request, res: Response) => {
    const user = req.user!;
    const bookId = req.params.id;

    if (!bookId) {
        throw new ApiError(400, "Book id is required.");
    }

    const book = await prisma.bookCatalog.findFirst({
        where: {
            AND: [accessibleBy(req.ability).BookCatalog, { bookId: bookId }],
        },
        include: {
            uploader: {
                include: {
                    account: true,
                },
            },
        },
    });

    if (!book) {
        throw new ApiError(404, "Book not found.");
    }

    // Prepare the response data
    const mappedBook: any = {
        id: book.bookId,
        title: book.title,
        author: book.author,
        category: book.category,
    };

    // Include 'status' and 'uploader' only if the user is an admin
    if (user.role === Role.ADMIN) {
        mappedBook.status = book.status;
        mappedBook.uploader = book.uploader
            ? mapOwnerToUser(book.uploader, book.uploader.account)
            : null;
    }

    return res.status(200).json(mappedBook);
};

export default getBookDetail;
