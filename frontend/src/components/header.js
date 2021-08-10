import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartIcon from '../assets/shoppingCart.png'
import UserIcon from '../assets/user.png'

import "../css/header.css"

export default function Header() {
    const Cart = useSelector((state) => state.cart);
    const { cartItems } = Cart;

    return (
        <header className="row">
            <div>
                <Link className="logo" to="/">PL-STORE</Link>
            </div>
            <div>
                <Link to="/cart">
                    <img className="cartIcon" src={CartIcon} alt="shopping cart icon" />
                    {cartItems.length > 0 && (<span className="cart-count">{cartItems.length}</span>)}
                </Link>
                <Link to="/signin"><img className="userIcon" src={UserIcon} alt="user icon" /></Link>
            </div>
        </header>
    )
}

