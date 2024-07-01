import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Students.module.scss';
import EditStudentForm from './EditStudentForm';
import StudentDetail from './StudentDetail';
import avatar from '~/assets/avatar.jpg';
import { getApi, postApi, delApi, patchApi } from '~/utils/fetchData';

const cx = classNames.bind(styles);

function Students() {
    const [students, setStudents] = useState([]);
    

    const [showForm, setShowForm] = useState(false);
    const [editStudentId, setEditStudentId] = useState(null);
    const [viewStudentId, setViewStudentId] = useState(null);

    const handleDelete = async(id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (confirmDelete) {
            setStudents(students.filter(student => student.id !== id));
            try {
                await delApi(`student/${id}`);
            } catch (ex) {
                alert(`Failed to delete student: ${ex.message}`);
            }
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
            const res = await getApi('student');
            if (res.status !== 200) {
                alert('Failed to fetch students');
                return;
            }
            setStudents(res.data.map(student => {
                return {
                    id: student.id,
                    studentName: student.full_name,
                    username: student.user_name,
                    password: student.password,                    
                    parent: student.parent
                }
            }));
        } catch (ex) {
            alert(`Failed to fetch students: ${ex.message}`);
        }
    };

    const handleCreateStudent =async (newStudentData) => {
        if (editStudentId !== null) {
            const updatedStudents = students.map(student => (student.id === editStudentId ? newStudentData : student));
            setStudents(updatedStudents);


            try {
                await patchApi(`student/${editStudentId}`,{
                    full_name: newStudentData.studentName,
                    user_name: newStudentData.username,
                    password: newStudentData.password,
                    date_joined: new Date().toISOString(),
                })
            } catch(ex) {
                alert(`Failed to update class: ${ex.message}`);
            }
        } else {
            newStudentData.id = students.length + 1;
            setStudents([...students, newStudentData]);


            try {
                await postApi(`student`,{
                    full_name: newStudentData.studentName,
                    user_name: newStudentData.username,
                    password: newStudentData.password,
                    date_joined: new Date().toISOString(),
                })
            } catch(ex) {
                alert(`Failed to update class: ${ex.message}`);
            }
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
                                    <div className={cx('info-label')}>ID:</div>
                                    <div className={cx('info-value')}>{student.id}</div>
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
