import { Router } from "express";
import * as renvenueController from "../controllers/revenue";
import checkAuth from "../middleware/check-auth";
const revenuesRouter = Router();

revenuesRouter.get("/", checkAuth, renvenueController.getOwnerRevenues);
revenuesRouter.get("/me", checkAuth, renvenueController.getMineRevenue);
revenuesRouter.get("/:id", checkAuth, renvenueController.getOwnerRevenue);
export default revenuesRouter;
