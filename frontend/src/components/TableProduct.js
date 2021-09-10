import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
import { listProducts } from '../actions/productAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function TableProduct() {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const [arraysFilter, setArraysFilter] = useState([])
    const [display, setDisplay] = useState(true)

    const dispatch = useDispatch()

    //phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [pPerPage] = useState(10);


    const indexOfLast = currentPage * pPerPage;
    const indexOfFirst = indexOfLast - pPerPage;
    const currentProducts = products?.slice(indexOfFirst, indexOfLast);


    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(products?.length / pPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);
    //hết code phân trang


    const onTextChangeHandler = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = products.filter(item => {
                const regex = new RegExp(`${text}`, 'i')
                return item.name.match(regex)
            })
            setDisplay(false)
        }

        if (text.length === 0) {
            setDisplay(true)
        }
        setArraysFilter(matches)
    }


    useEffect(() => {
        dispatch(listProducts({}));
    }, [dispatch]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="col-md-12">
            <div className="table-responsive">
                <h1>Danh sách sản phẩm</h1>
                <input type="text" className="" onChange={(e) => onTextChangeHandler(e.target.value)}></input>
                <table className="table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Loại</th>
                            <th>Hãng</th>
                            <th>Sale off</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(arraysFilter.length > 0 ? arraysFilter : currentProducts).map((product) => (
                            <tr key={product._id}>
                                <td className="img-container"><img className="img__a" src={product.image} alt={product.name} /></td>
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

            {display && (
                <div className='row center pagination'>
                    {pageNumbers.map(number => (
                        <button key={number} type="button" onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </button>
                    ))}
                </div>
            )}
        </div>

    )
}
