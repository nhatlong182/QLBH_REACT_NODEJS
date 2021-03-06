import express from "express";
import dotenv from 'dotenv';

import connectDB from "./config/connectDB.js";
import productRouter from "./routers/productRouter.js";
import accountRouter from './routers/accountRouter.js'
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/uploads', uploadRouter);
app.use('/api/products', productRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/orders', orderRouter);



app.get('/', (req, res) => {
    res.send('Server đang chạy tốt')
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
});