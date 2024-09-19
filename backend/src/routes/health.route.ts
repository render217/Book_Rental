import { Router } from "express";
import * as healthController from "../controllers/healthController";

const healthRouter = Router();

healthRouter.get("/health", healthController.checkHealth);

export default healthRouter;
