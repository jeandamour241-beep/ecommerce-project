import express from 'express';
import { addToCart, deleteCartItem, getCart, updateCartItem } from '../controllers/cartController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/addToCart', authMiddleware, addToCart);
cartRouter.get('/getCart', authMiddleware, getCart);
cartRouter.put('/update', authMiddleware, updateCartItem);
cartRouter.delete('/delete/:id', authMiddleware, deleteCartItem);

export default cartRouter;