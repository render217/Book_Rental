import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { ApprovalStatus, Role } from "@prisma/client";
import { ForbiddenError, subject } from "@casl/ability";
import ApiError from "../../utils/api-error";

// import { PrismaClient } from "@prisma/client";
const updateBookStatus = async (req: Request, res: Response) => {
    const user = req.user!;
    const bookId = req.params.id;

    if (!bookId) {
        throw new ApiError(400, "Book id is required.");
    }
    // Check if user is an admin
    // if (user.role !== Role.ADMIN) {
    //     return res
    //         .status(403)
    //         .json({ error: "Access Denied. You are not authorized." });
    // }

    // Check if user is authorized to update book status
    ForbiddenError.from(req.ability)
        .setMessage("Access Denied.")
        .throwUnlessCan("update-book-catalog-status", subject("User", user));

    const targetBook = await prisma.bookCatalog.findUnique({
        where: {
            bookId: bookId,
        },
    });

    if (!targetBook) {
        throw new ApiError(404, "Book not found.");
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
