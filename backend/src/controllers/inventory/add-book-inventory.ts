import { Request, Response } from "express";
import { prisma } from "../../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus } from "@prisma/client";
const addBookInventory = async (req: Request, res: Response) => {
    const owner = req.user!;
    const { bookId, totalCopies, pricePerDay } = req.body;

    if (!bookId || !totalCopies || !pricePerDay) {
        return res
            .status(400)
            .json({ error: "Please provide all required fields." });
    }

    if (owner.role !== Role.OWNER) {
        return res
            .status(403)
            .json({ message: "You are not authorized to add book." });
    }

    if (owner.status === OwnerStatus.DISABLED) {
        return res.status(400).json({ message: "Your account disabled." });
    }

    const targetBook = await prisma.bookCatalog.findFirst({
        where: {
            bookId: bookId,
            status: ApprovalStatus.APPROVED,
        },
    });
    console.log(targetBook);
    if (!targetBook) {
        return res.status(404).json({ message: "Book is not available." });
    }

    // check if book already exists in inventory

    const existingBook = await prisma.bookInventory.findFirst({
        where: {
            bookId: bookId,
            ownerId: owner.id,
        },
    });

    if (existingBook) {
        return res.status(400).json({
            message: "Book already exists in your inventory.",
        });
    }

    const newBookInventory = await prisma.bookInventory.create({
        data: {
            bookId: bookId,
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
