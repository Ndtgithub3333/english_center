import React, { useState } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Classes/AddClassForm.module.scss';

const cx = classNames.bind(styles);

function AddClassForm({ onCreateClass, onCancel }) {
    const [className, setClassName] = useState('');
    const [tuitionFees, setTuitionFees] = useState('');
    const [expectedLessons, setExpectedLessons] = useState(''); // New state for Expected Lessons
    const [selectedTeacher, setSelectedTeacher] = useState('');

    const teachers = [
        { id: 1, name: 'Teacher A' },
        { id: 2, name: 'Teacher B' },
        { id: 3, name: 'Teacher C' }
    ];

    const handleCreateClass = () => {
        if (className === '' || tuitionFees === '' || expectedLessons === '' || selectedTeacher === '') {
            alert('All fields are required! Please fill in all required fields.');
            return;
        }

        const isValidNumber = /^\d+$/.test(tuitionFees) && /^\d+$/.test(expectedLessons);
        if (!isValidNumber) {
            alert('Monthly Tuition Fees and Expected Lessons must be valid numbers!');
            return;
        }

        onCreateClass({
            title: className,
            studentCount: 0,
            expectedLessons: parseInt(expectedLessons), // Convert to integer
            teacherName: selectedTeacher
        });

        alert('Class created successfully!');

        setClassName('');
        setTuitionFees('');
        setExpectedLessons('');
        setSelectedTeacher('');
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className={cx('add-class-form')}>
            <h2>Add New Class</h2>
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
                <label>Monthly Tuition Fees
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <input type="text" value={tuitionFees} onChange={(e) => setTuitionFees(e.target.value)} />
            </div>
            <div className={cx('form-group')}>
                <label>Expected Lessons
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <input type="text" value={expectedLessons} onChange={(e) => setExpectedLessons(e.target.value)} />
            </div>
            <div className={cx('form-group')}>
                <label>Select Class Teacher
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
                    ))}
                </select>
            </div>
            <button className={cx('create-button')} onClick={handleCreateClass}>Create</button>
            <button className={cx('require-button')} onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default AddClassForm;
