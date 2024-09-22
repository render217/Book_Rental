import { Router } from "express";
import * as healthController from "../controllers/healthController";
import checkAuth from "../middleware/check-auth";

const healthRouter = Router();

healthRouter.get("/", checkAuth, healthController.checkHealth);

export default healthRouter;
