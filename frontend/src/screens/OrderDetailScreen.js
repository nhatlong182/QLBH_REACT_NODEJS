import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderAction.js';


import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderDetailScreen(props) {

    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetail);
    const { order, loading, error } = orderDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const deliverHandler = () => {
        // dispatch(deliverOrder(order._id));
    };

    useEffect(() => {
        dispatch(detailsOrder(orderId))
    }, [dispatch, orderId])


    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <h1>Mã đơn hàng: {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Thông tin đơn hàng</h2>
                                <p>
                                    <strong>Tên:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Địa chỉ: </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.district}
                                </p>
                                {order.isDelivered ? (
                                    <MessageBox variant="success">
                                        Đã giao vào ngày {order.deliveredAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Chưa giao</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Sản phẩm</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div>
                                                    {item.qty} x {item.price} = {(item.qty * item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Tạm tính</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tạm tính:</div>
                                    <div>{order.itemsPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Phí vận chuyển:</div>
                                    <div>{order.shippingPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Tổng tiền:</strong>
                                    </div>
                                    <div>
                                        <strong>{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
