import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'

export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;


        //filter
        const name = req.query.name || '';
        const category = req.query.category || '';
        const sale = req.query.sale || '';
        const min =
            req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
        const max =
            req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;

        const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
        const categoryFilter = category ? { category } : {};
        const saleFilter = sale ? { isSale: sale } : {}
        const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};

        const count = await Product.countDocuments({
            ...nameFilter,
            ...categoryFilter,
            ...saleFilter,
            ...priceFilter,
        });

        const products = await Product.find({
            ...nameFilter,
            ...categoryFilter,
            ...saleFilter,
            ...priceFilter,
        }).limit(limit).skip(startIndex).exec();

        res.send({ page, limit, pages: Math.ceil(count / limit), products });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Loi server!!!" });
    }
}

export const getRandomProducts = async (req, res) => {
    try {
        //db.products.aggregate([{$sample: {size: 5}}]);
        const products = await Product.aggregate([{ $match: { isSale: false } }, { $sample: { size: 8 } },]);

        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Loi server!!!" });
    }
}
export const getSaleOffProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([{ $match: { isSale: true } }, { $sample: { size: 8 } },]);

        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Loi server!!!" });
    }
}
export const getAllSaleOffProducts = async (req, res) => {
    try {
        const products = await Product.find({ isSale: true });

        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Loi server!!!" });
    }
}

export const getProductDetail = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404).send({ message: "Không tìm thấy sản phẩm!!!" });
    }
}

export const getCategories = async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
}

export const createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            price: Number(req.body.price),
            category: req.body.category,
            brand: req.body.brand,
            countInStock: Number(req.body.countInStock),
            description: req.body.description,
        });
        const createdProduct = await product.save();
        res.send({ message: 'Thêm sản phẩm thành công', product: createdProduct });
    } catch (error) {
        res.status(500).send({ message: 'Có lỗi xãy ra vui lòng kiểm tra lại thông tin' })
    }
}

export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const order = await Order.find({ "orderItems.name": product.name })
        if (order) {
            order.forEach(element => {
                element.remove();
            });
        }

        await product.remove();

        res.send({ message: 'Xóa sản phẩm thành công' });
    } else {
        res.status(404).send({ message: 'Không tìn thấy sản phẩm!!!' });
    }
}

export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = Number(req.body.price);
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = Number(req.body.countInStock);
        product.description = req.body.description;
        product.isSale = req.body.isSale;
        product.saleOff = Number(req.body.saleOff);
        await product.save();
        res.send({ message: 'Cập nhật thành công' });
    } else {
        res.status(404).send({ message: 'Không tìm thấy sản phẩm' });
    }
}