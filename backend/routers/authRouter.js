import express from "express";
import { admin, adminLogout, getAllUsers, isAdminAuth, isAuth, login, register, userLogout } from "../controllers/authController.js";
import { adminMiddleware, authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout/admin', adminLogout);
authRouter.post('/logout/user', userLogout);
authRouter.post('/admin', admin);
authRouter.post('/is-auth', authMiddleware, isAuth);
authRouter.get('/users', getAllUsers);
authRouter.post('/is-admin-auth', adminMiddleware, isAdminAuth);

export default authRouter;