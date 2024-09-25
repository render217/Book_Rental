import { Request, Response } from "express";
import { prisma } from "../../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus } from "@prisma/client";
import { mapToPublicUser } from "../../utils/mapper";
const getRentalDetail = async (req: Request, res: Response) => {
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
                {
                    rentalId: rentalId,
                },
                {
                    renterId: user.id,
                },
            ],
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

    if (!rental) {
        return res.status(404).json({
            message: "Rental not found.",
        });
    }

    const mappedRental = {
        rentalId: rental.rentalId,
        bookId: rental.bookInventoryId,
        book: {
            title: rental.bookInventory.book.title,
            author: rental.bookInventory.book.author,
            category: rental.bookInventory.book.category,
        },
        owner: mapToPublicUser(rental.bookInventory.owner.account),
        rentedCopies: rental.rentedCopies,
        totalDays: rental.totalDays,
        totalPrice: rental.totalPrice,
        rentalStartDate: rental.rentalStartDate,
        rentalEndDate: rental.rentalEndDate,
        returnDate: rental.returnDate,
        status: rental.status,
    };

    return res.status(200).json(mappedRental);
};
export default getRentalDetail;
