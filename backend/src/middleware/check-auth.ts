import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/db";
import { Role } from "@prisma/client";
import {
    mapAdminToUser,
    mapOwnerToUser,
    mapRenterToUser,
    mapUser,
} from "../utils/mapper";
import { IUser, User } from "../utils/types";
import { AppAbility, defineAbilitiesFor } from "../config/abilities";

declare global {
    namespace Express {
        interface Request {
            userId: string | undefined;
            role: Role | undefined;
            user: User | undefined;
            ability: AppAbility;
        }
    }
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log("CheckAuth:Middleware: Token", token ? true : false);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // check if the token is valid
    const tokenVal = token.split(" ")[1];

    try {
        const decoded = jwt.verify(tokenVal, process.env.JWT_SECRET!);
        // console.log("CheckAuth:Middleware: DecodedToken", decoded);

        const reqUserId = (decoded as { id: string; role: Role }).id;
        const reqRole = (decoded as { id: string; role: Role }).role;

        req.userId = reqUserId;
        req.role = reqRole;
        let user: User;
        switch (reqRole) {
            case Role.OWNER:
                const owner = await prisma.owner.findUnique({
                    where: {
                        ownerId: reqUserId,
                    },
                    include: {
                        account: true,
                    },
                });
                if (!owner) {
                    return res.status(401).json({
                        message: "Unauthorized.(no owner found)",
                    });
                }
                // user = mapOwnerToUser(owner, owner.account);
                user = mapUser(owner.account, owner) as User;
                break;
            case Role.RENTER:
                const renter = await prisma.renter.findUnique({
                    where: {
                        renterId: reqUserId,
                    },
                    include: {
                        account: true,
                    },
                });

                if (!renter) {
                    return res.status(401).json({
                        message: "Unauthorized.(no renter found)",
                    });
                }
                // user = mapRenterToUser(renter, renter.account);
                user = mapUser(renter.account, null, null, renter) as User;
                break;
            case Role.ADMIN:
                const admin = await prisma.admin.findUnique({
                    where: {
                        adminId: reqUserId,
                    },
                    include: {
                        account: true,
                    },
                });

                if (!admin) {
                    return res.status(401).json({
                        message: "Unauthorized.(no admin found)",
                    });
                }
                // user = mapAdminToUser(admin, admin.account);
                user = mapUser(admin.account, null, admin) as User;
                break;
            default:
                return res
                    .status(401)
                    .json({ message: "Unauthorized.(Invalid Role)" });
        }
        req.user = user;
        req.ability = defineAbilitiesFor(req.user);
        next();
    } catch (error: Error | any) {
        console.log("CheckAuth:Middleware: Error", error.message);
        return res
            .status(401)
            .json({ message: "Unauthorized", err: error.message });
    }
};

export default checkAuth;
