import { Router } from "express";
import * as BookController from "../controllers/books";
import checkAuth from "../middleware/check-auth";
import { validateData } from "../middleware/validate-data";
import AddBookCatalogSchema from "../validation/book-catalog.schema";
const booksRouter = Router();

booksRouter.get("/", checkAuth, BookController.getBooks);
booksRouter.get("/statistics", checkAuth, BookController.getBooksStatistics);

booksRouter.get("/:id", checkAuth, BookController.getBookDetail);

booksRouter.post(
    "/",
    checkAuth,
    validateData(AddBookCatalogSchema),
    BookController.addBook
);

booksRouter.patch("/:id", checkAuth, BookController.updateBookStatus);
export default booksRouter;
