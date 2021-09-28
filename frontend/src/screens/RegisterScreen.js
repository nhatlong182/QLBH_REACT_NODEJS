import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { register } from '../actions/userAction.js';


import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [sex, setSex] = useState('');
    const [avatar, setAvatar] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { success, loading, error } = userRegister;

    const dispatch = useDispatch();

    const avatarHandler = (sex) => {
        setSex(sex);
        setAvatar(sex === 'male' ? "/images/avatar.jpg" : "/images/avatarNu.jpg")
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!!!');
        } else {
            dispatch(register(name, email, phone, sex, avatar, password));
        }
    };

    useEffect(() => {
        if (success) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, success]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Tạo tài khoản</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Tên:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Nhập tên"
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Địa chỉ email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Nhập email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input
                        type="phone"
                        id="phone"
                        placeholder="Nhập Số điện thoại"
                        onChange={(e) => setPhone(e.target.value)}
                    ></input>
                </div>
                <div className="sex" onChange={(e) => { avatarHandler(e.target.value) }}>
                    <label htmlFor="male">Nam:</label>
                    <input className="male" type="radio" id="male" name="sex" value="male" required />
                    <label htmlFor="female">Nữ:</label>
                    <input className="male" type="radio" id="female" name="sex" value="female" required />
                </div>
                <div>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Nhập mật khẩu"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Nhập lại mật khẩu"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Đăng ký
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Đã có tài khoản?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>Đăng nhập</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
