import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productDetail } from '../actions/productAction.js';
import { addToCart } from '../actions/cartAction.js';

import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js'
import '../css/productDetail.css'


export default function ProductDetailScreen(props) {
    const dispatch = useDispatch();
    const productID = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetails;

    const qtyHandler = (type) => {
        if (type === 'plus') {
            if (qty >= product.countInStock) {
                alert(`Chỉ còn ${product.countInStock} sản phẩm trong kho`)
            }
            else {
                setQty(qty + 1)
            }
        }
        else {
            setQty(qty - 1 < 1 ? 1 : qty - 1)
        }
    }

    useEffect(() => {
        dispatch(productDetail(productID));
    }, [dispatch, productID]);


    const addToCartHandler = () => {
        // props.history.push(`/cart/${productID}?qty=${qty}`);
        dispatch(addToCart(productID, qty));
    }

    return (
        <div>
            {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                (<div>
                    <Link to="/">Trở lại trang chủ</Link>
                    <div className="row top">
                        <div>
                            <img className="aaa" src={product.image} alt={product.name}></img>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>Giá: {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</li>
                                <li>
                                    <p>Mô tả: {product.description} </p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div>
                                <ul>
                                    <li>
                                        <div>
                                            <div>Giá</div>
                                            <div className="price">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div >
                                            <div>Trạng thái</div>
                                            <div>{product.countInStock > 0 ? <span className="success">Còn hàng</span> : <span className="error">Hết hàng</span>}</div>
                                        </div>
                                    </li>
                                    {
                                        product.countInStock > 0 && (
                                            <>
                                                <li>
                                                    <div >
                                                        <div>Số lượng</div>
                                                        <div className="quantity-container">
                                                            <div className="icon-minus" onClick={() => qtyHandler('minus')}><i className="fas fa-minus"></i></div>
                                                            <div className="qty">{qty}</div>
                                                            <div className="icon-plus" onClick={() => qtyHandler('plus')}><i className="fas fa-plus"></i></div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button onClick={addToCartHandler} className="primary block">Thêm vào giỏ hàng</button>
                                                </li>
                                            </>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div >)
            }
        </div >
    );
}
