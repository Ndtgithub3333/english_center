import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './EditTeacherForm.module.scss';
import avatar from '~/assets/avatar.jpg';
import { getApi, postApi } from '~/utils/fetchData';

const cx = classNames.bind(styles);

function EditTeacherForm({ onSave, onCancel, teacherData }) {
    const [fullName, setFullName] = useState('');
    const [photo, setPhoto] = useState(avatar);
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [email, setEmail] = useState('');
    const [employeeRole, setEmployeeRole] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [accountStatus, setAccountStatus] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [monthlySalary, setMonthlySalary] = useState('');
    const [homeAddress, setHomeAddress] = useState('');

    useEffect(() => {
        if (teacherData) {
            setFullName(teacherData.fullName);
            setPhoto(teacherData.photo);
            setGender(teacherData.gender);
            setDateOfBirth(teacherData.dateOfBirth);
            setMobilePhone(teacherData.mobilePhone);
            setEmail(teacherData.email);
            setEmployeeRole(teacherData.employeeRole);
            setDateOfJoining(teacherData.dateOfJoining);
            setAccountStatus(teacherData.accountStatus);
            setUsername(teacherData.username);
            setPassword(teacherData.password);
            setMonthlySalary(teacherData.monthlySalary);
            setHomeAddress(teacherData.homeAddress);
        }
    }, [teacherData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        // // Validate required fields
        // if (!fullName || !gender || !dateOfBirth || !mobilePhone || !email || !employeeRole || !dateOfJoining || !accountStatus || !username || !password || !monthlySalary || !homeAddress) {
        //     alert('Please fill in all fields.');
        //     return;
        // }

        // // Validate email format
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     alert('Invalid email format.');
        //     return;
        // }

        // // Validate Vietnam phone number format
        // const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        // if (!phoneRegex.test(mobilePhone)) {
        //     alert('Invalid Vietnam phone number format.');
        //     return;
        // }

        const updatedTeacher = {
            ...teacherData,
            fullName,
            photo,
            gender,
            dateOfBirth,
            mobilePhone,
            email,
            employeeRole,
            dateOfJoining,
            accountStatus,
            username,
            password,
            monthlySalary,
            homeAddress
        };
        try {
            // convert photo file to base64 stringt
            const photoFile = await fetch(photo);
            const photoBlob = await photoFile.blob();
            const photoBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(photoBlob);
            });

            // Create a new teacher
            const data = {
                gender: gender, 
                // picture: photoBase64,
                mobile_phone: mobilePhone,
                monthly_salary: monthlySalary,
                home_address: homeAddress,
                account_status: accountStatus == 'Active' ? 1 : 0,
                full_name: fullName,
                date_of_birth: dateOfBirth,
                email: email,
                employee_role: employeeRole,
                user_name: username, 
                password: password,
            }
            await postApi('teacher', data);
        } catch(ex) {
            alert(`Failed to update teacher: ${ex.message}`);
            return;
        }
        onSave(updatedTeacher);
        alert('Teacher updated successfully!');
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className={cx('edit-teacher-form')}>
            <h2>Teacher's Info</h2>
            <div className={cx('form-container')}>
                <div className={cx('form-group', 'img-upload')}>
                    <label>Photo</label>
                    <div className={cx('photo-upload')}>
                        <img src={photo} alt="Avatar" className={cx('avatar-preview')} />
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                </div>
                <div className={cx('form-group')}>
                    <label>Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className={cx('form-group')}>
                    <label>Date of Birth</label>
                    <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Mobile Phone</label>
                    <input type="tel" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Monthly Salary</label>
                    <input type="number" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Date of Joining</label>
                    <input type="date" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Home Address</label>
                    <input type="text" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Employee Role</label>
                    <input type="text" value={employeeRole} onChange={(e) => setEmployeeRole(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Account Status</label>
                    <select value={accountStatus} onChange={(e) => setAccountStatus(e.target.value)}>
                        <option value="">Select Account Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className={cx('form-group')}>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className={cx('button-group')}>
                <button className={cx('save-button')} onClick={handleSave}>Save</button>
                <button className={cx('cancel-button')} onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default EditTeacherForm;
