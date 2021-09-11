import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { signout } from '../actions/userAction.js'
import CartIcon from '../assets/shoppingCart.png'
import UserIcon from '../assets/user.png'

import "../css/header.css"

export default function Header() {
    // eslint-disable-next-line
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
                <button type="button" className="open-sidebar" onClick={() => setSidebarIsOpen(true)}>
                    <i className="fa fa-bars"></i>
                </button>

                <aside className={sidebarIsOpen ? 'open' : ''}>
                    <div className="sidebar_0">
                        <button onClick={() => setSidebarIsOpen(false)} className="close-sidebar" type="button">X
                            {/* <i className="fa fa-close"></i> */}
                        </button>
                        <div className="account">

                            <img className="account_img" src="//bizweb.dktcdn.net/100/331/067/themes/823156/assets/i_user.png?1629583623533"></img>
                            <ul className="account_header">
                                <li>
                                    <a href="/signin">Đăng nhập</a>
                                </li>

                            </ul>
                        </div>
                        <ul className="ul_collection">
                            <li className="inside"></li>
                            <a href="/">TRANG CHỦ</a>
                            <li className="inside"></li>
                            <a href="/search">SẢN PHẨM</a>
                            <li className="inside"></li>
                            <a href="#">TÀI KHOẢN</a>
                        </ul>
                    </div>
                </aside>
                <Link className="logo" to="/">PL-STORE</Link>
                <Link to="/category">
                    Sản phẩm
                </Link>
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
                            {userInfo && (userInfo.isAdmin || userInfo.isWebmaster) && (
                                <li>
                                    <Link to="/admin">Trang quản lý</Link>
                                </li>
                            )}
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

