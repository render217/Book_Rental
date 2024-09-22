import { Router } from "express";
import * as usersController from "../controllers/users";
import checkAuth from "../middleware/check-auth";
const usersRouter = Router();

usersRouter.get("/me", checkAuth, usersController.getMe);

export default usersRouter;
