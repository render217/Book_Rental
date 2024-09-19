import { Request, Response, NextFunction } from "express";
const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ errors: "resource not found" });
};

export default notFound;
