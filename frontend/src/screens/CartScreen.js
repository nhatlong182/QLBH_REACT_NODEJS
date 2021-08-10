import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// eslint-disable-next-line
import { addToCart, removeFromCart } from '../actions/cartAction.js';
import MessageBox from '../components/MessageBox'

export default function CartScreen(props) {
    const productID = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, qty));
        }
    }, [dispatch, productID, qty]);

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
                                                <div>
                                                    <select value={item.qty} onChange={e => dispatch(addToCart(item.id, Number(e.target.value)))}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
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
