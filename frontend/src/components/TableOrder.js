import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrder, verifyOrder } from '../actions/orderAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function TableOrder(props) {
    const orderList = useSelector((state) => state.listOrder);
    const { loading, error, orders, page, pages } = orderList;

    const orderUpdate = useSelector((state) => state.updateOrder)
    const { error: errorVerify, success: successVerify } = orderUpdate;

    const [pageNumber, setPageNumber] = useState(1)
    const [name, setName] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listOrder({ pageNumber }));
    }, [dispatch, pageNumber, successVerify]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="col-md-12">
            {errorVerify && <MessageBox variant="danger">{errorVerify}</MessageBox>}
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
                                <td>{order.isConfirm ? "Đã xác nhận" : "Chờ xử lý"}</td>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pages > 1 && (
                <div className="row center pagination">
                    {[...Array(pages).keys()].map((x) => (
                        <button
                            type="button"
                            className={x + 1 === page ? 'active' : ''}
                            key={x + 1}
                            onClick={() => setPageNumber(x + 1)}
                        >
                            {x + 1}
                        </button>
                    ))}
                </div>
            )}
        </div >
    )
}
