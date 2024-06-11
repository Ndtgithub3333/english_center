import React, { useState } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Login/Login.module.scss';
import { postApi } from '~/utils/fetchData';
import { useNavigate } from 'react-router-dom';


const cx = classNames.bind(styles);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            alert('Vui lòng nhập đầy đủ thông tin đăng nhập.');
            return;
        }
        const formData = {
            username: username,
            password: password
        };
        console.log('Thông tin đăng nhập:', formData);
    };

    return (
        <div className={cx('login-page')}>
            <div className={cx('login-form-container')}>
                <div className={cx('logo-container')}>
                    <img className={cx('logo')} src={logo} alt="anh logo" />
                </div>
                <h1>Login</h1>
                <div className={cx('login-form-wrapper')}>
                    <form onSubmit={handleSubmit}>
                        <div className={cx('form-group')}>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button type="submit">Login</button>
                        <p className={cx('forgot-password')}>Quên mật khẩu?</p>
                    </form>
                </div>
            </div>
            <div className={cx('image-container')}>
                <img src={img} alt="anhLogin" />
            </div>
        </div>
    );
};

export default Login;
