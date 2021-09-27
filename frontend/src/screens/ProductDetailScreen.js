import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
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
        dispatch(addToCart(productID, qty));
        swal({
            text: "Sản phẩm đã được thêm vào giỏ hàng!!!",
            icon: "success",
            button: false,
            timer: 1500,
        });
    }

    return (
        <div>
            {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                (<div>
                    <div className="row top">
                        <div className="col-2">
                            <img className="pic_detail" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="detail">
                            <ul>
                                <li>
                                    <h1 className="name_detail">{product.name}</h1>
                                </li>
                                <li>{product.isSale ? (
                                    <div className="detail-price-container">
                                        <span className="detail-price-title">Giá:</span>
                                        <span className="detail-price-new">{(product.price - (product.price * product.saleOff / 100)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                        <span className="detail-price-old">{(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                        <span className="discount_">{product.saleOff}%</span>
                                    </div>
                                ) : (<span className="price">Giá: {(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>)}
                                </li>
                                <li>
                                    <p className="desc">Mô tả: {product.description} </p>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <div >
                                        <div>Trạng thái: {product.countInStock > 0 ? <span className="success">Còn hàng</span> : <span className="error">Hết hàng</span>}</div>
                                    </div>
                                </li>
                                {product.countInStock > 0 && (
                                    <>
                                        <li>
                                            <div className="stock">
                                                <div>Số lượng</div>
                                                <div className="quantity-container">
                                                    <div className="icon-minus" onClick={() => qtyHandler('minus')}><i className="fas fa-minus"></i></div>
                                                    <div className="qty">{qty}</div>
                                                    <div className="icon-plus" onClick={() => qtyHandler('plus')}><i className="fas fa-plus"></i></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button onClick={addToCartHandler} className="btn">Thêm vào giỏ hàng</button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div >)
            }
        </div >
    );
}
