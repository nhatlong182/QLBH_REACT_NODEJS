import data from './data.js'
import connectDB from './config/connectDB.js'
import Product from './models/productModel.js'
import Account from './models/accountModel.js'
import Order from './models/orderModel.js';

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(data.products);

        await Account.deleteMany({});
        await Account.insertMany(data.accounts);

        await Order.insertMany(data.orders);

        console.log('Them du lieu thanh cong!!!');
        process.exit();
    } catch (error) {
        console.log(error);
        console.log('Them du lieu that bai!!!');
        process.exit(1);
    }
}

importData();