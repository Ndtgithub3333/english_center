import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AddTeacherForm.module.scss'; // Import styles from AddTeacherForm.module.scss
import avatar from '~/assets/avatar.jpg'; // Đường dẫn đến hình ảnh mặc định
import { getApi } from '~/utils/fetchData';

const cx = classNames.bind(styles);

function EditTeacherForm({ onSave, onCancel, teacherData }) {
    const [fullName, setFullName] = useState('');
    const [photo, setPhoto] = useState(avatar); // Hình ảnh mặc định là avatar.jpg
    const [employeeRole, setEmployeeRole] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [accountStatus, setAccountStatus] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Effect để cập nhật dữ liệu form khi teacherData thay đổi
    useEffect(() => {
        if (teacherData) {
            setFullName(teacherData.fullName);
            setPhoto(teacherData.photo);
            setEmployeeRole(teacherData.employeeRole);
            setDateOfJoining(teacherData.dateOfJoining);
            setAccountStatus(teacherData.accountStatus);
            setUsername(teacherData.username);
            setPassword(teacherData.password);
        }
    }, [teacherData]);

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

    // Handler để lưu dữ liệu giáo viên đã chỉnh sửa
    const handleSave = () => {
        const updatedTeacher = {
            ...teacherData,
            fullName,
            photo,
            employeeRole,
            dateOfJoining,
            accountStatus,
            username,
            password
        };
        onSave(updatedTeacher);
        alert('Teacher updated successfully!');
    };

    // Handler để hủy bỏ chỉnh sửa
    const handleCancel = () => {
        onCancel();
    };

    // Effect để fetch thông tin giáo viên từ API khi teacherData thay đổi
    const handleFetchTeacherDetails = async () => {
        try {
            const response = await getApi(`teacher/${teacherData.id}`); // Giả lập cuộc gọi API hoặc lấy dữ liệu
            if (response.status !== 200) {
                alert('Failed to fetch teacher details');
                return;
            }
            const fetchedTeacher = response.data;
            setFullName(fetchedTeacher.fullName);
            setPhoto(fetchedTeacher.photo);
            setEmployeeRole(fetchedTeacher.employeeRole);
            setDateOfJoining(fetchedTeacher.dateOfJoining);
            setAccountStatus(fetchedTeacher.accountStatus);
            setUsername(fetchedTeacher.username);
            setPassword(fetchedTeacher.password);
        } catch (ex) {
            alert(`Failed to fetch teacher details: ${ex.message}`);
        }
    };

    // Effect để fetch dữ liệu giáo viên khi component mount hoặc teacherData thay đổi
    useEffect(() => {
        if (teacherData) {
            handleFetchTeacherDetails();
        }
    }, [teacherData]);

    return (
        <div className={cx('add-teacher-form')}>
            <h2>Edit Teacher</h2>
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

export default EditTeacherForm;
