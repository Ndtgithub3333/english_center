import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Teachers.module.scss';
import EditTeacherForm from './EditTeacherForm';
import TeacherDetail from './TeacherDetail';
import avatar from '~/assets/avatar.jpg';
import { getApi, patchApi, postApi, delApi } from '~/utils/fetchData';

const cx = classNames.bind(styles);

function Teachers() {
    const [teachers, setTeachers] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editTeacherId, setEditTeacherId] = useState(null);
    const [viewTeacherId, setViewTeacherId] = useState(null);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
        if (confirmDelete) {
            setTeachers(teachers.filter(teacher => teacher.id !== id));
            try {
                await delApi(`teacher/${id}`);
            } catch (ex) {
                alert(`Failed to delete teacher: ${ex.message}`);
            }
        }
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

    useEffect(() => {
        handleFetchTeachers();
    }, [])

    const handleFetchTeachers = async () => {
        try {
            const res = await getApi('teacher');
            if (res.status !== 200) {
                alert('Failed to fetch teachers');
                return;
            }


            // "id": "965821ca-77eb-4098-a93c-c019c5e1e2d2",
            // "gender": "Female",
            // "mobile_phone": "331231232",
            // "monthly_salary": "12312312.00",
            // "home_address": "fgadsfadsf",
            // "account_status": true,
            // "full_name": "fdsfdsfdsf",
            // "date_of_birth": "2024-06-12",
            // "email": "winter@winter.com",
            // "employee_role": "fasdfadsfa",
            // "user_name": "winter",
            // "password": "winter123"


            setTeachers(res.data.teachers.map(cls => ({
                id: cls.id,
            fullName: cls.full_name,
            // photo: cls.pc,
            gender: cls.gender,
            dateOfBirth: cls.date_of_birth,
            mobilePhone: cls.mobile_phone,
            email: cls.email,
            monthlySalary: cls.monthly_salary,
            // dateOfJoining: cls.date_of_joining,
            homeAddress: cls.home_address,
            employeeRole: cls.employee_role,
            accountStatus: cls.account_status == 1 ? 'Active' : 'Inactive',
            username: cls.user_name,
            password: cls.password
            })))
        } catch(ex) {
            alert(`Failed to fetch teachers: ${ex.message}`);
        }
    }

    const handleCreateTeacher = async (newTeacherData) => {
        if (editTeacherId !== null) {

            const updatedTeachers = teachers.map(teacher => (teacher.id === editTeacherId ? newTeacherData : teacher));
            setTeachers(updatedTeachers);

            try {
                await patchApi(`teacher/${editTeacherId}`,{
                    full_name: newTeacherData.fullName,
                    gender: newTeacherData.gender,
                    date_of_birth: newTeacherData.dateOfBirth,
                    mobile_phone: newTeacherData.mobilePhone,
                    email: newTeacherData.email,
                    monthly_salary: newTeacherData.monthlySalary,
                    home_address: newTeacherData.homeAddress,
                    employee_role: newTeacherData.employeeRole,
                    account_status: newTeacherData.accountStatus === 'Active' ? 1 : 0,
                    user_name: newTeacherData.username,
                    password: newTeacherData.password
                })
            } catch(ex) {
                alert(`Failed to update class: ${ex.message}`);
            }
        } else {
            newTeacherData.id = teachers.length + 1;
            setTeachers([...teachers, newTeacherData]);

            try {
                console.log(newTeacherData);
                await postApi('teacher', {
                    full_name: newTeacherData.fullName,
                    gender: newTeacherData.gender,
                    date_of_birth: newTeacherData.dateOfBirth,
                    mobile_phone: newTeacherData.mobilePhone,
                    email: newTeacherData.email,
                    monthly_salary: newTeacherData.monthlySalary,
                    home_address: newTeacherData.homeAddress,
                    employee_role: newTeacherData.employeeRole,
                    account_status: newTeacherData.accountStatus === 'Active' ? 1 : 0,
                    user_name: newTeacherData.username,
                    password: newTeacherData.password
                });
            } catch(ex) {
                alert(`Failed to create class: ${ex.message}`);
            }
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
                                <img src={avatar} alt="Teacher" className={cx('teacher-photo')} />
                                <h2>{teacher.fullName}</h2>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Employee Role:</div>
                                    <div className={cx('info-value')}>{teacher.employeeRole}</div>
                                </div>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Mobile Phone:</div>
                                    <div className={cx('info-value')}>{teacher.mobilePhone}</div>
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
