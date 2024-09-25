/*
  - get specifc owner revenue..(admin)
*/
import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus } from "@prisma/client";
const getOwnerRevenue = async (req: Request, res: Response) => {
    res.status(200).json("ok");
};
export default getOwnerRevenue;
