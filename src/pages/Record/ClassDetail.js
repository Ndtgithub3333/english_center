import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ClassDetail.module.scss';

const fakeClassDetail = {
    className: 'Class A',
    teacher: 'Teacher A',
    expectedLesson: 20,
    completed: 15,
    totalFee: 6000, // Total expected fee for this class
    paidFee: 5000, // Total paid fee for this class
    students: [
        {
            name: 'Student 1',
            gender: 'Male',
            birthday: '2005-06-15',
            absents: 2,
            attendances: 18,
            totalFee: 1000, // Total expected fee for this student
            paidFee: 300, // Actual fee paid by the student
        },
        {
            name: 'Student 2',
            gender: 'Female',
            birthday: '2006-07-20',
            absents: 0,
            attendances: 20,
            totalFee: 1200, // Total expected fee for this student
            paidFee: 450, // Actual fee paid by the student
        },
        // Add more student data as needed
    ],
};

function RecordClassDetail() {
    const { id } = useParams();
    const [classDetail, setClassDetail] = useState(null);

    useEffect(() => {
        // Mimic an API call to fetch class details based on id
        setTimeout(() => {
            setClassDetail(fakeClassDetail); // In a real case, filter by id or fetch from API
        }, 1000); // Simulate a delay
    }, [id]);

    if (!classDetail) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.classDetailContainer}>
            <div className={styles.header}>
                <h2>{`${classDetail.className} - ${classDetail.teacher}`}</h2>
                <p>Expected Lessons: {classDetail.expectedLesson}</p>
                <p>Completed Lessons: {classDetail.completed}</p>
                <p>Total Fee: ${classDetail.totalFee}</p> {/* Display the total fee */}
                <p>Total Paid: ${classDetail.paidFee}</p> {/* Display the paid fee */}
            </div>
            <table className={styles.studentTable}>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Gender</th>
                        <th>Birthday</th>
                        <th>Absents</th>
                        <th>Attendances</th>
                        <th>Total Fee</th>
                        <th>Paid Fee</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classDetail.students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>{student.gender}</td>
                            <td>{student.birthday}</td>
                            <td>{student.absents}</td>
                            <td>{student.attendances}</td>
                            <td>${student.totalFee}</td> {/* Display student's total fee */}
                            <td>${student.paidFee}</td> {/* Display student's paid fee */}
                            <td className={styles.actions}>
                                <span className={styles.icon} title={`Detail ${student.name}`}>🔍</span>
                                <span className={styles.icon} title={`Edit ${student.name}`}>✏️</span>
                                <span className={styles.icon} title={`Delete ${student.name}`}>🗑️</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecordClassDetail;
