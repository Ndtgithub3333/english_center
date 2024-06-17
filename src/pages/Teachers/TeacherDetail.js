import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TeacherDetail.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const cx = classNames.bind(styles);

function TeacherDetail({ teacher, onClose }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return (
        <div className={cx('teacher-detail')}>
            <h2>Teacher Details</h2>
            <div className={cx('detail-container')}>
                <div className={cx('photo-section')}>
                    <img src={teacher.photo} alt="Teacher" className={cx('teacher-photo')} />
                </div>
                <div className={cx('info-section')}>
                    {Object.keys(teacher).map((key) => (
                        key !== 'photo' && (
                            <div className={cx('detail-group')} key={key}>
                                <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
                                {key === 'password' ? (
                                    <div className={cx('password-container')}>
                                        <span>{showPassword ? teacher[key] : '********'}</span>
                                        <button onClick={togglePasswordVisibility} className={cx('eye-button')}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                ) : (
                                    <span>{teacher[key]}</span>
                                )}
                            </div>
                        )
                    ))}
                </div>
            </div>
            <button onClick={onClose} className={cx('close-button')}>Close</button>
        </div>
    );
}

export default TeacherDetail;
