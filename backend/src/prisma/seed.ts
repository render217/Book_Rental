import { PrismaClient, ApprovalStatus, Role } from "@prisma/client";
import path from "node:path";
import fs from "node:fs";
import { hashSync, compareSync } from "bcrypt";
const prisma = new PrismaClient();

export const bookJSON = path.join(__dirname, "books.json");
export const bookSeedData = fs.readFileSync(bookJSON, "utf-8");

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
                password: hashSync("admin@123", 10),
                email: "admin@gmail.com",
                role: Role.ADMIN,
                location: "Admin Location",
                phoneNumber: "1234567890",
            },
        });
        const adminProfile = await prisma.admin.create({
            data: {
                accountId: account.accountId,
            },
            include: {
                account: true,
            },
        });
        console.log("Admin account created:", adminProfile);
    } catch (error) {
        console.error("Error seeding admin:", error);
    } finally {
        await prisma.$disconnect();
    }
}
seedAdmin();
seedBooks();
