import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderAction.js';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../css/orderDetail.css';


export default function OrderDetailScreen(props) {

    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetail);
    const { order, loading, error } = orderDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsOrder(orderId))
    }, [dispatch, orderId])


    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <Link to="/orderhistory">Đơn hàng</Link>
            <div className="section">
                <svg width="50" height="50" fill="none" className="check_icon">
                    <path className="checkmark_circle" d="M25 49c13.255 0 24-10.745 24-24S38.255 1 25 1 1 11.745 1 25s10.745 24 24 24z"></path>
                    <path className="checkmark_check" d="M15 24.51l7.307 7.308L35.125 19"></path>
                </svg>
                <div className="os_heading">
                    <h2 className="heading_noti">Đặt hàng thành công</h2>
                    <span className="os_number_order">Mã đơn hàng: {order._id}</span>
                    <span className="os_description">Cảm ơn bạn đã mua hàng!</span>
                </div>
            </div>
            <div className="content">
                <div className="wrap">
                    <ul>
                        <li>
                            <div className="content_box">
                                <h2>Thông tin đơn hàng</h2>
                                <p>
                                    <strong>Tên:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Địa chỉ: </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.district}
                                </p>
                                {order.isDelivered ? (
                                    <MessageBox variant="success" className="arlet">
                                        Đã giao vào ngày {order.deliveredAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger" className="arlet">Chưa giao</MessageBox>
                                )}

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="wrap">
                    <div className="sidebar_order">
                        <div className="sidebar_content">
                            <h2>Sản phẩm</h2>
                            <ul>
                                {order.orderItems.map((item) => (
                                    <li key={item._id}>
                                        <div className="">
                                            <div className="product_table">
                                                <img
                                                    src={item.image}
                                                    alt={item.name} className="img_order">
                                                </img>
                                                <div className="name_order">
                                                    {item.name}
                                                </div>
                                                <div className="price_order">{item.qty} x {item.price} = {(item.qty * item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <ul>
                                <li>
                                    <h2>Tạm tính</h2>
                                </li>
                                <li>
                                    <div className="detail_order">
                                        <div>Tạm tính:</div>
                                        <div className="text_detail">{order.itemsPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="detail_order">
                                        <div>Phí vận chuyển:</div>
                                        <div className="text_detail">{order.shippingPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="detail_order">
                                        <div>
                                            <strong> Tổng cộng:</strong>
                                        </div>
                                        <div className="text_detail">
                                            <strong>{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
