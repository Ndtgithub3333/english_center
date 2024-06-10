import React, { useState } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Login/Login.module.scss';
import { postApi } from '~/utils/fetchData';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNavigate = () =>  {
        navigate('/')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Kiểm tra xem username và password có hợp lệ không
        if (username.trim() === '' || password.trim() === '') {
            alert('Vui lòng nhập đầy đủ thông tin đăng nhập.');
            return;
        }
        // Xử lý logic đăng nhập ở đây
        const formData = {
            user_name: username,
            password: password,
            user_type: 'admin'
        };
        
        try {
            const response = await postApi('auth/login', formData);
            if (response.status === 200) {
                handleNavigate();
            } else {
                alert('Đăng nhập thất bại!');
            }
        } catch(ex) {
            alert(`Đăng nhập thất bại: ${ex.message}`);
        }
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
