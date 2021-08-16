import express from "express";
import connectDB from "./config/connectDB.js";
import productRouter from "./routers/productRouter.js";
import accountRouter from './routers/accountRouter.js'

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/products', productRouter);
app.use('/api/accounts', accountRouter);



app.get('/', (req, res) => {
    res.send('Server đang chạy tốt')
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
});