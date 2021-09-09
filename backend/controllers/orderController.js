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
    const orders = await Order.find({})
    if (orders) {
        res.send(orders);
    }
    else {
        res.status(404).send({ message: 'không tìm thấy danh sách đơn hàng' })
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