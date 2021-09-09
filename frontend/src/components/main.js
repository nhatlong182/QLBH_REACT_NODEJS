import React from 'react'
import { Route, Switch } from 'react-router-dom';
import AdminOdDetailScreen from '../screens/AdminOdDetailScreen.js';
import AdminScreen from '../screens/AdminScreen.js';
import CartScreen from '../screens/CartScreen.js';
import HomeScreen from '../screens/HomeScreen.js'
import OrderDetailScreen from '../screens/OrderDetailScreen.js';
import ProductDetailScreen from '../screens/ProductDetailScreen.js'
import ProfileScreen from '../screens/ProfileScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import SearchScreen from '../screens/SearchScreen.js';
import ShippingAddressScreen from '../screens/ShippingAddressScreen.js';
import SinginScreen from '../screens/SigninScreen.js'
import AdminRoute from './AdminRoute.js';
import PrivateRoute from './PrivateRoute.js';

export default function Main() {
    return (
        <main>
            <Switch>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                <Route path="/products/:id" component={ProductDetailScreen} exact></Route>
                <Route path="/signin" component={SinginScreen}></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                <PrivateRoute path="/shipping" component={ShippingAddressScreen}></PrivateRoute>
                <Route path="/order/:id" component={OrderDetailScreen}></Route>

                <Route
                    path="/category"
                    component={SearchScreen}
                    exact
                ></Route>
                <Route
                    path="/category/:category"
                    component={SearchScreen}
                    exact
                ></Route>
                <Route
                    path="/category/pageNumber/:pageNumber"
                    component={SearchScreen}
                    exact
                ></Route>
                <Route
                    path="/category/:category/pageNumber/:pageNumber"
                    component={SearchScreen}
                    exact
                ></Route>


                <PrivateRoute
                    path="/profile"
                    component={ProfileScreen}
                ></PrivateRoute>
                <AdminRoute
                    path="/admin"
                    component={AdminScreen}
                    exact
                ></AdminRoute>
                <AdminRoute
                    path="/admin/:namePage"
                    component={AdminScreen}
                    exact
                ></AdminRoute>
                <AdminRoute
                    path="/admin/order/:id"
                    component={AdminOdDetailScreen}
                    exact
                ></AdminRoute>

                <Route path="/" component={HomeScreen} exact></Route>
            </Switch>
        </main>
    )
}
