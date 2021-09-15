import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_RANDOM_FAIL, PRODUCT_RANDOM_REQUEST, PRODUCT_RANDOM_SUCCESS, PRODUCT_SALEOFF_FAIL, PRODUCT_SALEOFF_REQUEST, PRODUCT_SALEOFF_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from '../constants.js';

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

export const categoryListReducer = (state = { loading: true, categories: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_DELETE_RESET:
            return {};
        default:
            return state;
    }
};

export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};