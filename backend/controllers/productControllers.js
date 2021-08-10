import Product from '../models/productModel.js'

export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        // const endIndex = page * limit



        const count = await Product.countDocuments();

        const products = await Product.find().limit(limit).skip(startIndex).exec();

        res.send({ page, limit, pages: Math.ceil(count / page), products });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Loi server!!!" });
    }
}

export const getProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Loi server!!!" });
    }
}