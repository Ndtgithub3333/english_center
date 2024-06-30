import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Students.module.scss';
import EditStudentForm from './EditStudentForm';
import StudentDetail from './StudentDetail';
import avatar from '~/assets/avatar.jpg';
import { getApi } from '~/utils/fetchData';

const cx = classNames.bind(styles);

function Students() {
    const [students, setStudents] = useState([
        {
            id: 1,
            studentName: 'Student A',
            class: 'Class X',
            gender: 'Male',
            email: 'studentA@example.com',
            phone: '123-456-7890',
            discountPercent: '0%',
            parent: {
                name: 'Parent A',
                phone: '12123-7890',
                email: 'parentA@example.com',
                gender: 'Male',
                paidAmount: '$150.00'
            },
            accountStatus: 'Active',
            username: 'studentA',
            homeAddress: '123 Street, City',
            dateOfBirth: '2000-01-01'
        },
        // More student objects
    ]);
    

    const [showForm, setShowForm] = useState(false);
    const [editStudentId, setEditStudentId] = useState(null);
    const [viewStudentId, setViewStudentId] = useState(null);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (confirmDelete) {
            setStudents(students.filter(student => student.id !== id));
        }
    };

    const handleViewDetails = (id) => {
        setViewStudentId(id);
    };

    const handleEdit = (id) => {
        setEditStudentId(id);
        setShowForm(true);
    };

    const handleAddStudent = () => {
        setEditStudentId(null);
        setShowForm(true);
    };

    useEffect(() => {
        handleFetchStudents();
    }, []);

    const handleFetchStudents = async () => {
        try {
            const res = await getApi('students');
            if (res.status !== 200) {
                alert('Failed to fetch students');
                return;
            }

            setStudents(res.data.students);
        } catch (ex) {
            alert(`Failed to fetch students: ${ex.message}`);
        }
    };

    const handleCreateStudent = (newStudentData) => {
        if (editStudentId !== null) {
            const updatedStudents = students.map(student => (student.id === editStudentId ? newStudentData : student));
            setStudents(updatedStudents);
        } else {
            newStudentData.id = students.length + 1;
            setStudents([...students, newStudentData]);
        }
        setShowForm(false);
        setEditStudentId(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditStudentId(null);
        setViewStudentId(null);
    };

    return (
        <div className={cx('students-page')}>
            <h1>Students</h1>
            {showForm && (
                <div className={cx('form-container')}>
                    <EditStudentForm
                        onSave={handleCreateStudent}
                        onCancel={handleCancel}
                        studentData={editStudentId !== null ? students.find(student => student.id === editStudentId) : null}
                    />
                </div>
            )}
            {viewStudentId !== null && (
                <div className={cx('form-container')}>
                    <StudentDetail
                        student={students.find(student => student.id === viewStudentId)}
                        onClose={handleCancel}
                    />
                </div>
            )}
            {!showForm && viewStudentId === null && (
                <div className={cx('students-list')}>
                    {students.map(student => (
                        <div key={student.id} className={cx('student-card', {
                            active: student.accountStatus === 'Active',
                            inactive: student.accountStatus !== 'Active'
                        })}>
                            <div className={cx('student-info')}>
                                <img src={avatar} alt="Student" className={cx('student-photo')} />
                                <h2>{student.studentName}</h2>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Phone:</div>
                                    <div className={cx('info-value')}>{student.phone}</div>
                                </div>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Account Status:</div>
                                    <div className={cx('info-value', {
                                        active: student.accountStatus === 'Active',
                                        inactive: student.accountStatus !== 'Active'
                                    })}>{student.accountStatus}</div>
                                </div>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Username:</div>
                                    <div className={cx('info-value')}>{student.username}</div>
                                </div>
                            </div>
                            <div className={cx('student-actions')}>
                                <button onClick={() => handleViewDetails(student.id)}>🔍</button>
                                <button onClick={() => handleEdit(student.id)}>✏️</button>
                                <button onClick={() => handleDelete(student.id)}>🗑️</button>
                            </div>
                        </div>
                    ))}
                    <div className={cx('add-student-card')} onClick={handleAddStudent}>
                        <span>+</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Students;
