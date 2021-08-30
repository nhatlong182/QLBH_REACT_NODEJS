import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartAction.js';

import MessageBox from '../components/MessageBox'
import '../css/cart.css';

export default function CartScreen(props) {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;


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
        props.history.push(`/signin?redirect=shipping`);
    }

    return (
        <div className="row-top">
            <div className="col2">
                <h1 className="spcart">Giỏ hàng</h1>
                {
                    cartItems.length === 0 ? <MessageBox> Giỏ hàng rỗng. <Link to="/">Tiếp tục mua sắm</Link> </MessageBox>
                        : (
                            <ul>
                                {
                                    cartItems.map((item) => (
                                        <li key={item.id}>

                                            <div className="aaa">
                                                <div className="hinh">
                                                    <img className="picc" src={item.image} alt={item.name}></img>
                                                </div>
                                                <div className="namee">
                                                    <Link to={`/products/${item.id}`}>{item.name}</Link>
                                                </div>
                                                <div className="qty_container">
                                                    <div className="icon_cart-" onClick={() => qtyHandler('minus', item)}><i class="fas fa-minus"></i></div>
                                                    <div className="qty_cart">{item.qty}</div>
                                                    <div className="icon_cartplus" onClick={() => qtyHandler('plus', item)}><i class="fas fa-plus"></i></div>
                                                </div>
                                                <div className="pricee">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                                <div>
                                                    <button className="btnx" type="button" onClick={() => removeFromCartHandler(item.id)}>Xóa</button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                }
            </div>

            <div className="subtotal">
                <div className="sub_detail">
                    <ul>
                        <li>
                            <h2 className="sub_text">Tạm tính ({cartItems.reduce((a, c) => a + c.qty, 0)} sản phẩm)
                                : {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h2>
                        </li>
                        <li>
                            <button type="button" className="btn_cart" onClick={checkoutHandler} disabled={cartItems.length === 0}> Đặt hàng </button>
                        </li>
                    </ul>
                </div>
            </div>

        </div >
    )
}
