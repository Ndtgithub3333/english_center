import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './StudentDetail.module.scss';

const fakeStudentData = {
    1: {
        id: 1,
        studentName: 'Student A',
        className: 'Class X',
        gender: 'Male',
        email: 'studentA@example.com',
        phone: '123-456-7890',
        dob: '2005-08-15',
        address: '789 Elm St, City, Country',
        attendances: [
            { date: '2024-06-01', status: 'Present' },
            { date: '2024-06-03', status: 'Absent' },
            { date: '2024-06-05', status: 'Present' },
        ],
        absents: 1,
        discountPercent: 0,
        paidFee: 150,
        parent: {
            name: 'Parent A',
            email: 'parentA@example.com',
        },
    },
    2: {
        id: 2,
        studentName: 'Student B',
        className: 'Class Y',
        gender: 'Female',
        email: 'studentB@example.com',
        phone: '987-654-3210',
        dob: '2006-03-20',
        address: '456 Maple Ave, Town, Country',
        attendances: [
            { date: '2024-06-02', status: 'Present' },
            { date: '2024-06-04', status: 'Present' },
            { date: '2024-06-06', status: 'Absent' },
        ],
        absents: 1,
        discountPercent: 10,
        paidFee: 120,
        parent: {
            name: 'Parent B',
            email: 'parentB@example.com',
        },
    },
};

function StudentDetail() {
    const { id } = useParams();
    const [studentDetail, setStudentDetail] = useState(null);

    useEffect(() => {
        // Simulate an API call to fetch student detail by id
        setTimeout(() => {
            setStudentDetail(fakeStudentData[id]);
        }, 1000); // Simulate a delay
    }, [id]);

    if (!studentDetail) {
        return <div className={styles.loading}>Loading...</div>;
    }

    // Calculate discount amount and total payable fee
    const discountAmount = (studentDetail.discountPercent / 100) * studentDetail.paidFee;
    const totalPayableFee = studentDetail.paidFee - discountAmount;

    return (
        <div className={styles.studentDetailContainer}>
            <h1>Student Detail</h1>

            {/* Personal Information */}
            <div className={styles.sectionContainer}>
                <h2>Personal Information</h2>
                <div className={styles.sectionContent}>
                    <div className={styles.infoItem}>
                        <strong>Student Name:</strong> {studentDetail.studentName}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Class:</strong> {studentDetail.className}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Gender:</strong> {studentDetail.gender}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Email:</strong> {studentDetail.email}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Phone:</strong> {studentDetail.phone}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Date of Birth:</strong> {studentDetail.dob}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Address:</strong> {studentDetail.address}
                    </div>
                </div>
            </div>

            {/* Attendance Record and Payment Info */}
            <div className={styles.sectionContainer}>
                <h2>Attendance Record</h2>
                <div className={styles.sectionContent}>
                    <table className={styles.attendanceTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentDetail.attendances.map((attendance, index) => (
                                <tr key={index}>
                                    <td>{attendance.date}</td>
                                    <td>{attendance.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.paymentInfo}>
                        <div className={styles.infoItem}>
                            <strong>Absents:</strong> {studentDetail.absents}
                        </div>
                        <div className={styles.infoItem}>
                            <strong>Discount Percent:</strong> {studentDetail.discountPercent}%
                        </div>
                        <div className={styles.infoItem}>
                            <strong>Discount Amount:</strong> ${discountAmount.toFixed(2)}
                        </div>
                        <div className={styles.infoItem}>
                            <strong>Paid Fee:</strong> ${studentDetail.paidFee}
                        </div>
                        <div className={styles.infoItem}>
                            <strong>Total Payable Fee:</strong> ${totalPayableFee.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Parent Information */}
            <div className={styles.sectionContainer}>
                <h2>Parent Information</h2>
                <div className={styles.sectionContent}>
                    <div className={styles.infoItem}>
                        <strong>Name:</strong> {studentDetail.parent.name}
                    </div>
                    <div className={styles.infoItem}>
                        <strong>Email:</strong> {studentDetail.parent.email}
                    </div>
                    <Link to={`/admin/record/parent/${studentDetail.parent.email}`} className={styles.link}>
                        View Parent Detail
                    </Link>
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}>Delete</button>
            </div>
        </div>
    );
}

export default StudentDetail;
