import Order from "../models/orderModel.js";

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

        const nameFilter = name ? { 'shippingAddress.fullName': { $regex: name, $options: 'i' } } : {};

        const count = await Order.countDocuments({ ...nameFilter });
        const orders = await Order.find({ ...nameFilter }).limit(limit).skip(startIndex).exec();

        res.send({ page, limit, pages: Math.ceil(count / limit), orders });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Lỗi server không thể lấy danh sách tài khoản!!!" });
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