import { Router } from "express";

const inventoryRouter = Router();

inventoryRouter.get("/", (req, res) => {
    res.send("Inventory route");
});

export default inventoryRouter;
