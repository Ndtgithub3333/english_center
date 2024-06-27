import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './TeacherDetail.module.scss';

// Mock data for teacher detail and class list
const fakeTeacherDetail = {
    1: {
        id: 1,
        teacherName: 'Teacher A',
        gender: 'Male',
        phone: '123-456-7890',
        email: 'teacherA@example.com',
        dob: '1980-05-10',
        address: '123 Main St, City, Country',
        teachingClasses: [
            { id: 1, className: 'Class A', classSize: 30, completedLessons: 15, paid: 1500 },
            { id: 2, className: 'Class B', classSize: 25, completedLessons: 18, paid: 1200 },
        ],
    },
    2: {
        id: 2,
        teacherName: 'Teacher B',
        gender: 'Female',
        phone: '987-654-3210',
        email: 'teacherB@example.com',
        dob: '1985-09-25',
        address: '456 Oak Ave, Town, Country',
        teachingClasses: [
            { id: 3, className: 'Class C', classSize: 28, completedLessons: 20, paid: 1800 },
        ],
    },
};

function TeacherDetail() {
    const { id } = useParams();
    const [teacherDetail, setTeacherDetail] = useState(null);

    useEffect(() => {
        // Simulate an API call to fetch teacher detail by id
        setTimeout(() => {
            setTeacherDetail(fakeTeacherDetail[id]);
        }, 1000); // Simulate a delay
    }, [id]);

    if (!teacherDetail) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.teacherDetailContainer}>
            <div className={styles.personalInfoContainer}>
                <h2>Personal Information</h2>
                <div className={styles.personalInfo}>
                    <div className={styles.infoItem}>
                        <strong>Teacher Name:</strong> {teacherDetail.teacherName}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Gender:</strong> {teacherDetail.gender}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Phone:</strong> {teacherDetail.phone}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Email:</strong> {teacherDetail.email}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Date of Birth:</strong> {teacherDetail.dob}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Address:</strong> {teacherDetail.address}
                    </div>
                </div>
            </div>

            <div className={styles.teachingClassContainer}>
                <h2>Teaching Class List</h2>
                <table className={styles.teachingClassTable}>
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Class Size</th>
                            <th>Completed Lessons</th>
                            <th>Paid Money</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacherDetail.teachingClasses.map((classItem, index) => (
                            <tr key={index}>
                                <td>{classItem.className}</td>
                                <td>{classItem.classSize}</td>
                                <td>{classItem.completedLessons}</td>
                                <td>{classItem.paid}</td>
                                <td className={styles.actions}>
                                    <span className={styles.icon} title={`Detail ${classItem.className}`}>🔍</span>
                                    <span className={styles.icon} title={`Edit ${classItem.className}`}>✏️</span>
                                    <span className={styles.icon} title={`Delete ${classItem.className}`}>🗑️</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TeacherDetail;

