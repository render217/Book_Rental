import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import notFound from "./middleware/not-found";
import errorHandler from "./middleware/error-handler";

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL as string;

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["http://localhost:5173", FRONTEND_URL],
        credentials: true,
    })
);

app.use("/api", routes);
app.use("*", notFound);

app.use(errorHandler);

export default app;
