import { PrismaClient, ApprovalStatus, Role } from "@prisma/client";
import { bookJSON, bookSeedData } from "./db";
const prisma = new PrismaClient();

// Function to seed books
async function seedBooks() {
    try {
        const books = JSON.parse(bookSeedData);
        for (const book of books) {
            // Check if the book already exists based on title and author
            const existingBook = await prisma.bookCatalog.findFirst({
                where: {
                    title: book.title,
                    author: book.author,
                },
            });

            // If the book does not exist, insert it
            if (!existingBook) {
                await prisma.bookCatalog.create({
                    data: {
                        title: book.title,
                        author: book.author,
                        category: book.category,
                        status: ApprovalStatus.APPROVED, // Set status to APPROVED
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                });
                console.log(`Inserted book: ${book.title}`);
            } else {
                console.log(`Skipped book (already exists): ${book.title}`);
            }
        }

        console.log("Book seeding process completed.");
    } catch (error) {
        console.error("Error seeding books:", error);
    } finally {
        await prisma.$disconnect();
    }
}

async function seedAdmin() {
    try {
        const existingAdmin = await prisma.account.findFirst({
            where: {
                role: Role.ADMIN,
                email: "admin@gmail.com",
            },
        });
        if (existingAdmin) {
            console.log("Admin account already exists. Skipping seeding.");
            return;
        }
        const account = await prisma.account.create({
            data: {
                username: "admin",
                password: "admin@123",
                email: "admin@gmail.com",
                role: Role.ADMIN,
                location: "Admin Location",
                phoneNumber: "1234567890",
            },
        });
        console.log("Admin account created:", account);
    } catch (error) {
        console.error("Error seeding admin:", error);
    } finally {
        await prisma.$disconnect();
    }
}
seedAdmin();
seedBooks();
