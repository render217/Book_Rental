import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/db";
import { Role } from "@prisma/client";
import {
    mapAdminToUser,
    mapOwnerToUser,
    mapRenterToUser,
} from "../utils/mapper";
import { IUser } from "../utils/types";

declare global {
    namespace Express {
        interface Request {
            userId: string | undefined;
            role: Role | undefined;
            user: IUser | undefined;
        }
    }
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log("CheckAuth:Middleware: Token", token ? true : false);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // check if the token is valid
    const tokenVal = token.split(" ")[1];

    try {
        const decoded = jwt.verify(tokenVal, process.env.JWT_SECRET!);
        console.log("CheckAuth:Middleware: DecodedToken", decoded);

        const reqUserId = (decoded as { id: string; role: Role }).id;
        const reqRole = (decoded as { id: string; role: Role }).role;

        req.userId = reqUserId;
        req.role = reqRole;
        let user;
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
                user = mapOwnerToUser(owner, owner.account);
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
                user = mapRenterToUser(renter, renter.account);
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
                user = mapAdminToUser(admin, admin.account);
                break;
            default:
                return res
                    .status(401)
                    .json({ message: "Unauthorized.(Invalid Role)" });
        }
        req.user = user;
        next();
    } catch (error: Error | any) {
        console.log("CheckAuth:Middleware: Error", error.message);
        return res
            .status(401)
            .json({ message: "Unauthorized", err: error.message });
    }
};

export default checkAuth;
