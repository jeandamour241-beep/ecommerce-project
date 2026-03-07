import express from 'express';
import { addProduct, deleteProduct, getProduct, getProductById, getProductLimit, searchProduct, swiperProduct } from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import { adminMiddleware } from '../middlewares/authMiddleware.js';

const productRouter = express.Router();

productRouter.post('/add', adminMiddleware, upload.single('image'), addProduct);
productRouter.get('/get', getProduct);
productRouter.get('/get/:id', getProductById);
productRouter.post('/delete', adminMiddleware, deleteProduct);
productRouter.get('/find', searchProduct);
productRouter.get('/swiper', swiperProduct);
productRouter.get('/new', getProductLimit);

export default productRouter;