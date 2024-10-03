import { z } from "zod";

const AddBookCatalogSchema = z.object({
    title: z.string().min(2, "must be at least 2 characters long"),
    author: z.string().min(5, "must be at least 5 characters long"),
});

export default AddBookCatalogSchema;
