import express from 'express';
import { getAllAccounts, getDetailAccount, signin } from '../controllers/accountController.js';

const accountRouter = express.Router();

accountRouter.post('/signin', signin)

accountRouter.get('/', getAllAccounts)
accountRouter.get('/:id', getDetailAccount)


export default accountRouter;