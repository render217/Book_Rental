import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus } from "@prisma/client";
import { mapToPublicUser } from "../../utils/mapper";
const getRentals = async (req: Request, res: Response) => {
    const user = req.user!;

    const rentals = await prisma.bookRental.findMany({
        where: {
            renterId: user.id,
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
    const mappedRentals = rentals.map((rental) => {
        const bookRental = {
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
        return bookRental;
    });

    return res.status(200).json(mappedRentals);
};
export default getRentals;
