import { Router } from "express";
import * as inventoryController from "../controllers/inventory";
import checkAuth from "../middleware/check-auth";
import { validateData } from "../middleware/validate-data";
import addBookInventorySchema from "../validation/book-inventory.schema";
const inventoryRouter = Router();

inventoryRouter.get("/", checkAuth, inventoryController.getBooksInventory);
inventoryRouter.get(
    "/books/:id",
    checkAuth,
    inventoryController.searchBookInInventory
);
inventoryRouter.get(
    "/statistics",
    checkAuth,
    inventoryController.getBooksInventoryStatistics
);
inventoryRouter.get("/:id", checkAuth, inventoryController.getBookInventory);

inventoryRouter.post(
    "/",
    checkAuth,
    validateData(addBookInventorySchema),
    inventoryController.addBookInventory
);
inventoryRouter.patch(
    "/:id",
    checkAuth,
    inventoryController.updateBookInventory
);
inventoryRouter.patch(
    "/:id/remove",
    checkAuth,
    inventoryController.removeBookInventory
);
export default inventoryRouter;
