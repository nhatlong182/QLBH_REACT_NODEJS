import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { categoryListReducer, homePopularListReducer, homeSaleOffListReducer, productCreateReducer, productDeleteReducer, productDetailReducer, productListReducer, productUpdateReducer } from './reducers/productReducer.js';
import { cartReducer } from './reducers/cartReducer.js';
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducer.js';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListOfUserReducer, orderListReducer, orderUpdateReducer } from './reducers/orderReducer.js';

const initialState = {
    cart: { cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] },
    userSignin: { userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null },
};

const reducer = combineReducers({
    //products
    popularProductList: homePopularListReducer,
    saleOffProductList: homeSaleOffListReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
    categoryList: categoryListReducer,
    productCreate: productCreateReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,
    //cart
    cart: cartReducer,
    //user
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailsReducer,
    listUser: userListReducer,
    deleteUser: userDeleteReducer,
    updateUser: userUpdateReducer,
    updateProfile: userUpdateProfileReducer,
    //order
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailsReducer,
    listOrder: orderListReducer,
    listOrderOfUser: orderListOfUserReducer,
    updateOrder: orderUpdateReducer,
    deliverOrder: orderDeliverReducer,
    deleteOrder: orderDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;