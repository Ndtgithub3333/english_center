import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddTeacherForm.module.scss';
import avatar from '~/assets/avatar.jpg'; // Đường dẫn đến hình ảnh mặc định

const cx = classNames.bind(styles);

function AddTeacherForm({ onSave, onCancel }) {
    const [fullName, setFullName] = useState('');
    const [photo, setPhoto] = useState(avatar); // Hình ảnh mặc định là avatar.jpg
    const [employeeRole, setEmployeeRole] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [accountStatus, setAccountStatus] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Xử lý khi người dùng chọn tệp hình ảnh
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result); // Cập nhật hình ảnh thành base64 để hiển thị trực tiếp
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const newTeacherData = {
            fullName,
            photo,
            employeeRole,
            dateOfJoining,
            accountStatus,
            username,
            password
        };
        onSave(newTeacherData);
        alert('New teacher added successfully!');
        clearForm();
    };

    const handleCancel = () => {
        clearForm();
        onCancel();
    };

    const clearForm = () => {
        setFullName('');
        setPhoto(avatar); // Reset về hình ảnh mặc định khi hủy
        setEmployeeRole('');
        setDateOfJoining('');
        setAccountStatus('');
        setUsername('');
        setPassword('');
    };

    return (
        <div className={cx('add-teacher-form')}>
            <h2>Add Teacher</h2>
            <div className={cx('form-group')}>
                <label>Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className={cx('form-group')}>
                <label>Photo</label>
                <div className={cx('photo-upload')}>
                    <img src={photo} alt="Avatar" className={cx('avatar-preview')} />
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <small>Leave empty for default avatar</small>
            </div>
            <div className={cx('form-group')}>
                <label>Employee Role</label>
                <input type="text" value={employeeRole} onChange={(e) => setEmployeeRole(e.target.value)} />
            </div>
            <div className={cx('form-group')}>
                <label>Date of Joining</label>
                <input type="text" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} />
            </div>
            <div className={cx('form-group')}>
                <label>Account Status</label>
                <input type="text" value={accountStatus} onChange={(e) => setAccountStatus(e.target.value)} />
            </div>
            <div className={cx('form-group')}>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className={cx('form-group')}>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={cx('button-group')}>
                <button className={cx('save-button')} onClick={handleSave}>Save</button>
                <button className={cx('cancel-button')} onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default AddTeacherForm;
