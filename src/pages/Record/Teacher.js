import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Teacher.module.scss';

const fakeTeacherData = [
    {
        id: 1,
        teacherName: 'Teacher A',
        gender: 'Male',
        birthday: '1980-05-10',
        teachingClass: 3,
        completedLesson: 45,
        paid: 1500,
    },
    {
        id: 2,
        teacherName: 'Teacher B',
        gender: 'Female',
        birthday: '1985-09-25',
        teachingClass: 2,
        completedLesson: 35,
        paid: 1200,
    },
    // Add more fake teacher data as needed
];

function RecordTeacher() {
    const [teacherList, setTeacherList] = useState([]);
    const [totalTeacherSalary, setTotalTeacherSalary] = useState(0);

    useEffect(() => {
        // Mimic an API call
        setTimeout(() => {
            setTeacherList(fakeTeacherData);
            // Calculate the total salary paid to all teachers
            const totalSalary = fakeTeacherData.reduce((sum, teacher) => sum + teacher.paid, 0);
            setTotalTeacherSalary(totalSalary);
        }, 1000); // Simulate a delay
    }, []);

    return (
        <div className={styles.teacherContainer}>
            <h1>Teacher Records</h1>
            <div className={styles.totalSalaries}>
                <h3>Salary for Teachers:</h3>
                <p>${totalTeacherSalary}</p>
            </div>
            <table className={styles.teacherTable}>
                <thead>
                    <tr>
                        <th>Teacher Name</th>
                        <th>Gender</th>
                        <th>Birthday</th>
                        <th>Teaching Class</th>
                        <th>Completed Lesson</th>
                        <th>Paid</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teacherList.length > 0 ? (
                        teacherList.map((teacher, index) => (
                            <tr key={index}>
                                <td>{teacher.teacherName}</td>
                                <td>{teacher.gender}</td>
                                <td>{teacher.birthday}</td>
                                <td>{teacher.teachingClass}</td>
                                <td>{teacher.completedLesson}</td>
                                <td>${teacher.paid}</td>
                                <td className={styles.actions}>
                                    <Link to={`/admin/record/teacher/${teacher.id}`} className={styles.link}>
                                        <span className={styles.icon} title={`Detail ${teacher.teacherName}`}>🔍</span>
                                    </Link>
                                    <span className={styles.icon} title={`Edit ${teacher.teacherName}`}>✏️</span>
                                    <span className={styles.icon} title={`Delete ${teacher.teacherName}`}>🗑️</span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className={styles.loading}>Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default RecordTeacher;
