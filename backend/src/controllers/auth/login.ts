import { Request, Response } from "express";
import { prisma } from "../../../prisma/db";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import {
    mapAdminToUser,
    mapOwnerToUser,
    mapRenterToUser,
} from "../../utils/mapper";
const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill in all fields",
        });
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
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    let user;
    switch (account.role) {
        case Role.OWNER:
            const owner = await prisma.owner.findFirst({
                where: {
                    accountId: account.accountId,
                },
            });
            if (!owner) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }

            user = mapOwnerToUser(owner, account);
            break;
        case Role.RENTER:
            const renter = await prisma.renter.findFirst({
                where: {
                    accountId: account.accountId,
                },
            });
            if (!renter) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }
            user = mapRenterToUser(renter, account);
            break;
        case Role.ADMIN:
            const admin = await prisma.admin.findFirst({
                where: {
                    accountId: account.accountId,
                },
            });

            if (!admin) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }
            user = mapAdminToUser(admin, account);
            break;
        default:
            res.status(500).json({
                message: "Something went wrong while login",
            });
    }
    console.log("login ctrl: ", { user });

    const token = jwt.sign(
        { id: user!.id, role: user!.role },
        process.env.JWT_SECRET!
    );

    res.status(200).json({
        token,
        user,
        rules: [],
    });
};

export default loginUser;
