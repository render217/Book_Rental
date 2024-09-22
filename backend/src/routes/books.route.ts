import { Router } from "express";

const booksRouter = Router();

booksRouter.get("/", (req, res) => {
    res.send("Books route");
});

export default booksRouter;
