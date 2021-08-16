import express from 'express';
import { getAllProducts, getCategories, getProductDetail, getRandomProducts } from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.get('/home', getRandomProducts);
productRouter.get('/', getAllProducts);
productRouter.get('/categories', getCategories);
productRouter.get('/:id', getProductDetail);

export default productRouter;