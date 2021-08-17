import axios from 'axios';
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_RANDOM_FAIL, PRODUCT_RANDOM_REQUEST, PRODUCT_RANDOM_SUCCESS } from '../constants.js';

export const popularProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_RANDOM_REQUEST,
    })
    try {
        const { data } = await axios.get(`/api/products/home`)
        dispatch({ type: PRODUCT_RANDOM_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_RANDOM_FAIL, payload: error.message });
    }
}

export const listProducts = ({ pageNumber = '' }) => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    })
    try {
        const { data } = await axios.get(`/api/products?page=${pageNumber}&limit=12`)
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