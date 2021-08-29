import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../css/profile.css'



export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetail);
    const { loading, error, user } = userDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(detailsUser(userInfo._id));
        }
    }, [dispatch, userInfo._id, user]);

    return (
        <div style={{ backgroundColor: '#F2F1EF', height: '100vh' }}>
            {
                loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :
                    (
                        <div className="profile-container">
                            <div className="profile-title">
                                <h1>Hồ sơ của tôi</h1>
                                <h2>Quản lý thông tin hồ sơ</h2>
                                <hr></hr>
                            </div>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
                            {/* <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div> */}
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Enter confirm password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></input>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
