import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrder } from '../actions/orderAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function TableOrder() {
    const orderList = useSelector((state) => state.listOrder);
    const { loading, error, orders } = orderList;


    // const [pageNumber, setPageNumber] = useState(1)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(listOrder());
    }, [dispatch]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="col-md-12">
            <div className="table-responsive">
                <h1>Danh sách đơn hàng</h1>
                <table className="table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Ngày đặt hàng</th>
                            <th>Tổng tiền</th>
                            <th>Xác nhận</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td>{order.isConfirm ? "Đã xử lý" : "Chờ xử lý"}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                    >
                                        Detail
                                    </button>
                                    <button
                                        type="button"
                                        className="small"

                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div className="row center pagination">
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
            </div> */}
        </div>
    )
}
