import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './EditStudentForm.module.scss';
import avatar from '~/assets/avatar.jpg';
import { postApi } from '~/utils/fetchData';

const cx = classNames.bind(styles);

function EditStudentForm({ onSave, onCancel, studentData }) {
    const [fullName, setFullName] = useState('');
    const [photo, setPhoto] = useState(avatar);
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [email, setEmail] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [parentName, setParentName] = useState('');
    const [parentPhone, setParentPhone] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [parentGender, setParentGender] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (studentData) {
            setFullName(studentData.studentName || '');
            setPhoto(studentData.photo || avatar);
            setGender(studentData.gender || '');
            setDateOfBirth(studentData.dateOfBirth || '');
            setMobilePhone(studentData.phone || '');
            setEmail(studentData.email || '');
            setHomeAddress(studentData.homeAddress || '');
            setParentName(studentData.parent.name || '');
            setParentPhone(studentData.parent.phone || '');
            setParentEmail(studentData.parent.email || '');
            setParentGender(studentData.parent.gender || '');
            setPassword(studentData.password || '');
        }
    }, [studentData]);

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
        const updatedStudent = {
            ...studentData,
            studentName: fullName,
            photo,
            gender,
            dateOfBirth,
            phone: mobilePhone,
            email,
            homeAddress,
            parent: {
                ...studentData.parent,
                name: parentName,
                phone: parentPhone,
                email: parentEmail,
                gender: parentGender,
            },
            password,
        };

        try {
            // Convert photo file to base64 string
            const photoFile = await fetch(photo);
            const photoBlob = await photoFile.blob();
            const photoBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(photoBlob);
            });

            const data = {
                gender,
                picture: photoBase64,
                mobile_phone: mobilePhone,
                home_address: homeAddress,
                full_name: fullName,
                date_of_birth: dateOfBirth,
                email,
                parent_name: parentName,
                parent_phone: parentPhone,
                parent_email: parentEmail,
                parent_gender: parentGender,
                password,
            };
            await postApi('student', data);
        } catch (ex) {
            alert(`Failed to update student: ${ex.message}`);
            return;
        }
        onSave(updatedStudent);
        alert('Student updated successfully!');
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className={cx('edit-student-form')}>
            <h2>Student's Info</h2>
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
                    <label>Home Address</label>
                    <input type="text" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Parent's Name</label>
                    <input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Parent's Phone</label>
                    <input type="tel" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Parent's Email</label>
                    <input type="email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} />
                </div>
                <div className={cx('form-group')}>
                    <label>Parent's Gender</label>
                    <select value={parentGender} onChange={(e) => setParentGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
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

export default EditStudentForm;
