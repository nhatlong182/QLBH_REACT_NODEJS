import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
import { listProducts } from '../actions/productAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function TableProduct() {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;


    const [pageNumber, setPageNumber] = useState(1)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(listProducts({ pageNumber }));
    }, [dispatch, pageNumber]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="col-md-12">
            <div className="table-responsive">
                <h1>Danh sách sản phẩm</h1>
                <table className="table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Loại</th>
                            <th>Hãng</th>
                            <th>Sale off</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.saleOff}%</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                    >
                                        Edit
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
        </div>

    )
}
