import React, { useState } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Login/Login.module.scss';

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
        // Kiểm tra xem username và password có hợp lệ không
        if (username.trim() === '' || password.trim() === '') {
            alert('Vui lòng nhập đầy đủ thông tin đăng nhập.');
            return;
        }
        // Xử lý logic đăng nhập ở đây
        const formData = {
            username: username,
            password: password
        };
        console.log('Thông tin đăng nhập:', formData);
    };

    return (
        <div className={cx('login-page')}>
            <div className={cx('login-form-container')}>
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
                        <p className={cx('forgot-password')}>Quên mật khẩu?</p> {/* Thêm dòng "Quên mật khẩu?" */}
                    </form>
                </div>
            </div>
            <div className={cx('image-container')}>
                <img src="https://actvn.edu.vn/News/GetImage/28180" alt="anhLogin" />
            </div>
        </div>
    );
};

export default Login;
