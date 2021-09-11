import express from 'express';
import { isAdminOrWebmaster, isAuth } from '../auth.js';
import { createOrder, listOrder, listOrderOfUser, orderDetail, verifyOrder } from '../controllers/orderController.js';


const orderRouter = express.Router();


orderRouter.post('/', isAuth, createOrder);

orderRouter.get('/', isAuth, listOrder);
orderRouter.get('/mine', isAuth, listOrderOfUser);
orderRouter.get('/:id', isAuth, orderDetail);


orderRouter.put('/:id', isAuth, isAdminOrWebmaster, verifyOrder);


export default orderRouter;