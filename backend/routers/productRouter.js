import express from 'express';
import { getAllProducts, getAllSaleOffProducts, getCategories, getProductDetail, getRandomProducts, getSaleOffProducts } from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.get('/popular', getRandomProducts);
productRouter.get('/saleOff', getSaleOffProducts);
productRouter.get('/allSaleOff', getAllSaleOffProducts);
productRouter.get('/', getAllProducts);
productRouter.get('/categories', getCategories);
productRouter.get('/:id', getProductDetail);



export default productRouter;