import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../css/form.css'

export default function SigninScreen(props) {

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = useSelector((state) => state.userSignin)
    const { loading, error, userInfo } = user

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Đăng nhập</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label className="sigin-label" htmlFor="email">Email:</label>
                    <input
                        className="signin-input"
                        type="email"
                        id="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label className="sigin-label" htmlFor="password">Mật khẩu:</label>
                    <input
                        className="signin-input"
                        type="password"
                        id="password"
                        placeholder="Mật khẩu"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Đăng nhập
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Chưa có tài khoản?{' '}
                        <Link className="reg-link" to={`/register`}>
                            Tạo mới tài khoản
                        </Link>
                    </div>
                </div>
                <div>
                    <Link className="reg-link" to={`/forgot`}>
                        Quên mật khẩu
                    </Link>
                </div>
            </form>
        </div>
    )
}
