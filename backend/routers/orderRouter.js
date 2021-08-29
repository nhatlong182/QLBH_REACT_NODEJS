import express from 'express';
import { isAuth } from '../auth.js';
import { createOrder, orderDetail } from '../controllers/orderController.js';


const orderRouter = express.Router();


orderRouter.post('/', isAuth, createOrder);
orderRouter.get('/:id', isAuth, orderDetail);

export default orderRouter;