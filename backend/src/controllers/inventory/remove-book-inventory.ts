import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus } from "@prisma/client";
import { mapBookInventory } from "../../utils/mapper";

const removeBookInventory = async (req: Request, res: Response) => {
    const user = req.user!;
    const { noOfCopiesToRemove, allCopies } = req.body;
    const bookInventoryId = req.params.id;

    if (!bookInventoryId) {
        return res
            .status(400)
            .json({ message: "Book Inventory ID is required." });
    }

    const bookInventory = await prisma.bookInventory.findUnique({
        where: { bookInventoryId: bookInventoryId },
        include: {
            book: true,
            owner: {
                include: {
                    account: true,
                },
            },
        },
    });

    if (!bookInventory) {
        return res.status(404).json({ message: "Book inventory not found." });
    }

    // Check ownership and permission
    if (user.role !== Role.OWNER && bookInventory.ownerId !== user.id) {
        return res.status(403).json({ message: "Unauthorized." });
    }

    // Validate: If 'allCopies' is true, skip validation for 'noOfCopiesToRemove'
    if (allCopies) {
        // pass
    } else if (!noOfCopiesToRemove) {
        return res.status(400).json({
            message: "Please provide 'noOfCopiesToRemove'.",
        });
    }

    // Handle removing all copies
    if (allCopies) {
        // If there are rented copies only remove available copies
        if (bookInventory.rentedCopies > 0) {
            const updatedInventory = await prisma.bookInventory.update({
                where: { bookInventoryId: bookInventoryId },
                data: {
                    availableCopies: 0, // All available copies are removed
                    totalCopies: bookInventory.rentedCopies,
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
            const mappedInventoryBook = mapBookInventory(
                updatedInventory,
                updatedInventory.book,
                updatedInventory.owner,
                updatedInventory.owner.account
            );
            return res.status(200).json({
                message:
                    "All available copies are removed, only rented copies remain.",
                payload: mappedInventoryBook,
            });
        } else {
            // remove all copies and delete the inventory
            await prisma.bookInventory.delete({
                where: { bookInventoryId: bookInventoryId },
            });
            return res.status(200).json({
                message: "All copies are deleted",
                payload: null,
            });
        }
    }

    // Handle specific number of copies to remove
    const noOfCopiesToRemoveNum = parseInt(noOfCopiesToRemove);

    if (
        !Number.isSafeInteger(noOfCopiesToRemoveNum) ||
        noOfCopiesToRemoveNum <= 0
    ) {
        return res
            .status(400)
            .json({ message: "Invalid number of copies to remove." });
    }

    // Check if there are enough available copies to remove
    if (noOfCopiesToRemoveNum > bookInventory.availableCopies) {
        return res.status(400).json({
            message: `Not enough available copies. You can remove up to ${bookInventory.availableCopies} copies.`,
        });
    }

    // Update the inventory by removing copies
    const updatedAvailableCopies =
        bookInventory.availableCopies - noOfCopiesToRemoveNum;
    const updatedTotalCopies =
        bookInventory.totalCopies - noOfCopiesToRemoveNum;

    // Update the book inventory record
    const updatedInventory = await prisma.bookInventory.update({
        where: { bookInventoryId: bookInventoryId },
        data: {
            availableCopies: updatedAvailableCopies,
            totalCopies:
                updatedTotalCopies < bookInventory.rentedCopies
                    ? bookInventory.rentedCopies
                    : updatedTotalCopies, // Ensure totalCopies doesn't go below rentedCopies
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

    // If all copies are removed, check if it needs to be deleted
    if (
        updatedInventory.availableCopies === 0 &&
        updatedInventory.rentedCopies === 0
    ) {
        await prisma.bookInventory.delete({
            where: { bookInventoryId: bookInventoryId },
        });
        return res.status(200).json({
            message: "No copies left, inventory deleted.",
            payload: null,
        });
    }

    const mappedInventoryBook = mapBookInventory(
        updatedInventory,
        updatedInventory.book,
        updatedInventory.owner,
        updatedInventory.owner.account
    );

    return res.status(200).json({
        message: `${noOfCopiesToRemoveNum} copies removed from the inventory.`,
        payload: mappedInventoryBook,
    });
};
export default removeBookInventory;
