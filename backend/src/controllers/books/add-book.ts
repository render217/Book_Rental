import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus, Owner } from "@prisma/client";
import { ForbiddenError, subject } from "@casl/ability";
const addBook = async (req: Request, res: Response) => {
    const { title, author, category } = req.body;
    const user = req.user!;

    // Check if user is an owner and ensure they are approved and active
    ForbiddenError.from(req.ability).throwUnlessCan(
        "create-book-catalog",
        subject("User", user)
    );

    // if (user.role === Role.OWNER) {
    //     if (!user.isApproved) {
    //         return res
    //             .status(403)
    //             .json({ error: "Access Denied. You are not approved yet." });
    //     }
    //     if (user?.status === OwnerStatus.DISABLED) {
    //         return res
    //             .status(403)
    //             .json({ error: "Access Denied. Your account is disabled." });
    //     }
    // }

    // if role is admin then add book with approved status
    if (user.role === Role.ADMIN) {
        const newBookCatalog = await prisma.bookCatalog.create({
            data: {
                title,
                category,
                author,
                status: ApprovalStatus.APPROVED,
            },
        });

        return res.status(200).json({
            message: "Book added successfully and available for rent.",
            data: newBookCatalog,
        });
    }

    // Create book catalog entry
    const newBookCatalog = await prisma.bookCatalog.create({
        data: {
            title,
            category,
            author,
            status: ApprovalStatus.PENDING,
            uploaderId: user.id,
        },
    });

    return res.status(200).json({
        message: "Book added successfully and waiting for approval.",
        data: newBookCatalog,
    });
};
export default addBook;
