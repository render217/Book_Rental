import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import {
    mapAdminToUser,
    mapOwnerToUser,
    mapRenterToUser,
    mapUser,
} from "../../utils/mapper";
import { defineAbilitiesFor } from "../../config/abilities";
import ApiError from "../../utils/api-error";
import { User } from "../../utils/types";
const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        throw new ApiError(400, "Please fill in all fields");
    }

    // check account exists
    const account = await prisma.account.findUnique({
        where: {
            email,
        },
    });
    // check password
    const isPasswordValid = compareSync(password, account?.password! || "");

    if (!account || !isPasswordValid) {
        throw new ApiError(400, "Invalid email or password");
    }

    let user: User | null = null;
    switch (account.role) {
        case Role.OWNER:
            const owner = await prisma.owner.findFirst({
                where: {
                    accountId: account.accountId,
                },
                include: {
                    account: true,
                },
            });
            if (!owner) {
                throw new ApiError(400, "Invalid email or password");
            }

            // user = mapOwnerToUser(owner, account);
            user = mapUser(owner.account, owner) as User;

            break;
        case Role.RENTER:
            const renter = await prisma.renter.findFirst({
                where: {
                    accountId: account.accountId,
                },
                include: {
                    account: true,
                },
            });
            if (!renter) {
                throw new ApiError(400, "Invalid email or password");
            }
            // user = mapRenterToUser(renter, account);
            user = mapUser(renter.account, null, null, renter) as User;
            break;
        case Role.ADMIN:
            const admin = await prisma.admin.findFirst({
                where: {
                    accountId: account.accountId,
                },
                include: {
                    account: true,
                },
            });

            if (!admin) {
                throw new ApiError(400, "Invalid email or password");
            }
            // user = mapAdminToUser(admin, account);
            user = mapUser(admin.account, null, admin) as User;
            break;
        default:
            throw new ApiError(500, "Something went wrong while login");
    }

    const token = jwt.sign(
        { id: user!.id, role: user!.role },
        process.env.JWT_SECRET!
    );
    const rules = defineAbilitiesFor(user);
    res.status(200).json({
        token,
        user,
        rules: rules,
    });
};

export default loginUser;
