import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// eslint-disable-next-line
import { addToCart, removeFromCart } from '../actions/cartAction.js';
import MessageBox from '../components/MessageBox'
import '../css/cart.css';

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
        console.log(cart)
    }

    return (
        <div className="row-top">
            <div className="col2">
                <h1 className="spcart">Giỏ hàng</h1>
                {/* <hr className="hr-margin-1"></hr>                   */}
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
                                                    {/* <select className="b" value={item.qty} onChange={e => dispatch(addToCart(item.id, Number(e.target.value)))}>
                                                        {
                                                            [...Array(20).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </select> */}
                                                    <div className="icon_cart-" onClick={() => qtyHandler('minus', item)}><i class="fas fa-minus"></i></div>
                                                    <div className="qty_cart">{item.qty}</div>
                                                    <div className="icon_cartplus" onClick={() => qtyHandler('plus', item)}><i class="fas fa-plus"></i></div>
                                                           
                                                </div>
                                                <div className="pricee">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                                <div>
                                                    <button className="btnx"type="button" onClick={() => removeFromCartHandler(item.id)}>Xóa</button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                }
                {/* <hr className="hr-margin-2"></hr>  */}
                
            </div>
               
            <div className="subtotal">
                <div className="sub_detail">
                    <ul>
                        <li>
                            <h2 className="sub_text">Tạm tính ({cartItems.reduce((a, c) => a + c.qty, 0)} sản phẩm)
                                : {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h2>
                        </li>
                        <li>
                            <button type="button" className="btn_cart" onClick={checkoutHandler} disabled={cartItems.length === 0}> Thanh toán</button>
                        </li>
                    </ul>
                </div>
            </div>

        </div >
    )
}
