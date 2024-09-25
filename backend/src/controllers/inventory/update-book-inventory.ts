import { Request, Response } from "express";
import { prisma } from "../../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus } from "@prisma/client";
import { mapOwnerToUser } from "../../utils/mapper";
const updateBookInventory = async (req: Request, res: Response) => {
    const user = req.user!;

    const bookInventoryId = req.params.id;

    if (!bookInventoryId) {
        return res
            .status(400)
            .json({ message: "Book Inventory ID is required." });
    }

    const bookInventory = await prisma.bookInventory.findUnique({
        where: {
            bookInventoryId: bookInventoryId,
        },
    });

    if (!bookInventory) {
        return res.status(404).json({ message: "Book inventory not found." });
    }

    if (user.role !== Role.OWNER && bookInventory.ownerId !== user.id) {
        return res.status(403).json({ message: "Unauthorized." });
    }

    const { pricePerDay, noOfCopies } = req.body;

    if (!pricePerDay || !noOfCopies) {
        return res
            .status(400)
            .json({ message: "Price per day and no of copies are required." });
    }

    const pricePerDayNum = parseFloat(pricePerDay);
    const NoofCopiesNum = parseInt(noOfCopies);

    if (
        !Number.isSafeInteger(NoofCopiesNum) ||
        !Number.isSafeInteger(pricePerDayNum)
    ) {
        return res.status(400).json({ message: "Invalid price or quantity." });
    }
    if (NoofCopiesNum && NoofCopiesNum < 0) {
        return res.status(400).json({ message: "Invalid quantity." });
    }
    if (!pricePerDayNum && pricePerDayNum < 0) {
        return res.status(400).json({ message: "Invalid price." });
    }

    const updatedTotalCopies = bookInventory.totalCopies + NoofCopiesNum;
    const updatedAvailableCopies =
        updatedTotalCopies - bookInventory.rentedCopies;

    const updatedInventory = await prisma.bookInventory.update({
        where: {
            bookInventoryId: bookInventoryId,
        },
        data: {
            pricePerDay: pricePerDayNum,
            totalCopies: updatedTotalCopies,
            availableCopies: updatedAvailableCopies,
        },
        include: {
            book: true,
            owner: {
                include: {
                    account: true,
                },
            },
        },
    });

    const mappedInventory = {
        id: updatedInventory.bookInventoryId,
        title: updatedInventory.book.title,
        totalCopies: updatedInventory.totalCopies,
        availableCopies: updatedInventory.availableCopies,
        rentedCopies: updatedInventory.rentedCopies,
        pricePerDay: updatedInventory.pricePerDay,
        owner: mapOwnerToUser(
            updatedInventory.owner,
            updatedInventory.owner.account
        ), // Map owner data
    };

    return res.status(200).json(mappedInventory);
};

export default updateBookInventory;
