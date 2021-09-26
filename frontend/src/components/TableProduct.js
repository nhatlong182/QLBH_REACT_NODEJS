import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, listProducts } from '../actions/productAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_DELETE_RESET } from '../constants.js';

export default function TableProduct(props) {
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

    const paginate = (pageNumber) => {

        setCurrentPage(pageNumber);
    }
    //hết code phân trang


    const onTextChangeHandler = (text) => {
        if (text.length === 0) {
            setDisplay(true)
        }

        let matches = []
        if (text.length > 0) {
            matches = products.filter(item => {
                const regex = new RegExp(`${text}`, 'i')
                return item.name.match(regex) || item.brand.match(regex)
            })
            setDisplay(false)
        }
        setArraysFilter(matches)
    }

    const deleteUserHandler = async (productId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            dispatch(deleteProduct(productId));
        }
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
        dispatch({ type: PRODUCT_DELETE_RESET },)
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
                <div className="row">
                    <input type="text" className="" onChange={(e) => onTextChangeHandler(e.target.value)}></input>
                    <button className="primary">
                        <Link to="/admin/tableProduct/create" className="add_product_btn">Thêm sản phẩm</Link>
                    </button>
                </div>
                <table className="table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Loại</th>
                            <th>Hãng</th>
                            <th>Số lượng</th>
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
                                <td>{product.countInStock}</td>
                                <td>{product.saleOff}%</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => props.history.push(`/admin/tableProduct/edit/${product._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => deleteUserHandler(product._id)}
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
                <ul className='row center pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} onClick={() => paginate(number)} className={number === currentPage ? "page-link active" : "page-link"}>
                            {number}
                        </li>
                    ))}
                </ul>
            )}
        </div >

    )
}
