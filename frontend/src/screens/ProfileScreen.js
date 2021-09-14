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
			
        <div className="content-pf" >
        <div class="container-fluid">
			<div className="pf-row">
				<div className="text_acc"><h3>Tài khoản</h3></div>
			</div>
		<div class="pf-row">
			<div class="pf_text"><label for="account_last_name">Họ* </label></div>
			<div class="pf_box"><input type="text"/></div>
		</div>

		<div class="pf-row">
			<div class="pf_text"><label for="account_display_name">Tên hiển thị* </label></div>
			<div class="pf_box"><input type="text"/> </div>
		</div>

		<div class="pf-row">
			<div class="pf_text"><label for="account_email">Địa chỉ email* </label></div>
			<div class="pf_box"><input type="email" /></div>
		</div>
	</div>

	<div class="container-fluid">
		<div class="pf-row">
			<div class="text_pass"><h3>Thay đổi mật khẩu</h3></div>
		</div>	
		<div class="pf-row">
			<div class="pf_text"><label for="password_current">Mật khẩu hiện tại (bỏ trống nếu không đổi)</label></div>
			<div class="pf_box"><input type="password" autocomplete="off" /></div>
		</div>
		<div class="pf-row">
			<div class="pf_text"><label for="password_1">Mật khẩu mới (bỏ trống nếu không đổi)</label></div>
			<div class="pf_box"><input type="password" autocomplete="off" /></div>
		</div>
		<div class="pf-row">
			<div class="pf_text"><label for="password_2">Xác nhận mật khẩu mới</label></div>
			<div class="pf_box"><input type="password" autocomplete="off" /></div>
		</div>
		
        </div>
			<div class="pf_btn">
				<button type="submit" class="btn-submit">Lưu thay đổi</button>
		</div>
        </div>
    )
}
