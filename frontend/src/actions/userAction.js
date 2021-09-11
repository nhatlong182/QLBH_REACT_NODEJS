import axios from "axios";
import swal from 'sweetalert';

import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, WEBMASTER_UPDATE_FAIL, WEBMASTER_UPDATE_REQUEST, WEBMASTER_UPDATE_SUCCESS } from "../constants.js"

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post('/api/accounts/signin', { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        sessionStorage.setItem('userInfo', JSON.stringify(data));
        if (data.isAdmin || data.isWebmaster) {
            document.location.href = '/admin';
        }
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const signout = () => async (dispatch) => {
    sessionStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({ type: USER_SIGNOUT });
    document.location.href = '/signin';
}

export const register = (name, email, phone, sex, avatar, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
        const { data } = await axios.post('/api/accounts/register', { name, email, phone, sex, avatar, password });

        dispatch({ type: USER_REGISTER_SUCCESS });

        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        swal({
            text: "Đăng ký tài khoản thành công!!!",
            icon: "success",
            button: false,
            timer: 1500,
        })
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await axios.get(`/api/accounts/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const listUser = ({ pageNumber = '', name = '' }) => async (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST })
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await axios.get(`/api/accounts?page=${pageNumber}&limit=10&name=${name}`, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
        })
        dispatch({ type: USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await axios.delete(`/api/accounts/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
        dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_DELETE_FAIL, payload: message });
    }
};

export const authorizeWebmaster = (userId) => async (dispatch, getState) => {
    dispatch({ type: WEBMASTER_UPDATE_REQUEST, payload: userId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await axios.put(`/api/accounts/webmaster/${userId}`, userId, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
        dispatch({ type: WEBMASTER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: WEBMASTER_UPDATE_FAIL, payload: message });
    }
};

export const unAuthorizeWebmaster = (userId) => async (dispatch, getState) => {
    dispatch({ type: WEBMASTER_UPDATE_REQUEST, payload: userId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await axios.put(`/api/accounts/unWebmaster/${userId}`, userId, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
        dispatch({ type: WEBMASTER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: WEBMASTER_UPDATE_FAIL, payload: message });
    }
};
