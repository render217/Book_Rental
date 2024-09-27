import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import {
    Role,
    OwnerStatus,
    ApprovalStatus,
    RentalStatus,
} from "@prisma/client";
const addRental = async (req: Request, res: Response) => {
    const user = req.user!;
    const { bookInventoryId, noOfDays, quantity } = req.body;

    // simple validation.
    if (!noOfDays || !quantity) {
        return res.status(400).json({
            message: "All fields are required.",
        });
    }

    const noOfDaysNum = parseInt(noOfDays);
    const quantityNum = parseInt(quantity);

    if (
        isNaN(noOfDaysNum) ||
        noOfDays < 0 ||
        isNaN(quantityNum) ||
        quantityNum < 0
    ) {
        return res.status(400).json({
            message: "Invalid input.",
        });
    }

    if (quantityNum < 1) {
        return res.status(400).json({
            message: "You must rent at least one quantity.",
        });
    }

    const bookInventory = await prisma.bookInventory.findUnique({
        where: {
            bookInventoryId: bookInventoryId,
        },
        include: {
            book: true,
            owner: true,
        },
    });

    if (!bookInventory) {
        return res.status(404).json({
            message: "Book inventory not found.",
        });
    }

    if (bookInventory.availableCopies < quantityNum) {
        return res.status(400).json({
            message: `Not enough copies available.\nTry less than ${bookInventory.availableCopies} quantity.`,
        });
    }

    // calculate the start and end date.
    const rentalStartDateTime = new Date();
    const rentalEndDateTime = new Date(
        rentalStartDateTime.getTime() + noOfDaysNum * 24 * 60 * 60 * 1000
    );

    const totalPriceOfBook =
        quantityNum * (noOfDaysNum * bookInventory.pricePerDay);

    // create the rental-entry.
    const newRental = await prisma.bookRental.create({
        data: {
            bookInventoryId: bookInventoryId,
            renterId: user.id,
            rentedCopies: quantityNum,
            totalDays: noOfDaysNum,
            totalPrice: totalPriceOfBook,
            rentalStartDate: rentalStartDateTime,
            rentalEndDate: rentalEndDateTime,
            status: RentalStatus.RENTED,
        },
    });

    // update the book inventory.
    await prisma.bookInventory.update({
        where: {
            bookInventoryId: bookInventoryId,
        },
        data: {
            availableCopies: bookInventory.availableCopies - quantityNum,
            rentedCopies: bookInventory.rentedCopies + quantityNum,
        },
    });

    const OwnerRevenue = await prisma.revenue.findFirst({
        where: {
            ownerId: bookInventory.owner.ownerId,
            bookInventoryId: bookInventory.bookInventoryId,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        },
    });

    // update the book owners revenue.
    if (OwnerRevenue) {
        await prisma.revenue.update({
            where: {
                revenueId: OwnerRevenue.revenueId,
            },
            data: {
                totalRentals: { increment: 1 },
                totalRevenue: { increment: totalPriceOfBook },
                totalQuantityRented: { increment: quantityNum },
            },
        });
    } else {
        await prisma.revenue.create({
            data: {
                ownerId: bookInventory.owner.ownerId,
                bookInventoryId: bookInventory.bookInventoryId,
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                totalRentals: 1,
                totalRevenue: totalPriceOfBook,
                totalQuantityRented: quantityNum,
            },
        });
    }

    return res.status(200).json({
        message: "you rented  successfully.",
        data: newRental,
    });
};
export default addRental;
