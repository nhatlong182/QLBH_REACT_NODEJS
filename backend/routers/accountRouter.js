import express from 'express';
import { isAuth } from '../auth.js';
import { getAllAccounts, getDetailAccount, register, signin } from '../controllers/accountController.js';

const accountRouter = express.Router();

accountRouter.post('/signin', signin)
accountRouter.post('/register', register)

accountRouter.get('/', isAuth)
accountRouter.get('/:id', isAuth, getDetailAccount)


export default accountRouter;