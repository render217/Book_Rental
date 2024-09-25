import path from "node:path";
import fs from "node:fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma };

export const bookJSON = path.join(__dirname, "books.json");
export const bookSeedData = fs.readFileSync(bookJSON, "utf-8");
