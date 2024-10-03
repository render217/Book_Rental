import type {
    NextFunction,
    Response,
    Request,
} from "express-serve-static-core";
import { z, ZodError } from "zod";
import ApiError from "../utils/api-error";

export function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join(".")}  ${issue.message}`,
                }));
                throw new ApiError(422, "Invalid data", errorMessages);
            } else {
                throw new ApiError(500, "Internal Server Error", []);
            }
        }
    };
}
