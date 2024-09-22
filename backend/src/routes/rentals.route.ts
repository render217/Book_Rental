import { Router } from "express";

const rentalsRouter = Router();

rentalsRouter.get("/", (req, res) => {
    res.send("Rental route");
});

export default rentalsRouter;
