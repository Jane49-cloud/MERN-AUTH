import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import connection from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);
app.use(notFound);

app.use("/api/users", userRoutes);
connection();

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
