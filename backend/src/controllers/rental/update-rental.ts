import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import {
    Role,
    OwnerStatus,
    ApprovalStatus,
    RentalStatus,
} from "@prisma/client";
import { mapToPublicUser } from "../../utils/mapper";
import { accessibleBy } from "@casl/prisma";
const updateRentals = async (req: Request, res: Response) => {
    const user = req.user!;
    const rentalId = req.params.id;

    if (!rentalId) {
        return res.status(400).json({
            message: "Rental id is required.",
        });
    }

    const rental = await prisma.bookRental.findFirst({
        where: {
            AND: [
                accessibleBy(req.ability).BookRental,
                {
                    rentalId: rentalId,
                },
                // {
                //     renterId: user.id,
                // },
            ],
        },
    });

    if (!rental) {
        return res.status(404).json({
            message: "Rental not found.",
        });
    }

    if (rental.status === RentalStatus.RETURNED) {
        return res.status(400).json({
            message: "Book already returned.",
        });
    }

    const updatedRental = await prisma.bookRental.update({
        where: {
            rentalId: rental.rentalId,
        },
        data: {
            status: RentalStatus.RETURNED,
            returnDate: new Date(),
        },
        include: {
            bookInventory: {
                include: {
                    book: true,
                    owner: {
                        include: {
                            account: true,
                        },
                    },
                },
            },
        },
    });

    await prisma.bookInventory.update({
        where: {
            bookInventoryId: updatedRental.bookInventoryId,
        },
        data: {
            availableCopies:
                updatedRental.bookInventory.availableCopies +
                updatedRental.rentedCopies,
            rentedCopies:
                updatedRental.bookInventory.rentedCopies -
                updatedRental.rentedCopies,
        },
    });

    const mappedRental = {
        rentalId: updatedRental.rentalId,
        bookId: updatedRental.bookInventoryId,
        book: {
            title: updatedRental.bookInventory.book.title,
            author: updatedRental.bookInventory.book.author,
            category: updatedRental.bookInventory.book.category,
        },
        owner: mapToPublicUser(updatedRental.bookInventory.owner.account),
        rentedCopies: updatedRental.rentedCopies,
        totalDays: updatedRental.totalDays,
        totalPrice: updatedRental.totalPrice,
        rentalStartDate: updatedRental.rentalStartDate,
        rentalEndDate: updatedRental.rentalEndDate,
        returnDate: updatedRental.returnDate,
        status: updatedRental.status,
    };
    return res.status(200).json(mappedRental);
};
export default updateRentals;
