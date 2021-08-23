import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_RANDOM_FAIL, PRODUCT_RANDOM_REQUEST, PRODUCT_RANDOM_SUCCESS, PRODUCT_SALEOFF_FAIL, PRODUCT_SALEOFF_REQUEST, PRODUCT_SALEOFF_SUCCESS } from '../constants.js';

export const homePopularListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_RANDOM_REQUEST:
            return { loading: true };
        case PRODUCT_RANDOM_SUCCESS:
            return {
                loading: false,
                products: action.payload
            };
        case PRODUCT_RANDOM_FAIL:
            return { loading: false, errors: action.payload };
        default: return state;
    }
}

export const homeSaleOffListReducer = (state = { _loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_SALEOFF_REQUEST:
            return { loading: true };
        case PRODUCT_SALEOFF_SUCCESS:
            return {
                _loading: false,
                saleProduct: action.payload
            };
        case PRODUCT_SALEOFF_FAIL:
            return { loading: false, _errors: action.payload };
        default: return state;
    }
}

export const productListReducer = (state = { loading: true, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                limit: action.payload.limit,
                pages: action.payload.pages,
            };
        case PRODUCT_LIST_FAIL:
            return { loading: false, errors: action.payload };
        default: return state;
    }
}

export const productDetailReducer = (state = { loading: true, product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}