import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './StudentDetail.module.scss';

const fakeStudentData = [
  {
    id: 1,
    studentName: 'Student A',
    className: 'Class X',
    attendances: [
      { date: '2024-06-01', status: 'Present' },
      { date: '2024-06-03', status: 'Absent' },
      { date: '2024-06-05', status: 'Present' },
    ],
    absents: 5,
    paidFee: 150,
    discountPercent: 0,
    parentPaidAmount: 150,
    parent: {
      name: 'Parent A',
      phone: '123-456-7890',
      email: 'parentA@example.com',
      gender: 'Male',
      payments: [
        { amount: 50, date: '2024-01-15' },
        { amount: 100, date: '2024-03-10' },
      ],
    },
  },
  {
    id: 2,
    studentName: 'Student B',
    className: 'Class Y',
    attendances: [
      { date: '2024-06-02', status: 'Present' },
      { date: '2024-06-04', status: 'Present' },
      { date: '2024-06-06', status: 'Absent' },
    ],
    absents: 2,
    paidFee: 120,
    discountPercent: 10,
    parentPaidAmount: 100,
    parent: {
      name: 'Parent B',
      phone: '987-654-3210',
      email: 'parentB@example.com',
      gender: 'Female',
      payments: [
        { amount: 100, date: '2024-02-20' },
      ],
    },
  },
  // Add more fake student data as needed
];

function StudentDetail() {
  const { id } = useParams();
  const [studentDetail, setStudentDetail] = useState(null);

  useEffect(() => {
    // Simulate an API call to fetch student detail by id
    setTimeout(() => {
      setStudentDetail(fakeStudentData.find(student => student.id === parseInt(id)));
    }, 1000); // Simulate a delay
  }, [id]);

  if (!studentDetail) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Calculate discount amount and total payable fee
  const discountAmount = (studentDetail.discountPercent / 100) * studentDetail.paidFee;
  const totalPayableFee = studentDetail.paidFee - discountAmount;
  const remainingFee = totalPayableFee - studentDetail.parentPaidAmount;
  const paymentStatus = remainingFee <= 0 ? 'Paid in Full' : `$${remainingFee.toFixed(2)} remaining`;
  const paymentStatusClass = remainingFee <= 0 ? styles.paidInFull : styles.remaining;

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
            <strong>Gender:</strong> {studentDetail.parent.gender}
          </div>
          <div className={styles.infoItem}>
            <strong>Email:</strong> {studentDetail.parent.email}
          </div>
          <div className={styles.infoItem}>
            <strong>Phone:</strong> {studentDetail.parent.phone}
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
            <strong>Phone:</strong> {studentDetail.parent.phone}
          </div>
          <div className={styles.infoItem}>
            <strong>Email:</strong> {studentDetail.parent.email}
          </div>
          <div className={styles.infoItem}>
            <strong>Gender:</strong> {studentDetail.parent.gender}
          </div>
          <div className={styles.infoItem}>
            <strong>Paid Amount:</strong> ${studentDetail.parentPaidAmount.toFixed(2)}
          </div>
          <div className={`${styles.infoItem} ${styles.paymentStatus} ${paymentStatusClass}`}>
            <strong>Payment Status:</strong> {paymentStatus}
          </div>
          <div className={styles.paymentsList}>
            <h3>Payment History:</h3>
            <ul>
              {studentDetail.parent.payments.map((payment, index) => (
                <li key={index}>
                  ${payment.amount.toFixed(2)} on {payment.date}
                </li>
              ))}
            </ul>
          </div>
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
