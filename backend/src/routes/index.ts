import { Router } from "express";
import healthRouter from "./health.route";
import authRouter from "./auth.route";
import usersRouter from "./users.route";
import booksRouter from "./books.route";
import inventoryRouter from "./inventory.route";
import rentalsRouter from "./rentals.route";
import revenuesRouter from "./revenues.route";

const router = Router();

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/books", booksRouter);
router.use("/inventory", inventoryRouter);
router.use("/rentals", rentalsRouter);
router.use("/revenues", revenuesRouter);

export default router;
