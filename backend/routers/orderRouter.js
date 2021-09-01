import express from 'express';
import { isAuth } from '../auth.js';
import { createOrder, listOrder, orderDetail } from '../controllers/orderController.js';


const orderRouter = express.Router();


orderRouter.post('/', isAuth, createOrder);

orderRouter.get('/', isAuth, listOrder);
orderRouter.get('/:id', isAuth, orderDetail);


export default orderRouter;