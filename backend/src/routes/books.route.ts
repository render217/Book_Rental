import { Router } from "express";
import * as BookController from "../controllers/books";
import checkAuth from "../middleware/check-auth";
const booksRouter = Router();

booksRouter.get("/", checkAuth, BookController.getBooks);
booksRouter.get("/statistics", checkAuth, BookController.getBooksStatistics);
// u might need to remove this. search? see it later...
booksRouter.get("/search", checkAuth, BookController.searchBooks);
booksRouter.get("/:id", checkAuth, BookController.getBookDetail);
booksRouter.post("/", checkAuth, BookController.addBook);
booksRouter.patch("/:id", checkAuth, BookController.updateBookStatus);
export default booksRouter;
