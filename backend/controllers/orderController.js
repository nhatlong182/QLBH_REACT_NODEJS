import Order from "../models/orderModel.js";
import Product from '../models/productModel.js'

export const createOrder = async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Giỏ hàng rỗng' });
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });


        order.orderItems.forEach(async (item) => {
            const product = await Product.findById(item.id);
            product.countInStock = product.countInStock - item.qty;
            await product.save();
        })

        const createdOrder = await order.save();
        res.status(201).send({ message: 'Đặt hàng thành công!!!', order: createdOrder });
    }
}

export const listOrder = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;

        const name = req.query.name || '';
        const phone = req.query.phone || '';

        const nameFilter = name ? { 'shippingAddress.fullName': { $regex: name, $options: 'i' } } : {};
        const phoneFilter = phone ? { 'shippingAddress.phone': { $regex: phone, $options: 'i' } } : {};


        const count = await Order.countDocuments({ ...nameFilter, ...phoneFilter });
        const orders = await Order.find({ ...nameFilter, ...phoneFilter }).limit(limit).skip(startIndex).exec();

        res.send({ page, limit, pages: Math.ceil(count / limit), orders });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Lỗi server không thể lấy danh sách tài khoản!!!" });
    }
}

export const listOrderOfUser = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    } catch (error) {
        res.status(404).send({ message: 'Không tìm thấy danh sách đơn hàng' })
    }
}

export const orderDetail = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Không tìm thấy chi tiết đơn hàng!!!' });
    }
}

export const verifyOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isConfirm = true;
        order.save();
        res.send({ message: 'Cập nhật thành công' })
    } else {
        res.status(404).send({ message: 'Không tìm thấy chi tiết đơn hàng!!!' });
    }
}

export const verifyDeliver = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.isConfirm = true;
        order.deliveredAt = Date.now();

        await order.save();
        res.send({ message: 'Cập nhật thành công' });
    } else {
        res.status(404).send({ message: 'Không tìm thấy chi tiết đơn hàng!!!' });
    }
}

export const deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        if (!order.isDelivered) {
            order.orderItems.forEach(async (item) => {
                const product = await Product.findById(item.id);
                product.countInStock = product.countInStock + item.qty;
                await product.save();
            })
        }
        await order.remove();
        res.send({ message: 'Xóa thành công' });
    } else {
        res.status(404).send({ message: 'Không tìm thấy đơn hàng!!!' });
    }
}