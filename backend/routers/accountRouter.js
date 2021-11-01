import express from 'express';
import { isAdmin, isAuth } from '../auth.js';
import { authorizeWebmaster, deleteAccount, forgotPassword, getAllAccounts, getDetailAccount, register, resetPassword, signin, unAuthorizeWebmaster, updateAccount } from '../controllers/accountController.js';

const accountRouter = express.Router();

accountRouter.post('/signin', signin)
accountRouter.post('/register', register)
accountRouter.post('/forgot', forgotPassword)
accountRouter.post('/reset', resetPassword)

accountRouter.get('/', isAuth, isAdmin, getAllAccounts)
accountRouter.get('/:id', isAuth, getDetailAccount)

accountRouter.put('/profile', isAuth, updateAccount)

accountRouter.delete('/:id', isAuth, isAdmin, deleteAccount)
accountRouter.put('/webmaster/:id', isAuth, isAdmin, authorizeWebmaster)
accountRouter.put('/unWebmaster/:id', isAuth, isAdmin, unAuthorizeWebmaster)


export default accountRouter;