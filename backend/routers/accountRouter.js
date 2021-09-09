import express from 'express';
import { isAdmin, isAuth } from '../auth.js';
import { authorizeWebmaster, deleteAccount, getAllAccounts, getDetailAccount, register, signin, unAuthorizeWebmaster } from '../controllers/accountController.js';

const accountRouter = express.Router();

accountRouter.post('/signin', signin)
accountRouter.post('/register', register)

accountRouter.get('/', isAuth, isAdmin, getAllAccounts)
accountRouter.get('/:id', isAuth, getDetailAccount)

accountRouter.delete('/:id', isAuth, isAdmin, deleteAccount)
accountRouter.put('/webmaster/:id', isAuth, isAdmin, authorizeWebmaster)
accountRouter.put('/unWebmaster/:id', isAuth, isAdmin, unAuthorizeWebmaster)


export default accountRouter;