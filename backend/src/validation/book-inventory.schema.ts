import { z } from "zod";
const addBookInventorySchema = z.object({
    pricePerDay: z.number().min(0.01, "must be greater than 0"),
    totalCopies: z.number().min(1, "must be at least 1"),
});

export default addBookInventorySchema;
