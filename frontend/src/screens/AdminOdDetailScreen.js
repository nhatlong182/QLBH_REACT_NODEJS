import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deliverOrder, detailsOrder } from '../actions/orderAction.js';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import '../css/adminOdDetail.css'
import { ORDER_DELIVER_RESET } from '../constants.js';

export default function AdminOdDetailScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetail);
    const { order, loading, error } = orderDetails;

    const orderDeliver = useSelector((state) => state.deliverOrder);
    const {
        error: errorDeliver,
        success: successDeliver,
    } = orderDeliver;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET });
        }
        dispatch(detailsOrder(orderId))
    }, [dispatch, orderId, successDeliver])


    const deliverHandler = () => {

        dispatch(deliverOrder(order._id));
    };

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : errorDeliver ? (
        <MessageBox variant="danger">{errorDeliver}</MessageBox>
    ) : (
        <div className="chung">
            <div className="head-line">
                <Link to="/admin/tableOrder">Đơn hàng </Link>
                <svg width="18px" height="18px" viewBox="0 0 17 6" className="svg-item">
                    <path d="M6.47 4L5.53 4.94L8.58333 8L5.53 11.06L6.47 12L10.47 8L6.47 4Z"></path>
                </svg>
                <span className="sub-orderid">{order._id}</span>
            </div>

            <div className="info-box">
                <strong>Thông tin đơn hàng</strong>
                <div>
                    <strong>Tên:</strong> {order.shippingAddress.fullName} <br />
                    <strong>Số điện thoại:</strong> {order.shippingAddress.phone} <br />
                    <strong>Địa chỉ: </strong> {order.shippingAddress.address},
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.district}
                </div>
            </div>

            <div className="status-bar">
                <div className="status-text">
                    <strong>MÃ</strong>
                    <div><span>{order._id}</span></div>
                </div>
                <div className="status-text">
                    <strong>TRẠNG THÁI GIAO HÀNG</strong>
                    {order.isDelivered ? (<MessageBox variant="success">Đã giao vào ngày {order.deliveredAt.substring(0, 10)}</MessageBox>
                    ) : (
                        <MessageBox variant="danger">Chưa giao</MessageBox>
                    )}
                </div>
                <div className="status-text">
                    <strong>XÁC THỰC ĐƠN HÀNG</strong>
                    <div>
                        <span>{order.isConfirm ? <span className="success">Đã xác nhận</span> : "Chờ xử lý"}</span>
                    </div>
                </div>
            </div>

            <div className="tble-main">
                <table width="580">
                    <thead>
                        <tr>
                            <th className="thtble">Sản phẩm</th>
                            <th className="thtble">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody className="tble-body">
                        {order.orderItems.map((item) => (
                            <tr key={item._id}>
                                <td className="product_table">
                                    <img
                                        src={item.image}
                                        alt={item.name} className="img_order">
                                    </img>
                                    <div className="name_order">
                                        {item.name}
                                    </div>
                                </td>
                                <td className="price_order">{item.qty} x {item.price} = {(item.qty * item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="deli">
                    {!order.isDelivered && (
                        <button className="deli-btn" onClick={deliverHandler}>
                            Giao hàng
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
