import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Revenue } from "@prisma/client";
import { accessibleBy } from "@casl/prisma";

const getRevenuesSummary = async (req: Request, res: Response) => {
    // const user = req.user!;

    // const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const currentYearRevenues = await prisma.revenue.findMany({
        where: {
            AND: [
                accessibleBy(req.ability).Revenue,
                {
                    year: currentYear,
                },
            ],
        },
    });

    const lastYearRevenues = await prisma.revenue.findMany({
        where: {
            AND: [
                accessibleBy(req.ability).Revenue,
                {
                    year: currentYear - 1,
                },
            ],
        },
    });

    type Iacc = {
        [key: number]: number;
    };
    // Helper function to aggregate revenue by month
    const aggregateRevenueByMonth = (revenues: Revenue[]) => {
        return revenues.reduce((acc: Iacc, revenue) => {
            const month = revenue.month;

            if (!acc[month]) {
                acc[month] = 0;
            }
            acc[month] += revenue.totalRevenue || 0;
            return acc;
        }, {});
    };

    // Aggregate the revenues for both years
    const currentYearAggregated = aggregateRevenueByMonth(currentYearRevenues);
    const lastYearAggregated = aggregateRevenueByMonth(lastYearRevenues);

    // Prepare the response data in the format expected by the frontend
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const data = months.map((month, index) => {
        const monthIndex = index + 1;
        return {
            name: month,
            thisYear: currentYearAggregated[monthIndex] || 0,
            lastYear: lastYearAggregated[monthIndex] || 0,
        };
    });

    const payload = {
        data: data,
    };

    return res.status(200).json(payload);
};

export default getRevenuesSummary;
