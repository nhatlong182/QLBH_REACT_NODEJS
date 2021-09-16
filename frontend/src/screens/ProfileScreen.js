import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userAction.js';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../css/profile.css'



export default function ProfileScreen() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [avatar, setAvatar] = useState('');

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const userDetails = useSelector((state) => state.userDetail);
	const { loading, error, user } = userDetails;

	const dispatch = useDispatch();

	useEffect(() => {
		if (!user) {
			dispatch(detailsUser(userInfo._id));
		}
		else {
			setName(user.name);
			setEmail(user.email);
			user.phone ? setPhone(user.phone) : setPhone('');
			setAvatar(user.avatar);
		}
	}, [dispatch, userInfo._id, user]);

	const submitHandler = (e) => {
		e.preventDefault();

		console.log(name, email, phone, avatar);
	}

	return (
		<div>
			<form className="" onSubmit={submitHandler}>
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					<div className="content-pf" >
						<div className="container-fluid">
							<img src={avatar} alt="profile-avatar" className=""></img>

							<div className="pf-row">
								<div className="pf_text"><label htmlFor="name">Tên hiển thị* </label></div>
								<div className="pf_box">
									<input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled />
								</div>
							</div>
							<div className="pf-row">
								<div className="pf_text"><label htmlFor="phone">Số điện thoại* </label></div>
								<div className="pf_box">
									<input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} disabled />
								</div>
							</div>
						</div>

						<div className="container-fluid">
							<div className="pf-row">
								<div className="text_pass"><h3>Thay đổi mật khẩu</h3></div>
							</div>
							<div className="pf-row">
								<div className="pf_text"><label htmlFor="password_current">Mật khẩu hiện tại (bỏ trống nếu không đổi)</label></div>
								<div className="pf_box"><input id="password_current" type="password" onChange={(e) => setPassword(e.target.value)} /></div>
							</div>
							<div className="pf-row">
								<div className="pf_text"><label htmlFor="password_new">Mật khẩu mới (bỏ trống nếu không đổi)</label></div>
								<div className="pf_box"><input id="password_new" type="password" onChange={(e) => setNewPassword(e.target.value)} /></div>
							</div>
							<div className="pf-row">
								<div className="pf_text"><label htmlFor="password_new_confirm">Xác nhận mật khẩu mới</label></div>
								<div className="pf_box"><input id="password_new_confirm" type="password" onChange={(e) => setConfirmPassword(e.target.value)} /></div>
							</div>

						</div>
						<div className="pf_btn">
							<button type="submit" className="btn-submit">Lưu thay đổi</button>
						</div>
					</div>
				)}
			</form>
		</div>
	)
}
