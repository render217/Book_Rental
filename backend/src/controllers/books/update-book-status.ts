import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { ApprovalStatus, Role } from "@prisma/client";
// import { PrismaClient } from "@prisma/client";
const updateBookStatus = async (req: Request, res: Response) => {
    const user = req.user!;
    const bookId = req.params.id;

    if (!bookId) {
        return res.status(400).json({ error: "bookId is required." });
    }
    // Check if user is an admin
    if (user.role !== Role.ADMIN) {
        return res
            .status(403)
            .json({ error: "Access Denied. You are not authorized." });
    }

    const targetBook = await prisma.bookCatalog.findUnique({
        where: {
            bookId: bookId,
        },
    });

    if (!targetBook) {
        return res.status(404).json({ message: "Book not found." });
    }

    // Update the book status
    const updatedBook = await prisma.bookCatalog.update({
        where: {
            bookId: bookId,
        },
        data: {
            status:
                targetBook.status === ApprovalStatus.APPROVED
                    ? ApprovalStatus.REJECTED
                    : ApprovalStatus.APPROVED,
        },
    });

    const msg =
        updatedBook.status === ApprovalStatus.APPROVED
            ? "approved"
            : "rejected";

    return res.status(200).json({
        message: `Book ${msg} successfully.`,
        data: updatedBook,
    });
};
export default updateBookStatus;
