import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Teachers.module.scss';
import EditTeacherForm from './EditTeacherForm';
import TeacherDetail from './TeacherDetail';
import avatar from '~/assets/avatar.jpg';

const cx = classNames.bind(styles);

function Teachers() {
    const [teachers, setTeachers] = useState([
        {
            id: 1,
            fullName: 'John Doe',
            photo: avatar,
            gender: 'Male',
            dateOfBirth: '01/01/1980',
            mobilePhone: '123-456-7890',
            email: 'john@example.com',
            monthlySalary: '20,000,000 VND',
            dateOfJoining: '2023-01-01',
            homeAddress: '123 Main St',
            employeeRole: 'Math Teacher',
            accountStatus: 'Active',
            username: 'johndoe',
            password: '123456'
        },
        {
            id: 2,
            fullName: 'Jane Smith',
            photo: avatar,
            gender: 'Female',
            dateOfBirth: '15/06/1985',
            mobilePhone: '098-765-4321',
            email: 'jane@example.com',
            monthlySalary: '22,000,000 VND',
            dateOfJoining: '2022-12-15',
            homeAddress: '456 Maple Ave',
            employeeRole: 'English Teacher',
            accountStatus: 'Inactive',
            username: 'janesmith',
            password: '123456'
        },
        {
            id: 3,
            fullName: 'Emily Johnson',
            photo: avatar,
            gender: 'Female',
            dateOfBirth: '20/09/1990',
            mobilePhone: '456-789-0123',
            email: 'emily@example.com',
            monthlySalary: '25,000,000 VND',
            dateOfJoining: '2023-02-01',
            homeAddress: '789 Pine St',
            employeeRole: 'Science Teacher',
            accountStatus: 'Active',
            username: 'emilyjohnson',
            password: '123456'
        },
        {
            id: 4,
            fullName: 'Michael Brown',
            photo: avatar,
            gender: 'Male',
            dateOfBirth: '11/03/1975',
            mobilePhone: '321-654-0987',
            email: 'michael@example.com',
            monthlySalary: '18,000,000 VND',
            dateOfJoining: '2023-03-01',
            homeAddress: '101 Oak St',
            employeeRole: 'History Teacher',
            accountStatus: 'Active',
            username: 'michaelbrown',
            password: '123456'
        },
        {
            id: 5,
            fullName: 'Sarah Davis',
            photo: avatar,
            gender: 'Female',
            dateOfBirth: '25/12/1988',
            mobilePhone: '567-890-1234',
            email: 'sarah@example.com',
            monthlySalary: '24,000,000 VND',
            dateOfJoining: '2023-04-01',
            homeAddress: '202 Birch St',
            employeeRole: 'Art Teacher',
            accountStatus: 'Inactive',
            username: 'sarahdavis',
            password: '123456'
        }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [editTeacherId, setEditTeacherId] = useState(null);
    const [viewTeacherId, setViewTeacherId] = useState(null);

    const handleDelete = (id) => {
        setTeachers(teachers.filter(teacher => teacher.id !== id));
    };

    const handleViewDetails = (id) => {
        setViewTeacherId(id);
    };

    const handleEdit = (id) => {
        setEditTeacherId(id);
        setShowForm(true);
    };

    const handleAddTeacher = () => {
        setEditTeacherId(null);
        setShowForm(true);
    };

    const handleCreateTeacher = (newTeacherData) => {
        if (editTeacherId !== null) {
            const updatedTeachers = teachers.map(teacher => (teacher.id === editTeacherId ? newTeacherData : teacher));
            setTeachers(updatedTeachers);
        } else {
            newTeacherData.id = teachers.length + 1;
            setTeachers([...teachers, newTeacherData]);
        }
        setShowForm(false);
        setEditTeacherId(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditTeacherId(null);
        setViewTeacherId(null);
    };

    return (
        <div className={cx('teachers-page')}>
            <h1>Teachers</h1>
            {showForm && (
                <div className={cx('form-container')}>
                    <EditTeacherForm
                        onSave={handleCreateTeacher}
                        onCancel={handleCancel}
                        teacherData={editTeacherId !== null ? teachers.find(teacher => teacher.id === editTeacherId) : null}
                    />
                </div>
            )}
            {viewTeacherId !== null && (
                <div className={cx('form-container')}>
                    <TeacherDetail
                        teacher={teachers.find(teacher => teacher.id === viewTeacherId)}
                        onClose={handleCancel}
                    />
                </div>
            )}
            {!showForm && viewTeacherId === null && (
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
                                    <div className={cx('info-value')}>******</div> {/* Always show masked password */}
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
