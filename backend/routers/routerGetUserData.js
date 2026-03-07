import express from 'express';
import { getUserData } from '../controllers/getUserData.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const getRouter = express.Router();

getRouter.get('/data', authMiddleware, getUserData);

export default getRouter;