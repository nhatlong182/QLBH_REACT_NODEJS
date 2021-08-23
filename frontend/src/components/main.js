import React from 'react'
import { Route, Switch } from 'react-router-dom';
import AdminScreen from '../screens/AdminScreen.js';
import CartScreen from '../screens/CartScreen.js';
import HomeScreen from '../screens/HomeScreen.js'
import ProductDetailScreen from '../screens/ProductDetailScreen.js'
import RegisterScreen from '../screens/RegisterScreen.js';
import SearchScreen from '../screens/SearchScreen.js';
import ShippingAddressScreen from '../screens/ShippingAddressScreen.js';
import SinginScreen from '../screens/SigninScreen.js'

export default function Main() {
    return (
        <main>
            <Switch>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                <Route path="/products/:id" component={ProductDetailScreen} exact></Route>
                <Route path="/signin" component={SinginScreen}></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                <Route path="/shipping" component={ShippingAddressScreen}></Route>

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

                <Route
                    path="/admin"
                    component={AdminScreen}
                    exact
                ></Route>

                <Route path="/" component={HomeScreen} exact></Route>
            </Switch>
        </main>
    )
}
