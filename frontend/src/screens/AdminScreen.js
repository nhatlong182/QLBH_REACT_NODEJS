import React from 'react'
import { Route, Switch, Link } from 'react-router-dom';

import TableProduct from '../components/TableProduct.js';
import TableUser from '../components/TableUser.js';
import TableOrder from '../components/TableOrder.js'

import '../css/admin.css'

export default function AdminScreen() {


    return (
        <div className="aa">
            <aside className="menu-sidebar">
                <div className="menu-sidebar__content">
                    <nav className="navbar-sidebar">
                        <ul className="navbar__list">

                            <li>
                                <Link to="/admin/tableProduct">
                                    <i className="fas fa-tag"></i>
                                    <i className="pzpz"></i>Sản phẩm</Link>
                            </li>
                            <li>
                                <Link to="/admin/tableOrder">
                                    <i className="fas fa-shopping-cart"></i>
                                    <i className="pzpz"></i>Đơn hàng</Link>
                            </li>

                            <li>
                                <Link to="/admin/tableUser">
                                    <i className="fas fa-user"></i>
                                    <i className="pzpz"></i>Tài khoản</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <div className="bb clearfix">
                <Switch>
                    <Route path="/admin" component={TableProduct} exact></Route>
                    <Route path="/admin/tableProduct" component={TableProduct} exact></Route>

                    <Route path="/admin/tableOrder" component={TableOrder} exact></Route>
                    <Route path="/admin/tableUser" component={TableUser} exact></Route>
                </Switch>
            </div>
        </div>
    )
}
