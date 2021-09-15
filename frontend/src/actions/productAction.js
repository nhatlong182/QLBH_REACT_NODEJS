import axios from 'axios';
import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_RANDOM_FAIL, PRODUCT_RANDOM_REQUEST, PRODUCT_RANDOM_SUCCESS, PRODUCT_SALEOFF_FAIL, PRODUCT_SALEOFF_REQUEST, PRODUCT_SALEOFF_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from '../constants.js';

export const popularProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_RANDOM_REQUEST,
    })
    try {
        const { data } = await axios.get(`/api/products/popular`)
        dispatch({ type: PRODUCT_RANDOM_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_RANDOM_FAIL, payload: error.message });
    }
}
export const saleOffProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_SALEOFF_REQUEST,
    })
    try {
        const { data } = await axios.get(`/api/products/saleOff`)
        dispatch({ type: PRODUCT_SALEOFF_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_SALEOFF_FAIL, payload: error.message });
    }
}

export const listProducts = ({ pageNumber = '', limit = '', category = '', name = '', sale = '' }) => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    })
    try {
        const { data } = await axios.get(`/api/products?category=${category}&name=${name}&page=${pageNumber}&limit=${limit}&sale=${sale}`)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
}
export const listCategorys = () => async (dispatch) => {
    dispatch({
        type: CATEGORY_LIST_REQUEST,
    })
    try {
        const { data } = await axios.get(`/api/products/categories`)
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
    }
}

export const listProductsWithoutPaginate = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    })
    try {
        const { data } = await axios.get(`/api/products`)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
}

export const productDetail = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
    })
    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
}

export const createProduct = (name, price, image, category, countInStock, brand, description) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await axios.post('/api/products', { name, price, image, category, countInStock, brand, description },
            { headers: { Authorization: `Bearer ${userInfo.token}` }, }
        );
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        await axios.delete(`/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
};

export const updateProduct = (_id, name, price, image, category, brand, countInStock, description, isSale, saleOff) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: _id });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await axios.put(`/api/products/${_id}`, { name, price, image, category, countInStock, brand, description, isSale, saleOff }, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
};