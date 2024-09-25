/*
    get owner revenue (dashboard ui) owner.
*/
import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Role, OwnerStatus, ApprovalStatus, Revenue } from "@prisma/client";
const getMineRevenue = async (req: Request, res: Response) => {
    const user = req.user!;

    if (user.role !== Role.OWNER) {
        return res.status(403).json({
            message: "Access denied.",
        });
    }

    const revenues = await prisma.revenue.findMany({
        where: {
            ownerId: user.id,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        },
    });

    const lastMonthRevenues = await prisma.revenue.findMany({
        where: {
            ownerId: user.id,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        },
    });

    const currentMonthStatistics = calculateStatistics(revenues);

    const lastMonthStatistics = calculateStatistics(lastMonthRevenues);

    const percentageDifference = calculatePercentageDifference(
        currentMonthStatistics,
        lastMonthStatistics
    );

    const response = {
        statistics: {
            currentMonth: {
                ...currentMonthStatistics,
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
            },
            lastMonth: {
                ...lastMonthStatistics,
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
            },
            percentageDifference,
        },
    };

    return res.status(200).json(response);
};
export default getMineRevenue;

function calculateStatistics(revenues: Revenue[]) {
    const totalRevenue = revenues.reduce(
        (acc, revenue) => acc + (revenue.totalRevenue || 0),
        0
    );
    const totalRentals = revenues.reduce(
        (acc, revenue) => acc + (revenue.totalRentals || 0),
        0
    );
    const totalQuantityRented = revenues.reduce(
        (acc, revenue) => acc + (revenue.totalQuantityRented || 0),
        0
    );

    return {
        totalRevenue,
        totalRentals,
        totalQuantityRented,
    };
}

function calculatePercentageDifference(
    current: {
        totalRevenue: number;
        totalRentals: number;
        totalQuantityRented: number;
    },
    last: {
        totalRevenue: number;
        totalRentals: number;
        totalQuantityRented: number;
    }
) {
    function calculatePercentageChange(
        currentValue: number,
        lastValue: number
    ) {
        if (lastValue === 0) {
            return currentValue === 0 ? 0 : 100;
        }
        return ((currentValue - lastValue) / lastValue) * 100;
    }

    const totalRevenueDifference = calculatePercentageChange(
        current.totalRevenue,
        last.totalRevenue
    );

    const totalRentalsDifference = calculatePercentageChange(
        current.totalRentals,
        last.totalRentals
    );

    const totalQuantityRentedDifference = calculatePercentageChange(
        current.totalQuantityRented,
        last.totalQuantityRented
    );

    return {
        totalRevenueDifference,
        totalRentalsDifference,
        totalQuantityRentedDifference,
    };
}
