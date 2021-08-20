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
        props.history.push(`/cart/${productID}?qty=${qty}`);
    }

    return (
        <div>
            {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                (<div>
                    {/* <Link to="/">Trở lại trang chủ</Link> */}
                    <div className="row top">
                        <div className="col-2">
                            <img className="pic_detail" src={product.image} alt={product.name}></img>
                        </div>
                        <div className="detail">
                            <ul>
                                <li>
                                    <h1 className="name_detail">{product.name}</h1>
                                </li>
                                {/* <li>
                                    <Rating
                                        rating={product.rating}
                                        numReviews={product.numReviews}
                                    ></Rating>
                                </li> */}
                                <li className="price_detail">Giá: {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</li>
                                <li>
                                    <p className="desc">Mô tả: {product.description} </p>
                                </li>
                            </ul>
                            <ul>
                                    {/* <li>
                                        <div className="">
                                            <div>Giá</div>
                                            <div className="">{product.price}.000đ</div>
                                        </div>
                                    </li> */}
                                    <li>
                                        <div className="status">
                                            {/* <div>Trạng thái</div> */}
                                            <div>Trạng thái: {product.countInStock > 0 ? <span className="success">Còn hàng</span> : <span className="error">Hết hàng</span>}</div>
                
                                        </div>                                      
                                    </li>
                                    {/* <li>
                                        <button className="c">aaaaaaaaaa </button>
                                    </li> */}
                                   
                                    {
                                        product.countInStock > 0 && (
                                            <>
                                                <li>
                                                    <div className="stock">
                                                        <div>Số lượng</div>
                                                        <div className="quantity-container">   
                                                             {/* <select className="a" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                {[...Array(20).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))}
                                                            </select> */}

                                                            <div className="icon_detail-" onClick={() => qtyHandler('minus')}><i class="fas fa-minus"></i></div>
                                                            <div className="qty_detail">{qty}</div>
                                                            <div className="icon_detailplus" onClick={() => qtyHandler('plus')}><i class="fas fa-plus"></i></div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button onClick={addToCartHandler} className="btn">Thêm vào giỏ hàng</button>
                                                </li>
                                            </>
                                        )
                                    }
                            </ul>
                        </div>                                              
                    </div>                   
                </div >)               
            }
        </div>
    );
}



