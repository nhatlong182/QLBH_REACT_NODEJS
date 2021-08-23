import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { homePopularListReducer, homeSaleOffListReducer, productDetailReducer, productListReducer } from './reducers/productReducer.js';
import { cartReducer } from './reducers/cartReducer.js';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducer.js';

const initialState = {
    cart: { cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] },
    userSignin: { userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null },
};

const reducer = combineReducers({
    popularProductList: homePopularListReducer,
    saleOffProductList: homeSaleOffListReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;