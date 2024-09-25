import { Request, Response } from "express";
import { prisma } from "../../../prisma/db";
import { mapOwnerToUser } from "../../utils/mapper";

import { Role } from "@prisma/client";
const getBookDetail = async (req: Request, res: Response) => {
    const user = req.user!;
    const bookId = req.params.id;

    if (!bookId) {
        return res.status(400).json({ message: "Book id is required." });
    }

    const book = await prisma.bookCatalog.findUnique({
        where: {
            bookId: bookId,
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
        return res.status(404).json({ message: "Book not found." });
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
