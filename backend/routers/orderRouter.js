import express from 'express';
import { isAdminOrWebmaster, isAuth } from '../auth.js';
import { createOrder, deleteOrder, listOrder, listOrderOfUser, orderDetail, verifyDeliver, verifyOrder } from '../controllers/orderController.js';


const orderRouter = express.Router();


orderRouter.post('/', isAuth, createOrder);

orderRouter.get('/', isAuth, listOrder);
orderRouter.get('/mine', isAuth, listOrderOfUser);
orderRouter.get('/:id', isAuth, orderDetail);

orderRouter.delete('/:id', isAuth, isAdminOrWebmaster, deleteOrder);

orderRouter.put('/:id', isAuth, isAdminOrWebmaster, verifyOrder);

orderRouter.put('/:id/deliver', isAuth, isAdminOrWebmaster, verifyDeliver);


export default orderRouter;