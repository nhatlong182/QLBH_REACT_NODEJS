import express from 'express';
import { getAllProducts, getProductDetail } from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductDetail);

export default productRouter;