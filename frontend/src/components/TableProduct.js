import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, listProducts } from '../actions/productAction.js';
import { listCategorys } from '../actions/productAction.js'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_DELETE_RESET } from '../constants.js';

export default function TableProduct(props) {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const deleteProducts = useSelector((state) => state.productDelete);
    const { error: errorDelete, success: successDelete } = deleteProducts;


    const [pageNumber, setPageNumber] = useState(1)
    const [limit] = useState(10)
    const [name, setName] = useState('')

    const dispatch = useDispatch()



    const deleteUserHandler = async (productId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            dispatch(deleteProduct(productId));
        }
    }

    const searchHandle = () => {
        console.log(name)
        if (name === '') {
            dispatch(listProducts({ pageNumber, limit, name }))
        }
        else {
            dispatch(listProducts({ name }))
        }
    }

    useEffect(() => {
        dispatch(listCategorys())
    }, [dispatch])

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
        dispatch(listProducts({ pageNumber, limit }));
        // eslint-disable-next-line
    }, [dispatch, pageNumber, limit, successDelete,]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : errorDelete ? (
        <MessageBox variant="danger">{errorDelete}</MessageBox>
    ) : (
        <div className="col-md-12">
            <div className="table-responsive">
                <h1 className="title-order">Danh sách sản phẩm</h1>
                <div className="row">
                    <div>
                        <i className="fas fa-search"></i>
                        <input type="search" className="search-text" placeholder="Tìm kiếm..." value={name} onChange={(e) => setName(e.target.value)}></input>
                        <button className="sp-search" type="button" onClick={() => searchHandle()}>Tìm kiếm</button>

                    </div>
                    <button className="btn-primary">
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
                            <th>Khuyển mãi</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
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
                                        className="small" id="btn-x"
                                        onClick={() => props.history.push(`/admin/tableProduct/edit/${product._id}`)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        type="button"
                                        className="small" id="btn-y"
                                        onClick={() => deleteUserHandler(product._id)}
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
