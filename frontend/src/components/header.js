import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signout } from '../actions/userAction.js'
import CartIcon from '../assets/shoppingCart.png'
import UserIcon from '../assets/user.png'

import "../css/header.css"

export default function Header() {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const Cart = useSelector((state) => state.cart);
    const { cartItems } = Cart;

    const User = useSelector((state) => state.userSignin)
    const { userInfo } = User;

    const dispatch = useDispatch()

    const signoutHandler = () => {
        dispatch(signout())
    }

    return (
        <header className="row">
            <div>
                <button
                    type="button"
                    className="open-sidebar"
                    onClick={() => setSidebarIsOpen(true)}
                >
                    <i className="fa fa-bars"></i>
                </button>
                <Link className="logo" to="/">PL-STORE</Link>
            </div>
            <div>
                <div className="dropdown">
                    <Link to="/search">
                        Sản phẩm <i className="fa fa-caret-down"></i>{' '}
                    </Link>
                    <ul className="dropdown-content">
                        <li>
                            <Link to="/search/category/pants">Quần</Link>
                        </li>
                        <li>
                            <Link to="/search/category/shirts">Áo</Link>
                        </li>

                    </ul>
                </div>
            </div>
            <div>
                <Link to="/cart">
                    <img className="cartIcon" src={CartIcon} alt="shopping cart icon" />
                    {cartItems.length > 0 && (<span className="cart-count">{cartItems.length}</span>)}
                </Link>
                {userInfo ? (
                    <div className="dropdown">
                        <Link to="#">
                            <img className="avatar" src={userInfo.avatar} alt="avatar"></img><i className="fa fa-caret-down"></i>{' '}
                        </Link>
                        <ul className="dropdown-content">
                            <li>
                                <Link to="/profile">User Profile</Link>
                            </li>
                            <li>
                                <Link to="/orderhistory">Đơn hàng</Link>
                            </li>
                            <li>
                                <Link to="#signout" onClick={signoutHandler}>
                                    Đăng xuất
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/signin"><img className="userIcon" src={UserIcon} alt="user icon" /></Link>
                )}
            </div>
        </header>
    )
}

