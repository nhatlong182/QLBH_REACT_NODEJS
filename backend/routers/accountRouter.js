import express from 'express';
import { getAllAccounts, getDetailAccount, register, signin } from '../controllers/accountController.js';

const accountRouter = express.Router();

accountRouter.post('/signin', signin)
accountRouter.post('/register', register)

accountRouter.get('/', getAllAccounts)
accountRouter.get('/:id', getDetailAccount)


export default accountRouter;