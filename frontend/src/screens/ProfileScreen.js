import React, { useEffect, useState } from 'react';
import bcryptjs from 'bcryptjs'
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userAction.js';
import { signout } from '../actions/userAction.js'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants.js';
import '../css/profile.css'



export default function ProfileScreen() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [avatar, setAvatar] = useState('');
	const [image, setImage] = useState('');

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const userDetails = useSelector((state) => state.userDetail);
	const { loading, error, user } = userDetails;
	const userUpdateProfile = useSelector((state) => state.updateProfile);
	const { success, error: errorUpdate, } = userUpdateProfile;

	const dispatch = useDispatch();

	const signoutHandler = () => {
		dispatch(signout())
	}


	useEffect(() => {
		if (success) {
			swal({
				text: "Cập nhật thành công",
				icon: "success",
				button: false,
				timer: 1500,
			});
			setPassword('');
			setNewPassword('');
			setConfirmPassword('');
			dispatch({ type: USER_UPDATE_PROFILE_RESET });
			dispatch(detailsUser(userInfo._id));
		}
		if (!user) {
			dispatch(detailsUser(userInfo._id));
		}
		else {
			setName(user.name);
			setEmail(user.email);
			user.phone ? setPhone(user.phone) : setPhone('');
			setAvatar(user.avatar);
		}
	}, [dispatch, userInfo._id, user, success]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const bodyFormData = new FormData();
		bodyFormData.append('file', file)

		try {
			const { data } = await axios.post('/api/uploads', bodyFormData, {
				headers: { Authorization: `Bearer ${userInfo.token}` }
			})
			setImage('/images/' + data.filename);
		} catch (error) {
			console.log(error);
		}
	}

	const submitHandler = (e) => {
		e.preventDefault();

		if (newPassword === '' || confirmPassword === '' || password === '') {
			dispatch(updateUserProfile({ userId: user._id, name, phone, avatar: image ? image : avatar }))
		} else if (newPassword !== confirmPassword) {
			alert('Mật khẩu mới không trùng khớp')
		}
		else if (bcryptjs.compareSync(password, user.password)) {
			dispatch(updateUserProfile({ userId: user._id, name, phone, avatar: image ? image : avatar, newPassword }))
		}
		else { alert('Mật khẩu cũ không chính xác') }
	}

	return (
		<div>
			<form className="" onSubmit={submitHandler}>
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : errorUpdate ? (
					<MessageBox variant="danger">{errorUpdate}</MessageBox>
				) :
					(
						<div className="content-pf" >
							<div className="sub-pf">
								<ul>
								<li><Link to="/profile">Tài khoản</Link></li>
								<li><Link to="/orderhistory">Đơn hàng</Link></li>
								<li><Link to="#signout" onClick={signoutHandler}>Đăng xuất</Link></li>
							</ul>
							</div>
							<div className="avatar-pf">
								{user && (<img src={image ? image : user.avatar} alt="hinh" className="avatarpf"></img>)}
								<div className="change-avatarpf">
									<label htmlFor="imageFile" className="input-file-trigger">Chọn ảnh</label>
									<input type="file" id="imageFile" label="Choose Image" className="input-file" onChange={uploadFileHandler}></input>
								</div>
							</div>
							<div className="container-fluid">
								<div className="pf-row">
									<div className="pf_text"><label htmlFor="name">Họ tên* </label></div>
									<div className="pf_box">
										<input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
									</div>
								</div>
								<div className="pf-row">
									<div className="pf_text"><label htmlFor="phone">Số điện thoại* </label></div>
									<div className="pf_box">
										<input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
									</div>
								</div>
								<div className="pf-row">
									<div className="pf_text"><label htmlFor="email">Email* </label></div>
									<div className="pf_box">
										<input id="email" type="text" value={email} onChange={(e) => { }} disabled />
									</div>
								</div>
								<div className="pf-row">
									<div className="text_pass"><h3>Thay đổi mật khẩu</h3></div>
								</div>
								<div className="pf-row">
									<div className="pf_text"><label htmlFor="password_current">Mật khẩu hiện tại (bỏ trống nếu không đổi)</label></div>
									<div className="pf_box"><input id="password_current" type="password" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} /></div>
								</div>
								<div className="pf-row">
									<div className="pf_text"><label htmlFor="password_new">Mật khẩu mới (bỏ trống nếu không đổi)</label></div>
									<div className="pf_box"><input id="password_new" type="password" onChange={(e) => setNewPassword(e.target.value)} /></div>
								</div>
								<div className="pf-row">
									<div className="pf_text"><label htmlFor="password_new_confirm">Xác nhận mật khẩu mới</label></div>
									<div className="pf_box"><input id="password_new_confirm" type="password" onChange={(e) => setConfirmPassword(e.target.value)} /></div>
								</div>

								<div className="pf_btn">
									<button type="submit" className="btn-submit">Lưu thay đổi</button>
								</div>
							</div>
						</div>
					)}
			</form>
		</div>
	)
}
