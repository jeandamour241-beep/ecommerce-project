import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/add", authMiddleware, createOrder);
orderRouter.get("/getOrder", authMiddleware, getOrders);
orderRouter.delete("/delete/:id", authMiddleware, deleteOrder);
orderRouter.get("/all", adminMiddleware, getAllOrders);
orderRouter.put("/status/:id", adminMiddleware, updateOrderStatus);

export default orderRouter;
