import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { deleteOrder, listOrderOfUser } from '../actions/orderAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants.js';
import '../css/orderHistory.css'

export default function OrderHistoryScreen(props) {

    const orderMineList = useSelector((state) => state.listOrderOfUser);
    const { loading, error, orders } = orderMineList;
    const orderDelete = useSelector((state) => state.deleteOrder);
    const {
        error: errorDelete,
        success: successDelete,
    } = orderDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successDelete) {
            swal({
                text: "Đã hủy đơn hàng",
                icon: "success",
                button: false,
                timer: 1500,
            });
            dispatch({ type: ORDER_DELETE_RESET });
        }
        dispatch(listOrderOfUser());
    }, [dispatch, successDelete]);

    const cancelOrderHandler = (order) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
            dispatch(deleteOrder(order._id));
        }
    };

    return (
        <div className="">
            <h1>Danh sách đơn hàng của tôi</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : errorDelete ? (
                <MessageBox variant="danger">{errorDelete}</MessageBox>
            ) : (
                <table className="mw table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên người đặt hàng</th>
                            <th>SĐT</th>
                            <th>Ngày đặt hàng</th>
                            <th>Tổng tiền</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.shippingAddress.fullName}</td>
                                <td>{order.shippingAddress.phone}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => props.history.push(`/order/${order._id}`)}
                                    >
                                        Chi tiết
                                    </button>
                                    {!order.isConfirm && (
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => { cancelOrderHandler(order) }}
                                        >
                                            Hủy đơn
                                        </button>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
