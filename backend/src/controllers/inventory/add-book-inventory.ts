import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus } from "@prisma/client";
import { ForbiddenError, subject } from "@casl/ability";
import ApiError from "../../utils/api-error";
const addBookInventory = async (req: Request, res: Response) => {
    const owner = req.user!;
    const { bookId, totalCopies, pricePerDay } = req.body;

    // if (owner.role !== Role.OWNER) {
    //     return res
    //         .status(403)
    //         .json({ message: "You are not authorized to add book." });
    // }

    // if (owner.status === OwnerStatus.DISABLED) {
    //     return res.status(400).json({ message: "Your account disabled." });
    // }

    ForbiddenError.from(req.ability).throwUnlessCan(
        "create-inventory",
        subject("User", owner)
    );

    const targetBook = await prisma.bookCatalog.findFirst({
        where: {
            bookId: bookId || "",
            status: ApprovalStatus.APPROVED,
        },
    });

    if (!targetBook) {
        throw new ApiError(404, "Book is not available.");
    }

    // check if book already exists in inventory

    const existingBook = await prisma.bookInventory.findFirst({
        where: {
            AND: [{ bookId: targetBook.bookId }, { ownerId: owner.id }],
        },
    });
    console.log({ existingBook, owner });
    if (existingBook !== null) {
        // throw new ApiError(400, "Book already exists in your inventory.");
        return res
            .status(400)
            .json({ message: "Book already exists in your inventory." });
    }

    const newBookInventory = await prisma.bookInventory.create({
        data: {
            bookId: targetBook.bookId,
            ownerId: owner.id,
            totalCopies: totalCopies,
            availableCopies: totalCopies,
            rentedCopies: 0,
            pricePerDay: pricePerDay,
        },
    });

    return res.status(200).json({
        message: "Book added to inventory successfully.",
        data: newBookInventory,
    });
};

export default addBookInventory;
