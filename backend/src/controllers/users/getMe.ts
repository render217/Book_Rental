import { Request, Response } from "express";
const getMe = async (req: Request, res: Response) => {
    return res.status(200).json(req.user);
};

export default getMe;
