// ~/pages/Teachers/Teachers.jsx
import React, { useState } from 'react';
import classNames from "classnames/bind";
import styles from './Teachers.module.scss';
import EditTeacherForm from './EditTeacherForm';
import AddTeacherForm from './AddTeacherForm'; // Import AddTeacherForm
import avatar from '~/assets/avatar.jpg';

const cx = classNames.bind(styles);

function Teachers() {
    const [teachers, setTeachers] = useState([
        {
            id: 1,
            fullName: 'John Doe',
            photo: avatar,
            employeeRole: 'Math Teacher',
            dateOfJoining: '2023-01-01',
            accountStatus: 'Active',
            username: 'johndoe',
            password: '********'
        },
        {
            id: 2,
            fullName: 'Jane Smith',
            photo: avatar,
            employeeRole: 'English Teacher',
            dateOfJoining: '2022-12-15',
            accountStatus: 'Inactive',
            username: 'janesmith',
            password: '********'
        }
        // Add more teachers as needed
    ]);

    const [showForm, setShowForm] = useState(false);
    const [editTeacherId, setEditTeacherId] = useState(null);

    const handleDelete = (id) => {
        setTeachers(teachers.filter(teacher => teacher.id !== id));
    };

    const handleViewDetails = (id) => {
        alert(`Viewing details for teacher id: ${id}`);
    };

    const handleEdit = (id) => {
        setEditTeacherId(id);
        setShowForm(true);
    };

    const handleAddTeacher = () => {
        setEditTeacherId(null); // Set editTeacherId to null
        setShowForm(true); // Show the form
    };

    const handleCreateTeacher = (newTeacherData) => {
        if (editTeacherId !== null) {
            const updatedTeachers = teachers.map(teacher => (teacher.id === editTeacherId ? newTeacherData : teacher));
            setTeachers(updatedTeachers);
        } else {
            newTeacherData.id = teachers.length + 1; // Assign a new ID
            setTeachers([...teachers, newTeacherData]);
        }
        setShowForm(false);
        setEditTeacherId(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditTeacherId(null);
    };

    return (
        <div className={cx('teachers-page')}>
            <h1>Teachers</h1>
            {showForm && editTeacherId === null && (
                <div className={cx('form-container')}>
                    <AddTeacherForm
                        onSave={handleCreateTeacher}
                        onCancel={handleCancel}
                    />
                </div>
            )}
            {showForm && editTeacherId !== null && (
                <div className={cx('form-container')}>
                    <EditTeacherForm
                        onSave={handleCreateTeacher}
                        onCancel={handleCancel}
                        teacherData={teachers.find(teacher => teacher.id === editTeacherId)}
                    />
                </div>
            )}
            {!showForm && (
                <div className={cx('teachers-list')}>
                    {teachers.map(teacher => (
                        <div key={teacher.id} className={cx('teacher-card', {
                            active: teacher.accountStatus === 'Active',
                            inactive: teacher.accountStatus !== 'Active'
                        })}>
                            <div className={cx('teacher-info')}>
                                <img src={teacher.photo} alt="Teacher" className={cx('teacher-photo')} />
                                <h2>{teacher.fullName}</h2>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Employee Role:</div>
                                    <div className={cx('info-value')}>{teacher.employeeRole}</div>
                                </div>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Date of Joining:</div>
                                    <div className={cx('info-value')}>{teacher.dateOfJoining}</div>
                                </div>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Account Status:</div>
                                    <div className={cx('info-value', {
                                        active: teacher.accountStatus === 'Active',
                                        inactive: teacher.accountStatus !== 'Active'
                                    })}>{teacher.accountStatus}</div>
                                </div>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Username:</div>
                                    <div className={cx('info-value')}>{teacher.username}</div>
                                </div>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Password:</div>
                                    <div className={cx('info-value')}>{teacher.password}</div>
                                </div>
                            </div>
                            <div className={cx('teacher-actions')}>
                                <button onClick={() => handleViewDetails(teacher.id)}>🔍</button>
                                <button onClick={() => handleEdit(teacher.id)}>✏️</button>
                                <button onClick={() => handleDelete(teacher.id)}>🗑️</button>
                            </div>
                        </div>
                    ))}
                    <div className={cx('add-teacher-card')} onClick={handleAddTeacher}>
                        <span>+</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Teachers;
