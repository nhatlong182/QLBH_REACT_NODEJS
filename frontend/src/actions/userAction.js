import axios from "axios";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants.js"

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

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        // sessionStorage.setItem('userInfo', JSON.stringify(data));

        alert("Đăng ký tài khoản thành công!!!")
        document.location.href = '/signin';

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