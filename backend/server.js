import express from "express";
import cors from "cors";
import "dotenv/config";
import db from "./config/dbConnection.js";
import authRouter from "./routers/authRouter.js";
import productRouter from "./routers/productRouter.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cartRouter from "./routers/cartRouter.js";
import orderRouter from "./routers/orderRouter.js";
import getRouter from "./routers/routerGetUserData.js";

const app = express();
const port = process.env.SERVER_PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://onlineshop-git-main-tuyisenges-projects.vercel.app", "https://onlineshop-adminpanal.vercel.app"],
    credentials: true,
  }),
);
app.use(cookieParser());

db.sync()
  .then(() => console.log("database connect successfully"))
  .catch((err) => console.log(err.message));

app.listen(port, () => console.log(`server running on ${port}`));

app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use(getRouter);