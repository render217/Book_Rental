import { Router } from "express";
import * as rentalController from "../controllers/rental";
import checkAuth from "../middleware/check-auth";
const rentalsRouter = Router();

rentalsRouter.get("/", checkAuth, rentalController.getRentals);
rentalsRouter.post("/", checkAuth, rentalController.addRental);
rentalsRouter.get("/:id", checkAuth, rentalController.getRentalDetail);
rentalsRouter.patch("/:id/return", checkAuth, rentalController.updateRental);

export default rentalsRouter;
