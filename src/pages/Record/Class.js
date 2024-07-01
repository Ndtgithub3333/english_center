import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Class.module.scss';

const fakeData = [
    {
        id: 1,
        className: 'Class A',
        teacher: 'Teacher A',
        classSize: 30,
        expectedLesson: 20,
        completed: 15,
        totalFee: 6000, // Total expected fee for this class
        totalPaid: 5000, // Total paid for this class
    },
    {
        id: 2,
        className: 'Class B',
        teacher: 'Teacher B',
        classSize: 25,
        expectedLesson: 18,
        completed: 18,
        totalFee: 5000, // Total expected fee for this class
        totalPaid: 4500, // Total paid for this class
    },
    // Add more fake class data as needed
];

function RecordClass() {
    const [classList, setClassList] = useState([]);
    const [totalTuitionFees, setTotalTuitionFees] = useState(0);

    useEffect(() => {
        // Mimic an API call
        setTimeout(() => {
            setClassList(fakeData);
            // Calculate the total tuition fees paid by all students
            const totalFees = fakeData.reduce((sum, classItem) => sum + classItem.totalPaid, 0);
            setTotalTuitionFees(totalFees);
        }, 1000); // Simulate a delay
    }, []);

    return (
        <div className={styles.classContainer}>
            <h1>Class Records</h1>
            <div className={styles.totalFees}>
                <h3>Tuition Fees Students Paid:</h3>
                <p>${totalTuitionFees}</p>
            </div>
            <table className={styles.classTable}>
                <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>Teacher</th>
                        <th>Class Size</th>
                        <th>Expected Lesson</th>
                        <th>Completed</th>
                        <th>Total Fee</th>
                        <th>Total Paid</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classList.length > 0 ? (
                        classList.map((classItem, index) => (
                            <tr key={index}>
                                <td>{classItem.className}</td>
                                <td>{classItem.teacher}</td>
                                <td>{classItem.classSize}</td>
                                <td>{classItem.expectedLesson}</td>
                                <td>{classItem.completed}</td>
                                <td>${classItem.totalFee}</td>
                                <td>${classItem.totalPaid}</td>
                                <td className={styles.actions}>
                                    <Link to={`/admin/record/class/${classItem.id}`} className={styles.link}>
                                        <span className={styles.icon} title="Detail">🔍</span>
                                    </Link>
                                    <span className={styles.icon} title="Edit">✏️</span>
                                    <span className={styles.icon} title="Delete">🗑️</span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className={styles.loading}>Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default RecordClass;
