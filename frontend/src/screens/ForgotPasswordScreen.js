import axios from 'axios';
import React, { useState } from 'react'
import MessageBox from '../components/MessageBox';


export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('')
    const [active, setActive] = useState(true)

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')


    const submitHandler = async (e) => {
        e.preventDefault();

        setActive(false);
        const data = await axios.post('/api/accounts/forgot', { email: email })
        setMessage(data.data.message)
        setError(data.data.error ? (data.data.error) : '')
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                {message && <MessageBox variant="success">{message}</MessageBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <h1>Quên mật khẩu</h1>
                </div>
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
                    <label />
                    {active && <button className="primary" type="submit">
                        Gửi
                    </button>}
                </div>
            </form>
        </div>
    )
}
