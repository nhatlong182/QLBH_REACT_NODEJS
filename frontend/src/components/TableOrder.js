import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrder, verifyOrder } from '../actions/orderAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants.js';

export default function TableOrder(props) {
    const orderList = useSelector((state) => state.listOrder);
    const { loading, error, orders, page, pages } = orderList;

    const orderUpdate = useSelector((state) => state.updateOrder)
    const { error: errorVerify, success: successVerify } = orderUpdate;

    const orderDelete = useSelector((state) => state.deleteOrder);
    const {
        error: errorDelete,
        success: successDelete,
    } = orderDelete;

    const [pageNumber, setPageNumber] = useState(1)
    const [name, setName] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if (successDelete) {
            swal({
                text: "Xóa đơn hàng thành công",
                icon: "success",
                button: false,
                timer: 1500,
            });
            dispatch({ type: ORDER_DELETE_RESET });
        }
        dispatch(listOrder({ pageNumber }));
    }, [dispatch, pageNumber, successVerify, successDelete]);

    const deleteHandler = (order) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
            dispatch(deleteOrder(order._id));
        }
    };

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="col-md-12">
            {errorVerify && <MessageBox variant="danger">{errorVerify}</MessageBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            <div className="table-responsive">
                <h1>Danh sách đơn hàng</h1>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                <button type="button" onClick={() => dispatch(listOrder({ pageNumber, name }))}>Tìm kiếm</button>
                <table className="table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên người đặt hàng</th>
                            <th>SĐT</th>
                            <th>Ngày đặt hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>ACTIONS</th>
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
                                <td>{order.isConfirm ? <span className="confirm">Đã xác nhận</span> : "Chờ xử lý"}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => props.history.push(`/admin/order/${order._id}`)}
                                    >
                                        Chi tiết
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => dispatch(verifyOrder(order._id))}
                                        disabled={order.isConfirm}
                                    >
                                        Xác nhận
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => deleteHandler(order)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pages > 1 && (
                <ul className="row center pagination">
                    {[...Array(pages).keys()].map((x) => (
                        <li
                            className={x + 1 === page ? 'page-link active' : 'page-link'}
                            key={x + 1}
                            onClick={() => setPageNumber(x + 1)}
                        >
                            {x + 1}
                        </li>
                    ))}
                </ul>
            )}
        </div >
    )
}
