import express from 'express';
import { isAdminOrWebmaster, isAuth } from '../auth.js';
import { createProduct, deleteProduct, getAllProducts, getAllSaleOffProducts, getCategories, getProductDetail, getRandomProducts, getSaleOffProducts, updateProduct } from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.get('/popular', getRandomProducts);
productRouter.get('/saleOff', getSaleOffProducts);
productRouter.get('/allSaleOff', getAllSaleOffProducts);
productRouter.get('/', getAllProducts);
productRouter.get('/categories', getCategories);
productRouter.get('/:id', getProductDetail);

productRouter.put('/:id', isAuth, isAdminOrWebmaster, updateProduct);
productRouter.post('/', isAuth, isAdminOrWebmaster, createProduct);

productRouter.delete('/:id', isAuth, isAdminOrWebmaster, deleteProduct);




export default productRouter;