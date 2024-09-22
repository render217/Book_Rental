import { Router } from "express";
import * as authController from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.post("/register", authController.registerUser);

export default authRouter;
