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

export const orderDetail = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Không tìm thấy chi tiết đơn hàng!!!' });
    }
}