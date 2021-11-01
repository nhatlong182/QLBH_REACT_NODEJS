import axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert';

export default function ResetPasswordScreen(props) {
    const id = props.match.params.id
    const token = props.match.params.token

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp')
        } else {
            await axios.post('/api/accounts/reset', { userId: id, token: token, newPassword: password });
            swal({
                text: "Thay đổi mật khẩu thành công",
                icon: "success",
                button: false,
                timer: 1500,
            });
            props.history.push('/signin')
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Đổi mật khẩu</h1>
                </div>
                <div>
                    <label className="sigin-label" htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label className="sigin-label" htmlFor="confirm-password">Xác nhận mật khẩu:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    )
}
