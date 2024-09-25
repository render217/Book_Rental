import { Request, Response } from "express";
import { prisma } from "../../prisma/db";

const getBooksStatistics = async (req: Request, res: Response) => {
    const bookStatistics = await prisma.bookCatalog.groupBy({
        by: ["category"],
        _count: {
            category: true,
        },
    });

    const formattedResult = bookStatistics.map((stat) => ({
        category: stat.category,
        count: stat._count.category,
    }));

    return res.status(200).json(formattedResult);
};
export default getBooksStatistics;
