import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ClassDetail.module.scss';

const fakeClassDetail = {
    className: 'Class A',
    teacher: 'Teacher A',
    expectedLesson: 20,
    completed: 15,
    paidFee: 500, // Example: Replace with actual fee value or keep it dynamic
    students: [
        {
            name: 'Student 1',
            gender: 'Male',
            birthday: '2005-06-15',
            absents: 2,
            attendances: 18,
            paidFee: 300, // Example: Replace with actual fee value
        },
        {
            name: 'Student 2',
            gender: 'Female',
            birthday: '2006-07-20',
            absents: 0,
            attendances: 20,
            paidFee: 450, // Example: Replace with actual fee value
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
                <p>Paid Fee: ${classDetail.paidFee}</p> {/* Display the paid fee */}
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