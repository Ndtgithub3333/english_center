import React, { useState, useEffect } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Classes/EditClassForm.module.scss';
import { getApi } from '~/utils/fetchData';

// const fakeTeachers = [
//     { id: 1, name: 'Teacher A' },
//     { id: 2, name: 'Teacher B' },
//     { id: 3, name: 'Teacher C' }
// ];

const cx = classNames.bind(styles);

function EditClassForm({ onSave, onCancel, classData }) {
    const [className, setClassName] = useState('');
    const [lessons, setLessons] = useState('');
    const [fee, setFee] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [teachers, setTeachers] = useState([]); //


    useEffect(() => {
        if (classData) {
            setClassName(classData.title);
            setLessons(String(classData.expectedLessons));
            setFee(String(classData.tuitionFees));
            setSelectedTeacher(classData.teacherId);
        }
    }, [classData]);

    const handleSave = () => {
        // if (className === '' || lessons === '' || fee === '' || selectedTeacher === '') {
        //     alert('All fields are required! Please fill in all required fields.');
        //     return;
        // }

        // const isValidNumber = /^\d+$/.test(lessons) && /^\d+$/.test(fee);
        // if (!isValidNumber) {
        //     alert('Lessons and Fee must be valid numbers!');
        //     return;
        // }

        onSave({
            ...classData,
            title: className,
            expectedLessons: parseInt(lessons),
            tuitionFees: parseInt(fee),
            teacherId: selectedTeacher,
            teacherName: teachers.find(teacher => teacher.id === selectedTeacher).name,
        });

        alert('Class updated successfully!');
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleFetchTeachers = async () => {  
        try {
            const response = await getApi('teacher/names');
            if (response.status !== 200) {
                alert('Failed to fetch teachers');
                return;
            }   
            setTeachers(response.data.map(teacher => ({ id: teacher.id, name: teacher.full_name })));
        } catch(ex) {
            alert(`Failed to fetch teachers: ${ex.message}`);
        }
    }

    useEffect(() => {
        handleFetchTeachers();
    }, []);

    return (
        <div className={cx('edit-class-form')}>
            <h2>Edit Class</h2>
            <span>Required
                <span style={{ color: 'red' }}>*</span>
            </span>
            <div className={cx('form-group')}>
                <label>Class Name
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} />
            </div>
            <div className={cx('form-group')}>
                <label>Expected Lessons
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <input type="text" value={lessons} onChange={(e) => setLessons(e.target.value)} />
            </div>
            <div className={cx('form-group')}>
                <label>Monthly Tuition Fees
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <input type="text" value={fee} onChange={(e) => setFee(e.target.value)} />
            </div>
            <div className={cx('form-group')}>
                <label>Select Teacher
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                </select>
            </div>
            <button className={cx('create-button')} onClick={handleSave}>Save</button>
            <button className={cx('cancel-button')} onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default EditClassForm;
