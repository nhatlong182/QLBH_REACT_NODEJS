import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCategorys } from '../actions/productAction.js'
import { signout } from '../actions/userAction.js'
import CartIcon from '../assets/shoppingCart.png'
import UserIcon from '../assets/user.png'

import "../css/header.css"

export default function Header() {
    // eslint-disable-next-line
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const Category = useSelector((state) => state.categoryList)
    const { categories } = Category;

    const Cart = useSelector((state) => state.cart);
    const { cartItems } = Cart;

    const User = useSelector((state) => state.userSignin)
    const { userInfo } = User;

    const dispatch = useDispatch()

    const signoutHandler = () => {
        dispatch(signout())
    }

    useEffect(() => {
        dispatch(listCategorys())
    }, [dispatch])

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
                <aside id="sidebar" className={sidebarIsOpen ? 'open' : ''}>
                    <div className="sidebar_0">
                        <button onClick={() => setSidebarIsOpen(false)} className="close-sidebar" type="button">X</button>
                        <ul className="ul_collection">
                            <li className="inside">
                                <a href="/">TRANG CHỦ</a>
                            </li>
                            <li className="inside">
                                <a href="/category">SẢN PHẨM</a>
                                <ul className="ul_collection">
                                    {categories?.map((category, index) => (
                                        <li key={index} className="inside">
                                            <a href={`/category/${category}`}>{category}</a>
                                        </li>
                                    ))}
                                    <li><a href={`/category/sale/true`}>Các sản phẩm đang khuyến mãi</a></li>
                                </ul>
                            </li>


                        </ul>
                    </div>
                </aside>
                <Link className="logo" to="/">PL-STORE</Link>
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

