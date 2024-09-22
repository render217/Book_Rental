import { Router } from "express";

const revenuesRouter = Router();

revenuesRouter.get("/", (req, res) => {
    res.send("Revenue route");
});

export default revenuesRouter;
