import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartAction.js';
import MessageBox from '../components/MessageBox'
import '../css/cart.css'

export default function CartScreen(props) {
    const productID = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, quantity));
        }
    }, [dispatch, productID, quantity]);

    const qtyHandler = (type, item) => {
        if (type === 'plus') {
            if (item.qty >= item.countInStock) {
                //setQty(1)
                alert(`Chỉ còn ${item.countInStock} sản phẩm trong kho`)
            }
            else {
                dispatch(addToCart(item.id, (item.qty + 1)))
            }
        }
        else {
            const a = item.qty - 1 < 1 ? 1 : item.qty - 1
            dispatch(addToCart(item.id, a))
        }
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
        //props.history.push(`/signin?redirect=shipping`);
        console.log(props);
        console.log(cart);
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Giỏ hàng</h1>
                {
                    cartItems.length === 0 ? <MessageBox> Giỏ hàng rỗng. <Link to="/">Tiếp tục mua sắm</Link> </MessageBox>
                        : (
                            <ul>
                                {
                                    cartItems.map((item) => (
                                        <li key={item.id}>
                                            <div className="row">
                                                <div>
                                                    <img className="small" src={item.image} alt={item.name}></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/products/${item.id}`}>{item.name}</Link>
                                                </div>
                                                <div className="quantity-container">
                                                    {/* <select value={item.qty} onChange={e => dispatch(addToCart(item.id, Number(e.target.value)))}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </select> */}
                                                    <div className="icon-minus" onClick={() => qtyHandler('minus', item)}><i class="fas fa-minus"></i></div>
                                                    <div className="qty">{item.qty}</div>
                                                    <div className="icon-plus" onClick={() => qtyHandler('plus', item)}><i class="fas fa-plus"></i></div>
                                                </div>
                                                <div>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                                <div>
                                                    <button type="button" onClick={() => removeFromCartHandler(item.id)}>X</button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Tạm tính ({cartItems.reduce((a, c) => a + c.qty, 0)} sản phẩm)
                                : {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h2>
                        </li>
                        <li>
                            <button type="button" className="primary block" onClick={checkoutHandler} disabled={cartItems.length === 0}> Thanh toán</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}
