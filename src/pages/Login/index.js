import React, { useState } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Login/Login.module.scss';
import { postApi } from '~/utils/fetchData';
import { useNavigate } from 'react-router-dom';
import img from '~/assets/popUp1.png';
import logo from '~/assets/kma.png';

const cx = classNames.bind(styles);

function Login({ userType: initialUserType = 'student' }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(initialUserType); // Sử dụng useState để thiết lập giá trị mặc định

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNavigate = () => {
        switch (userType) {
            case 'student':
                navigate('/student-dashboard');
                break;
            case 'teacher':
                navigate('/teacher-dashboard');
                break;
            case 'parent':
                navigate('/parent-dashboard');
                break;
            default:
                navigate('/');
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            alert('Vui lòng nhập đầy đủ thông tin đăng nhập.');
            return;
        }
        const formData = {
            user_name: username,
            password: password,
            user_type: userType
        };

        try {
            const response = await postApi('auth/login', formData);
            if (response.status === 200) {
                handleNavigate();
            } else {
                alert('Đăng nhập thất bại!');
            }
        } catch (ex) {
            alert(`Đăng nhập thất bại: ${ex.message}`);
        }
    };

    return (
        <div className={cx('login-page')}>
            <div className={cx('login-form-container')}>
                <div className={cx('logo-container')}>
                    <img className={cx('logo')} src={logo} alt="Logo" />
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
                <img src={img} alt="Image" />
            </div>
        </div>
    );
};

export default Login;
