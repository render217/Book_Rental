import { Request, Response } from "express";
import { prisma } from "../../../prisma/db";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
const registerUser = async (req: Request, res: Response) => {
    const { email, password, phoneNumber, location, role, username } = req.body;

    // validation
    if (
        !email ||
        !password ||
        !phoneNumber ||
        !location ||
        !role ||
        !username
    ) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    // check if user already exists
    const existAccount = await prisma.account.findFirst({
        where: {
            email,
        },
    });

    if (existAccount) {
        return res.status(400).json({ message: "Email already exists" });
    }

    // create user
    const newAccount = await prisma.account.create({
        data: {
            username,
            email,
            password: hashSync(password, 10),
            phoneNumber,
            location,
            role,
        },
    });

    if (newAccount.role === Role.OWNER) {
        await prisma.owner.create({
            data: {
                accountId: newAccount.accountId,
            },
        });
    } else if (newAccount.role === Role.RENTER) {
        await prisma.renter.create({
            data: {
                accountId: newAccount.accountId,
            },
        });
        //   don't forget to comment it admin role should be seeded in db manually
    } else if (newAccount.role === Role.ADMIN) {
        await prisma.admin.create({
            data: {
                accountId: newAccount.accountId,
            },
        });
    }
    res.status(201).json({ message: "Account created" });
};

export default registerUser;
