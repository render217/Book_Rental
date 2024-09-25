import { Router } from "express";
import * as usersController from "../controllers/users";
import checkAuth from "../middleware/check-auth";
const usersRouter = Router();

usersRouter.get("/me", checkAuth, usersController.getMe);
usersRouter.get("/owners", checkAuth, usersController.getOwners);
usersRouter.get("/owners/:id", checkAuth, usersController.getOwnerDetail);
usersRouter.delete("/owners/:id", checkAuth, usersController.deleteOwner);
usersRouter.patch(
    "/owners/:id/approve",
    checkAuth,
    usersController.approveOwner
);

usersRouter.patch(
    "/owners/:id/activate",
    checkAuth,
    usersController.activateDeactivateOwner
);
export default usersRouter;
