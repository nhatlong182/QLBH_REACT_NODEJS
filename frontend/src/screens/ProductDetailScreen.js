import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productDetail } from '../actions/productAction.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js'
import Rating from '../components/Rating.js'
import '../css/productDetail.css'

export default function ProductDetailScreen(props) {
    const dispatch = useDispatch();
    const productID = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(productDetail(productID));
    }, [dispatch, productID]);


    const addToCartHandler = () => {
        props.history.push(`/cart/${productID}?qty=${qty}`);
    }

    return (
        <div>
            {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                (<div>
                    <Link to="/">Trở lại trang chủ</Link>
                    <div className="row top">
                        <div className="">
                            <img className="aaa" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="">
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li>
                                    <Rating
                                        rating={product.rating}
                                        numReviews={product.numReviews}
                                    ></Rating>
                                </li>
                                <li>Giá: {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</li>
                                <li>
                                    <p>Mô tả: {product.description} </p>
                                </li>
                            </ul>
                        </div>
                        <div className="">
                            <div className="">
                                <ul>
                                    <li>
                                        <div className="">
                                            <div>Giá</div>
                                            <div className="price">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="">
                                            <div>Trạng thái</div>
                                            <div>{product.countInStock > 0 ? <span className="success">Còn hàng</span> : <span className="error">Hết hàng</span>}</div>
                                        </div>
                                    </li>
                                    {
                                        product.countInStock > 0 && (
                                            <>
                                                <li>
                                                    <div className="">
                                                        <div>Số lượng</div>
                                                        <div>
                                                            {/* <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))}
                                                            </select> */}
                                                            <input type="number" className="" value="1" min="1" max={product.countInStock} />
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
        </div>
    );
}
