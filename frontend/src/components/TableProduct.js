import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, listProducts } from '../actions/productAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function TableProduct() {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const deleteProducts = useSelector((state) => state.productDelete);
    const { error: errorDelete, success: successDelete } = deleteProducts;


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
        if (successDelete) {
            swal({
                text: "Xóa sản phẩm thành công",
                icon: "success",
                button: false,
                timer: 1500,
            });
        }

        dispatch(listProducts({}));
    }, [dispatch, successDelete]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : errorDelete ? (
        <MessageBox variant="danger">{errorDelete}</MessageBox>
    ) : (
        <div className="col-md-12">
            <div className="table-responsive">
                <h1>Danh sách sản phẩm</h1>
                <input type="text" className="" onChange={(e) => onTextChangeHandler(e.target.value)}></input>
                <Link to="/admin/tableProduct/create">Thêm sản phẩm</Link>
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
                                        onClick={() => dispatch(deleteProduct(product._id))}
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
