import React from 'react'
import { Route, Switch } from 'react-router-dom';
import CartScreen from '../screens/CartScreen.js';
import HomeScreen from '../screens/HomeScreen.js'
import ProductDetailScreen from '../screens/ProductDetailScreen.js'
import RegisterScreen from '../screens/RegisterScreen.js';
import SearchScreen from '../screens/SearchScreen.js';
import SinginScreen from '../screens/SigninScreen.js'

export default function Main() {
    return (
        <main>
            <Switch>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                <Route path="/products/:id" component={ProductDetailScreen} exact></Route>
                <Route path="/signin" component={SinginScreen}></Route>
                <Route path="/register" component={RegisterScreen}></Route>


                <Route
                    path="/search"
                    component={SearchScreen}
                    exact
                ></Route>
                <Route
                    path="/search/category/:category"
                    component={SearchScreen}
                    exact
                ></Route>
                <Route
                    path="/search/pageNumber/:pageNumber"
                    component={SearchScreen}
                    exact
                ></Route>
                <Route
                    path="/search/category/:category/pageNumber/:pageNumber"
                    component={SearchScreen}
                    exact
                ></Route>

                <Route path="/" component={HomeScreen} exact></Route>
            </Switch>
        </main>
    )
}
