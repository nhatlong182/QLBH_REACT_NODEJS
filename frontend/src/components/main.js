import React from 'react'
import { Route, Switch } from 'react-router-dom';
import CartScreen from '../screens/CartScreen.js';
import HomeScreen from '../screens/HomeScreen.js'
import ProductDetailScreen from '../screens/ProductDetailScreen.js'
import SinginScreen from '../screens/SigninScreen.js'

export default function Main() {
    return (
        <main>
            <div className="slider"></div>
            <Switch>
                <Route path="/signin" component={SinginScreen}></Route>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                <Route path="/products/:id" component={ProductDetailScreen} exact></Route>
                <Route path="/" component={HomeScreen} exact></Route>
            </Switch>
        </main>
    )
}
